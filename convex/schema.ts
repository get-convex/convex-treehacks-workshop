import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema(
  {
    messages: defineTable({
      author: s.string(),
      body: s.string(),
      url: s.optional(s.string()),
    }),
    slides: defineTable({
      storageId: s.string(),
    }),
  }
  //, { strict: false }
);
