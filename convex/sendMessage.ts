import { mutation } from "./_generated/server";

export default mutation(
  async ({ db, scheduler }, body: string, author: string) => {
    const message = { body, author };
    const messageId = await db.insert("messages", message);
    if (body.startsWith("/dall-e ")) {
      const prompt = body.substring("/dall-e ".length);
      scheduler.runAfter(0, "actions/createImage", prompt, messageId);
    }
  }
);
