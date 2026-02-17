import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const insertDrink = internalMutation({
  args: {
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    glass: v.string(),
    ingredients: v.array(
      v.object({
        name: v.string(),
        amount: v.number(),
        unit: v.string(),
      })
    ),
    garnish: v.optional(v.string()),
    preparation: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("drinks")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existing) return existing._id;
    return ctx.db.insert("drinks", args);
  },
});
