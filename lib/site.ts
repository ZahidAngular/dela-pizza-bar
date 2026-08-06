export const site = {
  name: "Dela Pizza Bar",
  legalName: "Dela Pizza Bar",
  tagline: "Dine In · Takeaway",
  shortDescription:
    "Stone-baked pizza, golden fish & chips and generous toppings — made fresh every day on Prospect Road.",
  url: "https://delapizzabar.com.au",

  phone: {
    display: "8162 5863",
    href: "tel:+61881625863",
    intl: "+61 8 8162 5863",
  },

  address: {
    street: "331 Prospect Road",
    suburb: "Blair Athol",
    state: "SA",
    postcode: "5084",
    country: "Australia",
    full: "331 Prospect Road, Blair Athol SA 5084",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=331+Prospect+Road+Blair+Athol+SA+5084",
    embedUrl:
      "https://maps.google.com/maps?q=331%20Prospect%20Road%2C%20Blair%20Athol%20SA%205084&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },

  hours: {
    summary: "Open 7 Days · 11:00 am – 10:00 pm",
    opensAt: "11:00",
    closesAt: "22:00",
    days: [
      { day: "Monday", open: "11:00 am", close: "10:00 pm" },
      { day: "Tuesday", open: "11:00 am", close: "10:00 pm" },
      { day: "Wednesday", open: "11:00 am", close: "10:00 pm" },
      { day: "Thursday", open: "11:00 am", close: "10:00 pm" },
      { day: "Friday", open: "11:00 am", close: "10:00 pm" },
      { day: "Saturday", open: "11:00 am", close: "10:00 pm" },
      { day: "Sunday", open: "11:00 am", close: "10:00 pm" },
    ],
  },

  social: {
    instagram: "https://www.instagram.com/delapizzabar/",
    instagramHandle: "@delapizzabar",
  },

  ordering: {
    uberEats:
      "https://www.ubereats.com/au/store/dela-pizza-bar/UKK9Fsc9Q623TfEBzvB71w",
    doorDash:
      "https://www.doordash.com/en-AU/store/dela-pizza-bar-blair-athol-24997834/22677552/",
  },

  stats: [
    { value: "3.7", label: "Google rating", suffix: "★" },
    { value: "240", label: "Customer reviews", suffix: "+" },
    { value: "7", label: "Days a week", suffix: "/7" },
    { value: "11", label: "Hours daily", suffix: "hr" },
  ],
} as const;

export type Site = typeof site;
