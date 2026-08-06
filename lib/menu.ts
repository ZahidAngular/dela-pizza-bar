export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  large?: string;
  family?: string;
  tags?: string[];
};

export type MenuCategory = {
  id: string;
  title: string;
  kicker: string;
  blurb: string;
  image: string;
  priced: "dual" | "single";
  columns?: [string, string];
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "pizza",
    title: "Pizza",
    kicker: "Stone baked",
    blurb:
      "Hand-stretched dough, proved daily and finished in a blistering deck oven. Every pizza comes in 12\" Large or 15\" Family.",
    image: "/images/menu-pizza.jpg",
    priced: "dual",
    columns: ['12" Large', '15" Family'],
    items: [
      {
        name: "Cheese Lovers",
        description: "Tomato sauce, a deep blanket of mozzarella",
        large: "22",
        family: "33",
        tags: ["Vegetarian"],
      },
      {
        name: "Hawaiian",
        description: "Tomato sauce, shredded beef, pineapple",
        large: "22",
        family: "33",
      },
      {
        name: "Australian",
        description: "Tomato sauce, shredded beef, mozzarella",
        large: "22",
        family: "33",
      },
      {
        name: "Pepperoni",
        description: "Tomato sauce, salami, cheese",
        large: "23",
        family: "34",
        tags: ["Popular"],
      },
      {
        name: "Meatlovers",
        description: "Tomato sauce, salami, shredded beef, smokey beef",
        large: "23",
        family: "34",
        tags: ["Popular"],
      },
      {
        name: "Mushroom",
        description: "Tomato sauce, shredded beef, mushroom",
        large: "23",
        family: "34",
      },
      {
        name: "Margherita",
        description: "Tomato sauce, tomato, oregano, bocconcini",
        large: "23",
        family: "34",
        tags: ["Vegetarian"],
      },
      {
        name: "Mexican",
        description: "Tomato sauce, onion, salami, capsicum, olives, chilli",
        large: "23",
        family: "34",
        tags: ["Spicy"],
      },
      {
        name: "Classic Chicken",
        description: "Barbecue sauce, chicken, onion, capsicum",
        large: "24",
        family: "35",
      },
      {
        name: "Chicken Mexican",
        description:
          "Tomato sauce, chicken, onion, capsicum, olives, chilli",
        large: "24",
        family: "35",
        tags: ["Spicy"],
      },
      {
        name: "Spicy Chicken Ranch",
        description: "Tomato sauce, mushroom, tomato, jalapeño, ranch",
        large: "24",
        family: "35",
        tags: ["Spicy"],
      },
      {
        name: "Barbecue Chicken",
        description:
          "Tomato sauce, barbecue sauce, mushroom, onion, chicken",
        large: "24",
        family: "35",
      },
      {
        name: "Chicken Hawaiian",
        description: "Tomato sauce, chicken, pineapple",
        large: "24",
        family: "35",
      },
      {
        name: "The Lot",
        description:
          "Beef, salami, mushroom, onion, capsicum, pineapple, olives",
        large: "24",
        family: "35",
        tags: ["Chef's pick"],
      },
      {
        name: "Vegetarian",
        description:
          "Tomato sauce, mushroom, capsicum, onion, pineapple, olives",
        large: "24",
        family: "35",
        tags: ["Vegetarian"],
      },
      {
        name: "Chicken Feast",
        description:
          "Barbecue chicken, capsicum, pineapple, mushroom, onion",
        large: "25",
        family: "36",
      },
      {
        name: "Special Chicken",
        description:
          "Chicken, mushroom, onion, capsicum, tomato, jalapeño, olives, ranch",
        large: "27",
        family: "38",
        tags: ["Signature"],
      },
    ],
  },
  {
    id: "fish-chips",
    title: "Fish & Chips",
    kicker: "Fried to order",
    blurb:
      "Fresh from the fryer in a light, shattering batter — never sitting under a warmer.",
    image:
      "/images/menu-fish-chips.jpg",
    priced: "single",
    items: [
      {
        name: "Butterfish",
        description: "Regular $9 · Large",
        price: "10",
        tags: ["Popular"],
      },
      {
        name: "Seafood Pack",
        description:
          "Butterfish, 2 calamari, 2 prawns and a generous serve of chips",
        price: "23",
        tags: ["Best value"],
      },
      {
        name: "Calamari",
        description: "8 pieces, lightly salted · single piece $2",
        price: "12.70",
      },
      { name: "Prawn", description: "Golden crumbed, per piece", price: "2.70" },
      { name: "Fish Cake", description: "Per piece", price: "2.50" },
      { name: "Dim Sim", description: "Steamed or fried", price: "2.50" },
      { name: "Potato Cake", description: "Per piece", price: "2.00" },
      { name: "Potato Fritter", description: "Per piece", price: "2.00" },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    kicker: "The extras",
    blurb: "The little things that finish the table.",
    image:
      "/images/menu-sides.jpg",
    priced: "single",
    items: [
      {
        name: "Garlic Bread",
        description: "Oven-toasted, brushed with garlic butter and herbs",
        price: "6.50",
        tags: ["Vegetarian"],
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    kicker: "Ice cold",
    blurb: "Straight out of the fridge, always cold.",
    image:
      "/images/menu-drinks.jpg",
    priced: "single",
    items: [
      { name: "Coke 1.25L", description: "Family size bottle", price: "6.50" },
      { name: "Barbican", description: "Non-alcoholic malt, assorted flavours", price: "4.50" },
      { name: "Can Drinks", description: "Assorted soft drinks, 375ml", price: "3.50" },
      { name: "Water", description: "Chilled still water", price: "3.00" },
    ],
  },
];

export const signatures = [
  {
    name: "The Lot",
    price: "24",
    description:
      "Everything we do well on one base — beef, salami, mushroom, onion, capsicum, pineapple and olives.",
    image:
      "/images/sig-the-lot.jpg",
    badge: "Chef's pick",
  },
  {
    name: "Special Chicken",
    price: "27",
    description:
      "Our house signature. Chicken, jalapeño, ranch and a full garden of toppings, edge to edge.",
    image:
      "/images/sig-special-chicken.jpg",
    badge: "Signature",
  },
  {
    name: "Meatlovers",
    price: "23",
    description:
      "Salami, shredded beef and smokey beef layered over tomato sauce and mozzarella.",
    image:
      "/images/sig-meatlovers.jpg",
    badge: "Most ordered",
  },
];

export const testimonials = [
  {
    quote:
      "The pizzas are always delicious. Most of the time I order ahead and they always get fresh and hot pizza.",
    author: "Mehrab Sadik",
    source: "Google Review",
  },
  {
    quote:
      "The customer service was genuinely amazing — super welcoming, friendly, and respectful the whole time.",
    author: "Les Ho",
    source: "Google Review",
  },
  {
    quote:
      "Dela Pizza Bar does not try to be fancy — just honest, tasty pizza with generous toppings and a smile.",
    author: "Moh",
    source: "Google Review",
  },
];
