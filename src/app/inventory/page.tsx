"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { IngredientForm } from "@/components/inventory/IngredientForm";
import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function InventoryPage() {
  const ingredients = useQuery(api.ingredients.list);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<Id<"ingredients"> | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <SignedOut>
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Sign in to manage your ingredient inventory.
          </p>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold">Inventory</h1>
            <Button onClick={() => { setEditingId(null); setDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Ingredient
            </Button>
          </div>

          {ingredients === undefined ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <InventoryTable
              ingredients={ingredients}
              onEdit={(id) => {
                setEditingId(id);
                setDialogOpen(true);
              }}
            />
          )}

          <IngredientForm
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            editingId={editingId}
            onClose={() => setEditingId(null)}
          />
        </div>
      </SignedIn>
    </div>
  );
}
