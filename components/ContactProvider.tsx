"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ContactContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactContext);
  if (!ctx)
    throw new Error("useContactModal must be used inside <ContactProvider>");
  return ctx;
}

/* Opens the dialog from anywhere — including the server-rendered footer,
   which cannot hold a click handler of its own. */
export function ContactTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { setOpen } = useContactModal();
  return (
    <button type="button" onClick={() => setOpen(true)} className={className}>
      {children}
    </button>
  );
}
