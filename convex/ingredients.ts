import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return ctx.db
      .query("ingredients")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    quantity: v.number(),
    unit: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    return ctx.db.insert("ingredients", {
      userId: identity.subject,
      name: args.name,
      quantity: args.quantity,
      unit: args.unit,
      category: args.category,
      inStock: true,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("ingredients"),
    name: v.optional(v.string()),
    quantity: v.optional(v.number()),
    unit: v.optional(v.string()),
    category: v.optional(v.string()),
    inStock: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const { id, ...updates } = args;
    const doc = await ctx.db.get(id);
    if (!doc || doc.userId !== identity.subject) {
      throw new Error("Not found or unauthorized");
    }
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("ingredients") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const doc = await ctx.db.get(args.id);
    if (!doc || doc.userId !== identity.subject) {
      throw new Error("Not found or unauthorized");
    }
    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const subtractForDrink = mutation({
  args: {
    drinkId: v.id("drinks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const userId = identity.subject;

    const drink = await ctx.db.get(args.drinkId);
    if (!drink) throw new Error("Drink not found");

    const ingredients = await ctx.db
      .query("ingredients")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const inventoryMap = new Map(
      ingredients.map((i) => [i.name.toLowerCase(), i])
    );

    for (const req of drink.ingredients) {
      const key = req.name.toLowerCase().trim();
      const inv = inventoryMap.get(key);
      if (!inv || !inv.inStock) {
        throw new Error(`Missing ingredient: ${req.name}`);
      }
      const newQty = Math.max(0, inv.quantity - req.amount);
      await ctx.db.patch(inv._id, {
        quantity: newQty,
        inStock: newQty > 0,
      });
    }

    return { success: true };
  },
});
