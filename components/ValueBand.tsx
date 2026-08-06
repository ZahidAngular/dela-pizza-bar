import { RevealGroup, RevealItem } from "@/components/Reveal";

const values = [
  {
    stat: "From $22",
    title: "Fair pricing",
    body: 'A full 12" large starts at $22. Family size 15" from $33.',
  },
  {
    stat: "Dine in",
    title: "Eat in or take away",
    body: "Take a seat at the counter or take the box home — same price either way.",
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
              <h3 className="label-xs mt-4 text-gold/85">{v.title}</h3>
              <p className="mt-3 max-w-xs text-[0.87rem] leading-[1.75] text-cream/55">
                {v.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
