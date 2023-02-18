import { Document, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const list = query(async ({ db }) => {
  const messages = await db.query("messages").collect();
  return messages;
});

export const send = mutation(
  async ({ db, scheduler }, body: string, author: string) => {
    const message = { body, author };
    const messageId = await db.insert("messages", message);
    if (body.startsWith("/dall-e ")) {
      const prompt = body.substring("/dall-e ".length);
      scheduler.runAfter(0, "actions/createImage", prompt, messageId);
    }
  }
);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
export const update = mutation(
  async (
    { db },
    messageId: Id<"messages">,
    patch: Partial<Document<"messages">>
  ) => {
    await db.patch(messageId, patch);
  }
);
