import { API_BASE, SITE_NAME } from "@/lib/api";

const LEAD_API_URL = "https://webapi.webappconsulting.com.au/api/contactus/save";
const FORM_TYPE = "1";

/** The CRM website id and reCAPTCHA key come from the admin dashboard, not this file. */
interface FormSettings {
  websiteId: string | null;
  recaptchaEnabled: boolean;
  recaptchaSiteKey: string | null;
}

const SETTINGS_CACHE_KEY = "dpb.formSettings";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let settingsPromise: Promise<FormSettings> | null = null;
let freshPromise: Promise<FormSettings> | null = null;
let recaptchaPromise: Promise<void> | null = null;

function readCachedSettings(): FormSettings | null {
  try {
    const raw = localStorage.getItem(SETTINGS_CACHE_KEY);
    return raw ? (JSON.parse(raw) as FormSettings) : null;
  } catch {
    return null;
  }
}

async function fetchSettings(): Promise<FormSettings> {
  const res = await withTimeout(
    fetch(`${API_BASE}/api/SiteDetail/by-name/${encodeURIComponent(SITE_NAME)}`),
    8000,
    "Form settings timed out.",
  );
  if (!res.ok) throw new Error(`Could not load form settings: ${res.statusText}`);
  const body = await res.json();
  const site = body?.data ?? {};
  const settings: FormSettings = {
    websiteId: site.crmWebsiteId ?? null,
    recaptchaEnabled: Boolean(site.recaptchaEnabled && site.recaptchaSiteKey),
    recaptchaSiteKey: site.recaptchaSiteKey ?? null,
  };
  try {
    localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(settings));
  } catch {
    // Storage blocked (private mode) — the in-memory copy still works.
  }
  return settings;
}

/**
 * The site's form settings. A copy saved from an earlier visit answers at once
 * while a fresh one loads in the background; the first visit waits for the API.
 * If the API is down, the last saved copy keeps the form working.
 */
export function getFormSettings(): Promise<FormSettings> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Form settings are only available in the browser."));
  }
  if (settingsPromise) return settingsPromise;

  const cached = readCachedSettings();
  const fresh = fetchSettings();
  freshPromise = fresh;
  // Once the fresh copy lands, later calls in this visit use it.
  fresh.then((s) => (settingsPromise = Promise.resolve(s))).catch(() => {});
  settingsPromise = cached
    ? Promise.resolve(cached)
    : fresh.catch((err) => {
        settingsPromise = null; // allow a retry on the next attempt
        throw err;
      });
  return settingsPromise;
}

/**
 * Calls back with the saved settings at once, then again when the fresh copy from
 * the API lands - so a change made in the dashboard shows on the first page view.
 */
export function watchFormSettings(onSettings: (s: FormSettings) => void): void {
  getFormSettings().then(onSettings).catch(() => {});
  freshPromise?.then(onSettings).catch(() => {});
}

/** Preload reCAPTCHA so its badge is visible before the form is submitted. */
export function preloadRecaptcha(): void {
  getFormSettings()
    .then((s) => (s.recaptchaEnabled && s.recaptchaSiteKey ? loadRecaptcha(s.recaptchaSiteKey) : undefined))
    .catch(() => {});
}

export function loadRecaptcha(siteKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("reCAPTCHA is only available in the browser."));
  }
  if (window.grecaptcha) return Promise.resolve();
  if (recaptchaPromise) return recaptchaPromise;

  recaptchaPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      recaptchaPromise = null; // allow a retry on the next attempt
      reject(new Error("Could not load reCAPTCHA."));
    };
    document.head.appendChild(script);
  });
  return recaptchaPromise;
}

/** Reject if a promise hasn't settled within ms (so the form never hangs). */
function withTimeout<T>(p: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error(message)), ms);
    p.then(
      (v) => {
        clearTimeout(id);
        resolve(v);
      },
      (e) => {
        clearTimeout(id);
        reject(e);
      },
    );
  });
}

/** Resolve a fresh reCAPTCHA v3 token for the given action. */
function getRecaptchaToken(siteKey: string, action = "submit"): Promise<string> {
  const token = new Promise<string>((resolve, reject) => {
    const gre = window.grecaptcha;
    if (!gre) {
      reject(new Error("reCAPTCHA is not ready."));
      return;
    }
    // ready()/execute() can in rare cases never settle (partial init) — the
    // timeout guarantees submitLead() rejects instead of hanging the form.
    gre.ready(() => {
      gre.execute(siteKey, { action }).then(resolve).catch(reject);
    });
  });
  return withTimeout(token, 12000, "reCAPTCHA timed out.");
}

export interface LeadData {
  fullName: string;
  email: string;
  phone: string;
  /** Free-text comment — we fold the city + message into this single field. */
  comment: string;
}

/**
 * Submit a lead to the WebAppConsulting CRM with a reCAPTCHA token. Throws on
 * failure (load error, token error, or non-2xx response) so the caller can
 * surface an error and decide whether to continue.
 */
export async function submitLead(data: LeadData): Promise<void> {
  const settings = await getFormSettings();
  if (!settings.websiteId) throw new Error("The form has no CRM website id set in the dashboard.");

  let token = "";
  if (settings.recaptchaEnabled && settings.recaptchaSiteKey) {
    await loadRecaptcha(settings.recaptchaSiteKey);
    token = await getRecaptchaToken(settings.recaptchaSiteKey, "submit");
  }

  const payload = {
    FullName: data.fullName,
    Email: data.email,
    Phone: data.phone,
    Comment: data.comment,
    WebSiteId: settings.websiteId,
    FormType: FORM_TYPE,
    RecaptchaToken: token,
  };

  const res = await fetch(LEAD_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit lead: ${res.statusText}`);
  }
}
