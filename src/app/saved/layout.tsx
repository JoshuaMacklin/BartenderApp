import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Drinks | Bartender",
  description: "Your favorite drinks, saved for quick access.",
};

export default function SavedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
