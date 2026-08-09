import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
  action,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        centered && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between md:gap-16",
        className
      )}
    >
      <Reveal className="max-w-2xl">
        <div
          className={cn(
            "flex items-center gap-4",
            centered && "justify-center"
          )}
        >
          {index ? (
            <span className="label-xs text-gold">{index}</span>
          ) : (
            <span className="gold-line" />
          )}
          <span className="eyebrow text-gold">{eyebrow}</span>
        </div>

        <h2 className="display mt-6 text-[2.35rem] text-cream sm:text-[3.1rem] lg:text-[3.7rem]">
          {title}
          {accent ? <span className="serif-italic"> {accent}</span> : null}
        </h2>

        {description ? (
          <p className="mt-6 text-[0.95rem] leading-[1.8] text-body">
            {description}
          </p>
        ) : null}
      </Reveal>

      {action ? (
        <Reveal delay={0.12} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
