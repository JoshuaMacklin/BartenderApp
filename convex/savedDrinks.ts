import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return ctx.db
      .query("savedDrinks")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const isSaved = query({
  args: { drinkId: v.id("drinks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;
    const saved = await ctx.db
      .query("savedDrinks")
      .withIndex("by_user_drink", (q) =>
        q.eq("userId", identity.subject).eq("drinkId", args.drinkId)
      )
      .first();
    return !!saved;
  },
});

export const save = mutation({
  args: { drinkId: v.id("drinks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const existing = await ctx.db
      .query("savedDrinks")
      .withIndex("by_user_drink", (q) =>
        q.eq("userId", identity.subject).eq("drinkId", args.drinkId)
      )
      .first();
    if (existing) return existing._id;
    return ctx.db.insert("savedDrinks", {
      userId: identity.subject,
      drinkId: args.drinkId,
      savedAt: Date.now(),
    });
  },
});

export const unsave = mutation({
  args: { drinkId: v.id("drinks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const saved = await ctx.db
      .query("savedDrinks")
      .withIndex("by_user_drink", (q) =>
        q.eq("userId", identity.subject).eq("drinkId", args.drinkId)
      )
      .first();
    if (saved) await ctx.db.delete(saved._id);
    return args.drinkId;
  },
});
