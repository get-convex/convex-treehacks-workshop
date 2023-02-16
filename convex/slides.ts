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
