import { mutation, query } from "./_generated/server";

export const vote = mutation(
  async ({ db }, { option, author }: { option: string; author: string }) => {
    return db.insert("votes", { option, author });
  }
);

export const list = query(async ({ db }) => {
  const votes = await db.query("votes").collect();
  return votes;
});

export const count = query(async ({ db }) => {
  const votes = await db.query("votes").collect();
  const byCount = new Map<string, number>();
  for (const { option, author } of votes) {
    if (byCount.has(option)) {
      byCount.set(option, byCount.get(option)! + 1);
    } else {
      byCount.set(option, 1);
    }
  }
  return byCount;
});
