import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ingredients: defineTable({
    userId: v.string(),
    name: v.string(),
    quantity: v.number(),
    unit: v.string(),
    category: v.string(),
    inStock: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_name", ["userId", "name"]),

  drinks: defineTable({
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
    history: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  savedDrinks: defineTable({
    userId: v.string(),
    drinkId: v.id("drinks"),
    savedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_drink", ["userId", "drinkId"]),
});
