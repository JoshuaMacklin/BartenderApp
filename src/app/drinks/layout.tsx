import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drinks Catalog | Bartender",
  description:
    "Browse IBA official cocktails. Sort by name or category, filter by what you can make with your inventory.",
};

export default function DrinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
