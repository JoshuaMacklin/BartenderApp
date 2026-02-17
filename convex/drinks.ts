import { v } from "convex/values";
import { query } from "./_generated/server";

export const list = query({
  args: {
    category: v.optional(v.string()),
    sortBy: v.optional(v.union(v.literal("name"), v.literal("category"))),
  },
  handler: async (ctx, args) => {
    const drinks = args.category
      ? await ctx.db
          .query("drinks")
          .withIndex("by_category", (idx) =>
            idx.eq("category", args.category!)
          )
          .collect()
      : await ctx.db.query("drinks").collect();
    if (args.sortBy === "name") {
      drinks.sort((a, b) => a.name.localeCompare(b.name));
    }
    return drinks;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("drinks")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const canMake = query({
  args: {
    threshold: v.optional(v.union(v.literal(1), v.literal(0.8), v.literal(0.5))),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const threshold = args.threshold ?? 1;
    const ingredients = await ctx.db
      .query("ingredients")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const inStockSet = new Set(
      ingredients
        .filter((i) => i.inStock && i.quantity > 0)
        .map((i) => i.name.toLowerCase().trim())
    );

    const drinks = await ctx.db.query("drinks").collect();
    return drinks.filter((drink) => {
      const required = drink.ingredients.map((i) =>
        i.name.toLowerCase().trim()
      );
      const have = required.filter((n) => inStockSet.has(n)).length;
      return have / required.length >= threshold;
    });
  },
});
