"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { lineId, type OrderLine, type OrderSize } from "@/lib/order";

const STORAGE_KEY = "dela-order";

/* ------------------------------------------------------------------
   The order lives in a tiny external store rather than component state.
   That lets the server render an empty order and the client adopt the
   saved one on subscribe, with no hydration mismatch.
------------------------------------------------------------------- */

const EMPTY: OrderLine[] = [];

let lines: OrderLine[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function isLine(value: unknown): value is OrderLine {
  if (typeof value !== "object" || value === null) return false;
  const l = value as OrderLine;
  return (
    typeof l.id === "string" &&
    typeof l.name === "string" &&
    typeof l.price === "number" &&
    typeof l.qty === "number" &&
    l.qty > 0
  );
}

function readStored(): OrderLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const valid = parsed.filter(isLine);
    return valid.length > 0 ? valid : EMPTY;
  } catch {
    return EMPTY;
  }
}

function persist(next: OrderLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — the order still works for this session */
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);

  // First subscriber adopts whatever was saved last visit.
  if (!hydrated) {
    hydrated = true;
    const stored = readStored();
    if (stored !== EMPTY) {
      lines = stored;
      emit();
    }
  }

  return () => {
    listeners.delete(onChange);
  };
}

const getSnapshot = () => lines;
const getServerSnapshot = () => EMPTY;

function update(next: OrderLine[]) {
  lines = next;
  persist(next);
  emit();
}

/* ------------------------------------------------------------------ */

type OrderContextValue = {
  lines: OrderLine[];
  open: boolean;
  /** Bumped every time a line is added — lets the trigger acknowledge it. */
  pulse: number;
  add: (name: string, size: OrderSize, price: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const add = useCallback((name: string, size: OrderSize, price: number) => {
    const id = lineId(name, size);
    const existing = lines.find((l) => l.id === id);
    update(
      existing
        ? lines.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...lines, { id, name, size, price, qty: 1 }]
    );
    setPulse((p) => p + 1);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    update(
      qty <= 0
        ? lines.filter((l) => l.id !== id)
        : lines.map((l) => (l.id === id ? { ...l, qty } : l))
    );
  }, []);

  const remove = useCallback((id: string) => {
    update(lines.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => update(EMPTY), []);

  const value = useMemo(
    () => ({
      lines: current,
      open,
      pulse,
      add,
      setQty,
      remove,
      clear,
      setOpen,
    }),
    [current, open, pulse, add, setQty, remove, clear]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}
