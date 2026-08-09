import { cn } from "@/lib/utils";

export function SliceMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M20 7.5 30.6 27.1c.47.87-.17 1.87-1.13 1.75a32.7 32.7 0 0 0-18.94 0c-.96.12-1.6-.88-1.13-1.75L20 7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <SliceMark className="h-7 w-7 text-gold" />
      <span className="leading-none">
        <span className="display block text-[1.5rem] tracking-[-0.01em] text-cream">
          Dela
        </span>
        <span className="label-xs mt-1 block text-gold">Pizza Bar</span>
      </span>
    </span>
  );
}
