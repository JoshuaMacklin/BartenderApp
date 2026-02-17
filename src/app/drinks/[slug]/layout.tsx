import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${title} | Bartender`,
    description: `Learn how to make ${title} - ingredients, preparation, and history.`,
  };
}

export default function DrinkDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
