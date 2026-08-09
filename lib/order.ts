export type OrderSize = "Large" | "Family" | "Party" | "Single" | "Deal";

/** How each size reads on the printed menu. */
export const sizeLabel: Record<OrderSize, string> = {
  Large: 'L 12"',
  Family: 'F 15"',
  Party: 'P 18"',
  Single: "Each",
  Deal: "Pick up only",
};

export type OrderLine = {
  /** Stable key: item name + size */
  id: string;
  name: string;
  size: OrderSize;
  /** Unit price in dollars */
  price: number;
  qty: number;
};

export const lineId = (name: string, size: OrderSize) => `${name}__${size}`;

export const lineTotal = (l: OrderLine) => l.price * l.qty;

export const orderTotal = (lines: OrderLine[]) =>
  lines.reduce((sum, l) => sum + lineTotal(l), 0);

export const orderCount = (lines: OrderLine[]) =>
  lines.reduce((sum, l) => sum + l.qty, 0);

export const money = (n: number) =>
  n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;

/** Plain-text summary the customer can read out or paste into a message. */
export function formatOrder(lines: OrderLine[], shopName: string) {
  if (lines.length === 0) return "";

  const rows = lines.map((l) => {
    const size =
      l.size === "Single" || l.size === "Deal"
        ? ""
        : ` (${l.size} ${sizeLabel[l.size]})`;
    return `${l.qty} x ${l.name}${size} — ${money(lineTotal(l))}`;
  });

  return [
    `${shopName} order`,
    "",
    ...rows,
    "",
    `Total: ${money(orderTotal(lines))}`,
  ].join("\n");
}
