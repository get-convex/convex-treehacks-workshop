import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async ({ storage }) => {
  return await storage.generateUploadUrl();
});

export const getUrl = query(async ({ storage }, storageId: string) => {
  return (await storage.getUrl(storageId))!;
});
