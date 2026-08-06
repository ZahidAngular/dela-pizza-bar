const phrases = [
  "Dine in",
  "Takeaway",
  "Open 7 days",
  "11am – 10pm",
  "Stone baked",
  "Fresh daily",
  "331 Prospect Road",
  "Blair Athol SA",
];

export function Marquee() {
  const line = [...phrases, ...phrases];

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2 py-5">
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {[...line, ...line].map((p, i) => (
          <span key={`${p}-${i}`} className="flex items-center">
            <span className="display px-8 text-[1.15rem] text-cream/85 sm:text-[1.35rem]">
              {p}
            </span>
            <span className="h-1 w-1 rotate-45 bg-gold/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
