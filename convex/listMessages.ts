import { query } from "./_generated/server";

export default query(async ({ db }) => {
  const messages = await db.query("messages").collect();
  return messages;
});
