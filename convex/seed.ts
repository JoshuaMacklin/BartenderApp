"use node";

import { action } from "./_generated/server";
import { internal } from "./_generated/api";

type IBAIngredient = {
  unit?: string;
  amount?: number;
  ingredient?: string;
  special?: string;
};

type IBADrink = {
  name: string;
  glass: string;
  category?: string;
  ingredients: IBAIngredient[];
  garnish?: string;
  preparation?: string;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseIngredient(ing: IBAIngredient): { name: string; amount: number; unit: string } | null {
  if (ing.ingredient && ing.amount != null && ing.unit) {
    return {
      name: ing.ingredient.trim(),
      amount: ing.amount,
      unit: ing.unit,
    };
  }
  if (ing.special) {
    const match = ing.special.match(/([\d./]+)\s*(.*)/);
    if (match) {
      const amountStr = match[1].replace(/[^0-9./]/g, "");
      const amount = parseFloat(amountStr) || 1;
      return {
        name: match[2].trim(),
        amount,
        unit: "parts",
      };
    }
    return { name: ing.special.trim(), amount: 1, unit: "parts" };
  }
  return null;
}

export const seedDrinks = action({
  args: {},
  handler: async (ctx) => {
    const res = await fetch(
      "https://raw.githubusercontent.com/teijo/iba-cocktails/master/recipes.json"
    );
    if (!res.ok) throw new Error("Failed to fetch IBA recipes");
    const data: IBADrink[] = await res.json();

    for (const d of data) {
      const ingredients = d.ingredients
        .map(parseIngredient)
        .filter((x): x is { name: string; amount: number; unit: string } => x !== null);

      if (ingredients.length === 0) continue;

      const slug = slugify(d.name);
      const category = d.category ?? "Other";
      await ctx.runMutation(internal.seedInsert.insertDrink, {
        name: d.name,
        slug,
        category,
        glass: d.glass,
        ingredients,
        garnish: d.garnish,
        preparation: d.preparation ?? "No preparation specified.",
      });
    }

    return { seeded: data.length };
  },
});
