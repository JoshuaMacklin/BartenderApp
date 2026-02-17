"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { DrinkGrid } from "@/components/drinks/DrinkGrid";
import { DrinkFilters } from "@/components/drinks/DrinkFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function DrinksPage() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<"name" | "category">("name");
  const [canMakeOnly, setCanMakeOnly] = useState(false);
  const [canMakeThreshold, setCanMakeThreshold] = useState<1 | 0.8 | 0.5>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredientSearchQuery, setIngredientSearchQuery] = useState("");

  const allDrinks = useQuery(api.drinks.list, {
    category: category || undefined,
    sortBy,
  });
  const makeableDrinks = useQuery(
    api.drinks.canMake,
    canMakeOnly ? { threshold: canMakeThreshold } : "skip"
  );

  const baseDrinks = canMakeOnly && makeableDrinks ? makeableDrinks : allDrinks ?? [];
  const drinks = baseDrinks
    .filter((d) => !category || d.category === category)
    .filter(
      (d) =>
        !searchQuery.trim() ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (d) =>
        !ingredientSearchQuery.trim() ||
        d.ingredients.some((i) =>
          i.name.toLowerCase().includes(ingredientSearchQuery.toLowerCase())
        )
    )
    .sort((a, b) =>
      sortBy === "name"
        ? a.name.localeCompare(b.name)
        : a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Drinks Catalog</h1>
        <p className="text-muted-foreground">
          Browse IBA official cocktails. Sort by name or category, or filter by what you can make with your inventory.
        </p>
      </div>

      <DrinkFilters
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        ingredientSearchQuery={ingredientSearchQuery}
        onIngredientSearchQueryChange={setIngredientSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        canMakeOnly={canMakeOnly}
        onCanMakeOnlyChange={setCanMakeOnly}
        canMakeThreshold={canMakeThreshold}
        onCanMakeThresholdChange={setCanMakeThreshold}
      />

      {allDrinks === undefined ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      ) : (
        <DrinkGrid drinks={drinks} />
      )}
    </div>
  );
}
