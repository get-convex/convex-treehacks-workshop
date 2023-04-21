import { defineSchema, defineTable } from "convex/schema";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    author: v.string(),
    body: v.string(),
    url: v.optional(v.string()),
  }),
  slides: defineTable({
    title: v.optional(v.string()),
    storageId: v.string(),
  }),
  slideIndex: defineTable({
    index: v.number(),
  }),
  votes: defineTable({
    option: v.string(),
    author: v.string(),
  }),
});
