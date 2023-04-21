"use node";
import fetch from "node-fetch";
import { Configuration, OpenAIApi } from "openai";
import { Id } from "./_generated/dataModel";
import { internalAction } from "./_generated/server";

const createImage = internalAction(
  async (
    { runMutation, runQuery, storage },
    {
      prompt,
      messageId,
    }: {
      prompt: string;
      messageId: Id<"messages">;
    }
  ) => {
    //const start = Date.now();
    //const elapsedMs = () => Date.now() - start;
    const fail = (reason: string): Promise<never> =>
      runMutation("messages:update", {
        messageId,
        patch: {
          body: reason,
        },
      }).then(() => {
        throw new Error(reason);
      });
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      await fail(
        "Add your OPENAI_API_KEY as an env variable in the " +
          "[dashboard](https://dasboard.convex.dev)"
      );
    }

    const openai = new OpenAIApi(new Configuration({ apiKey }));

    runMutation("messages:update", {
      messageId,
      patch: {
        body: prompt + "Moderating prompt...",
      },
    });
    // Check if the prompt is offensive.
    const modResponse = await openai.createModeration({
      input: prompt,
    });
    const modResult = modResponse.data.results[0];
    if (modResult.flagged) {
      await fail(
        `Your prompt was flagged: ${JSON.stringify(modResult.categories)}`
      );
    }

    runMutation("messages:update", {
      messageId,
      patch: {
        body: prompt + "Generating image...",
      },
    });
    // Query OpenAI for the image.
    const opanaiResponse = await openai.createImage({
      prompt,
      size: "512x512",
    });
    const dallEImageUrl = opanaiResponse.data.data[0]["url"];
    if (!dallEImageUrl) return await fail("No image URL returned from OpenAI");

    runMutation("messages:update", {
      messageId,
      patch: {
        body: prompt + "Storing image...",
      },
    });
    // Download the image
    const imageResponse = await fetch(dallEImageUrl);
    if (!imageResponse.ok) {
      await fail(`failed to download: ${imageResponse.statusText}`);
    }

    const storageId = await storage.store(await imageResponse.blob());
    const url = (await storage.getUrl(storageId)) ?? undefined;

    // Write storageId as the body of the message to the Convex database.
    await runMutation("messages:update", {
      messageId,
      patch: {
        body: prompt,
        url,
      },
    });
  }
);
export default createImage;
