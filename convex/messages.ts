import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { internalMutation, mutation, query } from "./_generated/server";

export const list = query(async ({ db }) => {
  const messages = await db.query("messages").collect();
  return messages;
});

export const send = mutation({
  args: { body: v.string(), author: v.string() },
  handler: async ({ db, scheduler }, { body, author }) => {
    const message = { body, author };
    const messageId = await db.insert("messages", message);
    if (body.startsWith("/dall-e ")) {
      const prompt = body.substring("/dall-e ".length);
      scheduler.runAfter(0, internal.createImage.default, {
        prompt,
        messageId,
      });
    }
  },
});

export const update = internalMutation(
  async (
    { db },
    {
      messageId,
      patch,
    }: {
      messageId: Id<"messages">;
      patch: Partial<Doc<"messages">>;
    }
  ) => {
    await db.patch(messageId, patch);
  }
);
