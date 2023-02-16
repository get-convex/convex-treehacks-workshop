import { Document, Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export const update = mutation(
  async (
    { db },
    messageId: Id<"messages">,
    patch: Partial<Document<"messages">>
  ) => {
    await db.patch(messageId, patch);
  }
);
