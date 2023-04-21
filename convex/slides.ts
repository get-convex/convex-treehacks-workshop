import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query(async ({ db, storage }) => {
  const slides = await db.query("slides").collect();
  return Promise.all(
    slides.map(async ({ storageId }) => (await storage.getUrl(storageId))!)
  );
});

export const add = mutation({
  args: { title: v.string(), storageId: v.string() },
  handler: async ({ db }, { title, storageId }) => {
    return db.insert("slides", { title, storageId });
  },
});

export const getIndex = query(async ({ db }) => {
  const doc = await db.query("slideIndex").unique();
  return doc?.index;
});

export const setIndex = mutation({
  args: { index: v.number() },
  handler: async ({ db }, { index }) => {
    const doc = await db.query("slideIndex").unique();
    if (!doc) throw new Error("No slide index doc found");
    await db.patch(doc?._id, { index });
  },
});
