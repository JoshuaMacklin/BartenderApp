"use client";

import Link from "next/link";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DrinkCard({
  drink,
}: {
  drink: Doc<"drinks"> & { _id: Id<"drinks"> };
}) {
  return (
    <Link href={`/drinks/${drink.slug}`}>
      <Card className="h-full transition-colors hover:border-primary/50 hover:bg-accent/5">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-tight line-clamp-2">
              {drink.name}
            </h3>
            <Badge variant="secondary" className="shrink-0 text-xs">
              {drink.glass}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {drink.category}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {drink.ingredients.slice(0, 3).map((i) => i.name).join(", ")}
            {drink.ingredients.length > 3 ? "..." : ""}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
