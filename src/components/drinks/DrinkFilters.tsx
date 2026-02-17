"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wine, ListOrdered, CheckCircle, Search, Beaker } from "lucide-react";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "Before Dinner Cocktail", label: "Before Dinner" },
  { value: "After Dinner Cocktail", label: "After Dinner" },
  { value: "All Day Cocktail", label: "All Day" },
  { value: "Longdrink", label: "Longdrink" },
  { value: "Sparkling Cocktail", label: "Sparkling" },
  { value: "Hot Drink", label: "Hot Drink" },
  { value: "Other", label: "Other" },
];

export function DrinkFilters({
  searchQuery,
  onSearchQueryChange,
  ingredientSearchQuery,
  onIngredientSearchQueryChange,
  category,
  onCategoryChange,
  sortBy,
  onSortByChange,
  canMakeOnly,
  onCanMakeOnlyChange,
  canMakeThreshold,
  onCanMakeThresholdChange,
}: {
  searchQuery: string;
  onSearchQueryChange: (v: string) => void;
  ingredientSearchQuery: string;
  onIngredientSearchQueryChange: (v: string) => void;
  category: string | undefined;
  onCategoryChange: (v: string | undefined) => void;
  sortBy: "name" | "category";
  onSortByChange: (v: "name" | "category") => void;
  canMakeOnly: boolean;
  onCanMakeOnlyChange: (v: boolean) => void;
  canMakeThreshold: 1 | 0.8 | 0.5;
  onCanMakeThresholdChange: (v: 1 | 0.8 | 0.5) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            type="search"
            placeholder="Search drinks..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="max-w-xs"
            aria-label="Search drinks"
          />
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Beaker className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            type="search"
            placeholder="Search by ingredient..."
            value={ingredientSearchQuery}
            onChange={(e) => onIngredientSearchQueryChange(e.target.value)}
            className="max-w-xs"
            aria-label="Search by ingredient"
          />
        </div>
        <div className="flex items-center gap-2">
          <Wine className="h-4 w-4 text-muted-foreground" />
          <Select
            value={category ?? ""}
            onValueChange={(v) => onCategoryChange(v || undefined)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value || "all"} value={c.value || "all"}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(v: "name" | "category") => onSortByChange(v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">By Name</SelectItem>
              <SelectItem value="category">By Category</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant={canMakeOnly ? "default" : "outline"}
          size="sm"
          onClick={() => onCanMakeOnlyChange(!canMakeOnly)}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          What Can I Make?
        </Button>

        {canMakeOnly && (
          <Select
            value={String(canMakeThreshold)}
            onValueChange={(v) =>
              onCanMakeThresholdChange(Number(v) as 1 | 0.8 | 0.5)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">All ingredients</SelectItem>
              <SelectItem value="0.8">Most ingredients</SelectItem>
              <SelectItem value="0.5">Some ingredients</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
