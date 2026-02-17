"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DrinkGrid } from "@/components/drinks/DrinkGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SavedDrinksPage() {
  const saved = useQuery(api.savedDrinks.list);
  const allDrinks = useQuery(
    api.drinks.list,
    saved && saved.length > 0 ? {} : "skip"
  );

  const savedDrinks =
    saved && allDrinks
      ? saved
          .map((s) => allDrinks.find((d) => d._id === s.drinkId))
          .filter(Boolean)
      : [];

  const isLoading =
    saved === undefined ||
    (saved.length > 0 && allDrinks === undefined);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Saved Drinks</h1>
      <p className="text-muted-foreground mb-6">
        Your favorite drinks, saved for quick access.
      </p>

      <SignedOut>
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Sign in to save drinks and access them here.
          </p>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </SignedOut>

      <SignedIn>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        ) : savedDrinks.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No saved drinks yet. Browse the catalog and click the heart icon to save drinks you like.
            </p>
            <Button asChild>
              <Link href="/drinks">Explore Drinks</Link>
            </Button>
          </div>
        ) : (
          <DrinkGrid drinks={savedDrinks as any} />
        )}
      </SignedIn>
    </div>
  );
}
