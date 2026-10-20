export type InspirationKind =
  | "sneaker"
  | "tee"
  | "jacket"
  | "bag"
  | "shorts"
  | "hoodie";

export type InspirationFilter = "Hauts" | "Bas" | "Accessoires";

export interface Inspiration {
  id: string;
  name: string;
  badge: string;
  category: string;
  filter: InspirationFilter;
  sizes: string[];
  kind: InspirationKind;
  tone: string;
  ink: string;
}

export const INSPIRATIONS: Inspiration[] = [
  {
    id: "sneakers-sport",
    name: "Sneakers sport",
    badge: "Style sport",
    category: "Chaussures",
    filter: "Accessoires",
    sizes: ["39", "40", "41", "42", "43", "44"],
    kind: "sneaker",
    tone: "#D8FF3E",
    ink: "#111110",
  },
  {
    id: "tshirt-training",
    name: "T-shirt training",
    badge: "Essentiel",
    category: "Haut",
    filter: "Hauts",
    sizes: ["S", "M", "L", "XL"],
    kind: "tee",
    tone: "#EDE7DB",
    ink: "#111110",
  },
  {
    id: "veste-sport",
    name: "Veste sport",
    badge: "Layering",
    category: "Haut",
    filter: "Hauts",
    sizes: ["S", "M", "L", "XL"],
    kind: "jacket",
    tone: "#D9E1E4",
    ink: "#111110",
  },
  {
    id: "sac-crossbody",
    name: "Sac crossbody",
    badge: "Accessoire",
    category: "Accessoire",
    filter: "Accessoires",
    sizes: ["Unique"],
    kind: "bag",
    tone: "#E8D6C2",
    ink: "#111110",
  },
  {
    id: "short-training",
    name: "Short training",
    badge: "Training",
    category: "Bas",
    filter: "Bas",
    sizes: ["S", "M", "L", "XL"],
    kind: "shorts",
    tone: "#F0CDBB",
    ink: "#111110",
  },
  {
    id: "hoodie-sport",
    name: "Hoodie sport",
    badge: "Daily fit",
    category: "Haut",
    filter: "Hauts",
    sizes: ["S", "M", "L", "XL"],
    kind: "hoodie",
    tone: "#CBD8C5",
    ink: "#111110",
  },
];

export const FILTERS = ["Tout", "Hauts", "Bas", "Accessoires"] as const;
