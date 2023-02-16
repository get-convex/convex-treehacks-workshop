import { mutation, query } from "./_generated/server";

export const list = query(async ({ db, storage }) => {
  const slides = await db.query("slides").collect();
  return Promise.all(
    slides.map(async ({ storageId }) => (await storage.getUrl(storageId))!)
  );
});

export const add = mutation(
  async ({ db }, title: string, storageId: string) => {
    return db.insert("slides", { title, storageId });
  }
);

export const getIndex = query(async ({ db }) => {
  const doc = await db.query("slideIndex").unique();
  return doc?.index;
});

export const setIndex = mutation(async ({ db }, index: number) => {
  const doc = await db.query("slideIndex").unique();
  if (!doc) throw new Error("No slide index doc found");
  await db.patch(doc?._id, { index });
});
