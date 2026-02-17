import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center space-y-8 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Bartender
        </h1>
        <p className="text-xl text-muted-foreground">
          The go to app for all of your bartending, barkeeping, and mixologist
          needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/drinks">Explore Drinks</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/inventory">Manage Inventory</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
