/**
 * Client for the Multi-Site Admin API that backs this site.
 *
 * The site name must match the site name created for this site in the Multi-Site
 * Admin dashboard - the API looks the site up by it. The session lives in
 * localStorage: the API is a separate origin issuing JWTs, and the dashboard
 * screens are client components.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://multisiteapi.runasp.net";

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Dela-Pizza-Bar";

const TOKEN_KEY = "dpb.token";
const USER_KEY = "dpb.user";
const REFRESH_KEY = "dpb.refresh";
const EXPIRES_KEY = "dpb.expiresAt";

type ApiResponse<T> = { success: boolean; message: string; data: T | null };

export type AuthUser = {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  siteName?: string | null;
};

export type SiteDetail = {
  siteName: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  whatsapp?: string | null;
  crmWebsiteId?: string | null;
  recaptchaEnabled?: boolean;
  recaptchaSiteKey?: string | null;
  updatedAt?: string | null;
};

type AuthPayload = {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  user: AuthUser;
};

function read(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null; // private mode browsers throw on access
  }
}

export const auth = {
  get token() {
    return read(TOKEN_KEY);
  },
  get refreshToken() {
    return read(REFRESH_KEY);
  },
  get expiresAt(): number | null {
    const raw = read(EXPIRES_KEY);
    return raw ? Number(raw) : null;
  },
  get user(): AuthUser | null {
    try {
      const raw = read(USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  },
  save(p: AuthPayload) {
    try {
      localStorage.setItem(TOKEN_KEY, p.accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(p.user));
      localStorage.setItem(REFRESH_KEY, p.refreshToken);
      localStorage.setItem(EXPIRES_KEY, String(Date.parse(p.accessTokenExpiresAt)));
    } catch {
      /* storage unavailable - the session simply will not persist */
    }
  },
  clear() {
    try {
      [TOKEN_KEY, USER_KEY, REFRESH_KEY, EXPIRES_KEY].forEach((k) => localStorage.removeItem(k));
    } catch {
      /* nothing to clear */
    }
  },
};

/** Thrown for any non-2xx reply, carrying the API's own message. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// One shared refresh at a time - the refresh token is single-use.
let refreshing: Promise<boolean> | null = null;

async function doRefresh(): Promise<boolean> {
  const refreshToken = auth.refreshToken;
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    if (!res.ok) return false;
    const payload = (await res.json()) as ApiResponse<AuthPayload>;
    if (!payload.data) return false;
    auth.save(payload.data);
    return true;
  } catch {
    return false;
  }
}

async function ensureFreshToken() {
  if (!auth.refreshToken) return;
  const expiresAt = auth.expiresAt;
  if (auth.token && expiresAt !== null && expiresAt - Date.now() >= 30_000) return;

  refreshing ??= doRefresh().finally(() => {
    refreshing = null;
  });
  if (!(await refreshing)) auth.clear();
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; form?: FormData; auth?: boolean } = {},
): Promise<T> {
  const { method = "GET", body, form, auth: withAuth = true } = options;
  if (withAuth) await ensureFreshToken();

  const send = () =>
    fetch(`${API_BASE}/api${path}`, {
      method,
      headers: {
        // A FormData body sets its own multipart boundary header.
        ...(form ? {} : { "Content-Type": "application/json" }),
        ...(withAuth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
      },
      body: form ?? (body === undefined ? undefined : JSON.stringify(body)),
      cache: "no-store",
    });

  let res = await send();
  if (res.status === 401 && withAuth && auth.refreshToken && (await doRefresh())) res = await send();

  let payload: ApiResponse<T> | null = null;
  try {
    payload = (await res.json()) as ApiResponse<T>;
  } catch {
    /* error pages have no JSON body */
  }
  if (!res.ok) throw new ApiError(payload?.message || `Request failed (${res.status})`, res.status);
  return payload?.data as T;
}

export const api = {
  async login(email: string, password: string) {
    // siteName makes the API refuse users of other sites; Admins can still sign in.
    const data = await request<AuthPayload>("/auth/login", {
      method: "POST",
      body: { email, password, siteName: SITE_NAME },
      auth: false,
    });
    auth.save(data);
    return data.user;
  },

  async logout() {
    // Revokes the refresh token server-side; signs out locally even if the call fails.
    try {
      await request<string>("/auth/logout", { method: "POST" });
    } catch {
      /* still signing out locally */
    }
    auth.clear();
  },

  /** The signed-in user's own site. */
  mySite() {
    return request<SiteDetail>("/SiteDetail");
  },

  /** Saves the editable contact fields; the site name and logos are left as they are. */
  saveMySite(values: { name: string; email: string; phoneNumber: string; whatsapp: string }) {
    const form = new FormData();
    form.set("Name", values.name);
    form.set("Email", values.email);
    form.set("PhoneNumber", values.phoneNumber);
    form.set("Whatsapp", values.whatsapp);
    return request<SiteDetail>("/SiteDetail", { method: "PUT", form });
  },
};
