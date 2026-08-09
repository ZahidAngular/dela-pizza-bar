/**
 * Transcribed from the shop's printed takeaway menu (the authoritative source).
 * Pizzas come in three sizes: L 12", F 15", P 18".
 */

export type MenuItem = {
  name: string;
  description?: string;
  /** Single-price items (fish & chips, sides, drinks) */
  price?: string;
  /** L 12" */
  large?: string;
  /** F 15" */
  family?: string;
  /** P 18" */
  party?: string;
  tags?: string[];
};

export type MenuCategory = {
  id: string;
  title: string;
  kicker: string;
  blurb: string;
  image: string;
  priced: "sizes" | "single";
  items: MenuItem[];
};

export const sizeColumns = [
  { key: "large", label: 'L 12"', short: "Large" },
  { key: "family", label: 'F 15"', short: "Family" },
  { key: "party", label: 'P 18"', short: "Party" },
] as const;

export const menu: MenuCategory[] = [
  {
    id: "pizza",
    title: "Traditional",
    kicker: "Stone baked",
    blurb:
      'Hand-stretched dough, proved daily and finished in a blistering deck oven. Every pizza in L 12", F 15" or P 18".',
    image: "/images/menu-pizza.jpg",
    priced: "sizes",
    items: [
      {
        name: "Cheese Lover's",
        description: "Tomato sauce, lots of mozzarella cheese",
        large: "16.00",
        family: "22.00",
        party: "32.00",
        tags: ["Vegetarian"],
      },
      {
        name: "Australian",
        description: "Tomato sauce, cheese, shredded beef",
        large: "16.50",
        family: "22.50",
        party: "32.50",
      },
      {
        name: "Hawaiian",
        description: "Tomato sauce, cheese, shredded beef, pineapple",
        large: "16.50",
        family: "22.50",
        party: "32.50",
      },
      {
        name: "Pepperoni",
        description: "Tomato sauce, salami, cheese",
        large: "16.50",
        family: "22.50",
        party: "32.50",
        tags: ["Popular"],
      },
      {
        name: "Meat Lover's",
        description:
          "Tomato sauce, salami, shredded beef, smokey beef, cheese",
        large: "16.50",
        family: "22.50",
        party: "32.50",
        tags: ["Popular"],
      },
      {
        name: "Mexicana",
        description:
          "Tomato sauce, cheese, onion, salami, capsicum, kalamata olives, hot chilli",
        large: "16.50",
        family: "22.50",
        party: "32.50",
        tags: ["Spicy"],
      },
      {
        name: "Margherita",
        description:
          "Tomato sauce, cheese, fresh tomato, oregano, bocconcini cheese",
        large: "16.50",
        family: "22.50",
        party: "32.50",
        tags: ["Vegetarian"],
      },
      {
        name: "Mushroom",
        description: "Tomato sauce, cheese, shredded beef, mushroom",
        large: "16.50",
        family: "22.50",
        party: "32.50",
      },
      {
        name: "The Lot",
        description:
          "Tomato sauce, cheese, shredded beef, salami, mushroom, onion, capsicum, pineapple, kalamata olives",
        large: "17.00",
        family: "23.50",
        party: "33.50",
        tags: ["Chef's pick"],
      },
      {
        name: "Vegetarian",
        description:
          "Tomato sauce, cheese, mushroom, capsicum, onion, pineapple, kalamata olives",
        large: "17.00",
        family: "23.00",
        party: "33.00",
        tags: ["Vegetarian"],
      },
    ],
  },
  {
    id: "chicken",
    title: "Chicken",
    kicker: "The chicken range",
    blurb:
      "Nine chicken pizzas, from a simple barbecue base to the loaded Special. Same three sizes.",
    image: "/images/sig-special-chicken.jpg",
    priced: "sizes",
    items: [
      {
        name: "Classic Chicken",
        description: "Barbecue sauce, cheese, chicken, onion, capsicum",
        large: "17.00",
        family: "23.00",
        party: "33.00",
      },
      {
        name: "Barbecue Chicken",
        description:
          "Tomato sauce, cheese, barbecue sauce, mushroom, onion, chicken",
        large: "17.00",
        family: "23.00",
        party: "33.00",
      },
      {
        name: "Chicken Mexicana",
        description:
          "Tomato sauce, cheese, chicken, onion, capsicum, kalamata olives, hot chilli",
        large: "17.00",
        family: "23.00",
        party: "33.00",
        tags: ["Spicy"],
      },
      {
        name: "Chicken Hawaiian",
        description: "Tomato sauce, cheese, chicken, pineapple",
        large: "17.00",
        family: "23.00",
        party: "33.00",
      },
      {
        name: "Spicy Chicken Ranch",
        description:
          "Tomato sauce, cheese, chicken, mushroom, fresh tomato, jalapeño, ranch sauce",
        large: "17.00",
        family: "23.00",
        party: "33.00",
        tags: ["Spicy"],
      },
      {
        name: "Chicken Feast",
        description:
          "Barbecue sauce, cheese, barbecue chicken, capsicum, pineapple, mushroom, onion",
        large: "17.50",
        family: "24.00",
        party: "34.00",
      },
      {
        name: "Chicken Supreme",
        description:
          "Tomato sauce, cheese, chicken, mushroom, onion, capsicum, pineapple, kalamata olives",
        large: "18.00",
        family: "24.50",
        party: "35.00",
      },
      {
        name: "Special Pizza",
        description:
          "Tomato sauce, cheese, chicken, mushroom, onion, capsicum, fresh tomato, jalapeño, kalamata olives, ranch sauce",
        large: "19.00",
        family: "25.00",
        party: "35.50",
        tags: ["Signature"],
      },
      {
        name: "Spicy Vegetarian",
        description:
          "Tomato sauce, cheese, mushroom, onion, capsicum, jalapeño, kalamata olives, ranch sauce, fresh tomato, hot chilli",
        large: "19.00",
        family: "25.00",
        party: "35.50",
        tags: ["Vegetarian", "Spicy"],
      },
    ],
  },
  {
    id: "fish-chips",
    title: "Fish & Chips",
    kicker: "Fried to order",
    blurb:
      "Fresh from the fryer in a light, shattering batter — never sitting under a warmer.",
    image: "/images/menu-fish-chips.jpg",
    priced: "single",
    items: [
      {
        name: "Pack",
        description: "1 butterfish, 2 calamari, 2 prawn & chips",
        price: "15.50",
        tags: ["Best value"],
      },
      {
        name: "Prawn Pack",
        description: "8 prawn · extra prawns $1.80 each",
        price: "13.00",
      },
      {
        name: "Calamari Pack",
        description: "8 calamari · extra calamari $1.50 each",
        price: "11.00",
      },
      {
        name: "Chips",
        description: "Small $6.50 · large",
        price: "8.50",
      },
      {
        name: "Butterfish",
        description: "Regular $6.50 · large",
        price: "7.00",
        tags: ["Popular"],
      },
      { name: "Tartare Sauce", price: "2.50" },
      { name: "Dim Sim", price: "2.00" },
      { name: "Fish Cake", price: "1.80" },
      { name: "Potato Cake", price: "1.30" },
    ],
  },
  {
    id: "sides",
    title: "Garlic Bread",
    kicker: "The extras",
    blurb: "Oven-toasted and brushed with garlic butter. Cheaper with a pizza.",
    image: "/images/menu-sides.jpg",
    priced: "single",
    items: [
      {
        name: "Garlic Bread",
        description: "On its own",
        price: "5.50",
        tags: ["Vegetarian"],
      },
      {
        name: "Garlic Bread with pizza",
        description: "When ordered with any pizza",
        price: "4.50",
        tags: ["Vegetarian", "Best value"],
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    kicker: "Ice cold",
    blurb: "Straight out of the fridge, always cold.",
    image: "/images/menu-drinks.jpg",
    priced: "single",
    items: [
      { name: "Coke", description: "1.25L bottle", price: "5.50" },
      { name: "Ginger Beer", price: "5.00" },
      { name: "Barbican", description: "Non-alcoholic malt", price: "4.00" },
      { name: "Can Drinks", description: "Assorted, 375ml", price: "3.00" },
      { name: "Water", price: "2.50" },
    ],
  },
];

/** Pick-up only combo deals, straight off the printed menu. */
export const deals = [
  {
    n: "Deal 1",
    price: "24.00",
    items: ["1 large traditional pizza", "Garlic bread", "1.25L drink"],
  },
  {
    n: "Deal 2",
    price: "42.00",
    items: ["2 large traditional pizzas", "Garlic bread", "1.25L drink"],
  },
  {
    n: "Deal 3",
    price: "60.00",
    items: ["3 large traditional pizzas", "2 garlic bread", "1.25L drink"],
  },
  {
    n: "Deal 4",
    price: "30.00",
    items: ["1 family traditional pizza", "Garlic bread", "1.25L drink"],
  },
];

export const dealsNote =
  "Pick up only. Extra charges apply on half & half and chicken pizzas.";

export const signatures = [
  {
    name: "The Lot",
    price: "17.00",
    description:
      "Everything we do well on one base — shredded beef, salami, mushroom, onion, capsicum, pineapple and kalamata olives.",
    image: "/images/sig-the-lot.jpg",
    badge: "Chef's pick",
  },
  {
    name: "Special Pizza",
    price: "19.00",
    description:
      "Our house signature. Chicken, jalapeño, ranch and a full garden of toppings, edge to edge.",
    image: "/images/sig-special-chicken.jpg",
    badge: "Signature",
  },
  {
    name: "Meat Lover's",
    price: "16.50",
    description:
      "Salami, shredded beef and smokey beef layered over tomato sauce and mozzarella.",
    image: "/images/sig-meatlovers.jpg",
    badge: "Most ordered",
  },
];
