import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory | Bartender",
  description: "Manage your bar ingredients and track what you have in stock.",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
