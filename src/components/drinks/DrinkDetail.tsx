"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Heart, Wine } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export function DrinkDetail({
  drink,
}: {
  drink: Doc<"drinks"> & { _id: Id<"drinks"> };
}) {
  const { isSignedIn } = useUser();
  const isSaved = useQuery(
    api.savedDrinks.isSaved,
    isSignedIn ? { drinkId: drink._id } : "skip"
  );
  const saveDrink = useMutation(api.savedDrinks.save);
  const unsaveDrink = useMutation(api.savedDrinks.unsave);
  const makeDrink = useMutation(api.ingredients.subtractForDrink);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [making, setMaking] = useState(false);

  const handleToggleSave = async () => {
    if (!isSignedIn) {
      toast.error("Sign in to save drinks");
      return;
    }
    try {
      if (isSaved) {
        await unsaveDrink({ drinkId: drink._id });
        toast.success("Removed from saved drinks");
      } else {
        await saveDrink({ drinkId: drink._id });
        toast.success("Saved to your drinks");
      }
    } catch {
      toast.error("Failed to update saved drinks");
    }
  };

  const handleMake = async () => {
    if (!isSignedIn) {
      toast.error("Sign in to make drinks and track inventory");
      return;
    }
    setMaking(true);
    try {
      await makeDrink({ drinkId: drink._id });
      toast.success(`Made ${drink.name}! Ingredients subtracted from inventory.`);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Failed to make drink. Check your inventory."
      );
    } finally {
      setMaking(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{drink.name}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>{drink.category}</Badge>
            <Badge variant="secondary">{drink.glass}</Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleSave}
          aria-label={isSaved ? "Remove from saved" : "Save drink"}
          className={isSaved ? "text-primary" : ""}
        >
          <Heart
            className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`}
          />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Ingredients</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {drink.ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between">
                <span>{ing.name}</span>
                <span className="text-muted-foreground">
                  {ing.amount} {ing.unit}
                </span>
              </li>
            ))}
            {drink.garnish && (
              <li className="flex justify-between text-muted-foreground">
                <span>Garnish</span>
                <span>{drink.garnish}</span>
              </li>
            )}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Preparation</h2>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{drink.preparation ?? "No preparation specified."}</p>
        </CardContent>
      </Card>

      {drink.history && (
        <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold">History & Story</h2>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    historyOpen ? "rotate-180" : ""
                  }`}
                />
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground">
                  {drink.history}
                </p>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      <div className="flex flex-wrap gap-4">
        {isSignedIn && (
          <Button
            onClick={handleMake}
            disabled={making}
          >
            <Wine className="mr-2 h-4 w-4" />
            {making ? "Making..." : "Make This Drink"}
          </Button>
        )}
        <Button asChild variant="outline">
          <Link href="/drinks">Back to Drinks</Link>
        </Button>
      </div>
    </div>
  );
}
