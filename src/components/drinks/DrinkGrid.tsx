"use client";

import type { Doc, Id } from "@/convex/_generated/dataModel";
import { DrinkCard } from "./DrinkCard";

export function DrinkGrid({
  drinks,
}: {
  drinks: (Doc<"drinks"> & { _id: Id<"drinks"> })[];
}) {
  if (drinks.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">
          No drinks match your filters. Try adjusting the category or turn off &quot;What Can I Make?&quot; to see all drinks.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {drinks.map((drink) => (
        <DrinkCard key={drink._id} drink={drink} />
      ))}
    </div>
  );
}
