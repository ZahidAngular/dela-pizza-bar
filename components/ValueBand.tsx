import { RevealGroup, RevealItem } from "@/components/Reveal";

const values = [
  {
    stat: "From $16",
    title: "Three sizes",
    body: 'L 12" from $16, F 15" from $22, P 18" from $32. Combo deals from $24.',
  },
  {
    stat: "Halal",
    title: "Certified halal",
    body: "Every pizza, every topping. The whole kitchen, not just a couple of items.",
  },
  {
    stat: "Delivered",
    title: "Uber Eats & DoorDash",
    body: "Listed on both platforms for delivery across the inner north.",
  },
  {
    stat: "7 days",
    title: "Always open",
    body: "11am to 10pm, every day of the week. No surprise closures.",
  },
];

export function ValueBand() {
  return (
    <section className="border-y border-line bg-ink">
      <div className="container-x">
        <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <RevealItem
              key={v.title}
              className={`group py-12 lg:px-9 lg:py-16 ${
                i === 0 ? "lg:pl-0" : ""
              } ${i === values.length - 1 ? "lg:pr-0" : ""} ${
                i > 0
                  ? "border-t border-line md:border-t-0 lg:border-l"
                  : ""
              } ${i === 1 ? "md:border-l md:border-line" : ""} ${
                i === 2 ? "md:border-t md:border-line" : ""
              } ${i === 3 ? "md:border-t md:border-l md:border-line" : ""}`}
            >
              <p className="display text-[1.9rem] text-cream transition-colors duration-500 group-hover:text-gold">
                {v.stat}
              </p>
              <h3 className="label-xs mt-4 text-gold">{v.title}</h3>
              <p className="mt-3 max-w-xs text-[0.87rem] leading-[1.75] text-body-soft">
                {v.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
