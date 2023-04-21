import { action } from "./_generated/server";
import { v } from "convex/values";

function giphyUrl(queryString: string) {
  return (
    "https://api.giphy.com/v1/gifs/translate?api_key=" +
    process.env.GIPHY_KEY +
    "&s=" +
    encodeURIComponent(queryString)
  );
}

// Post a GIF chat message corresponding to the query string.
const sendGif = action({
  args: { queryString: v.string(), messageId: v.id("messages") },

  handler: async ({ runMutation }, { queryString, messageId }) => {
    // Fetch GIF url from GIPHY.
    const data = await fetch(giphyUrl(queryString));
    const json = (await data.json()) as any;
    if (!data.ok) {
      throw new Error(`Giphy errored: ${JSON.stringify(json)}`);
    }
    const url = json.data.embed_url;

    // Write GIF url to Convex.
    await runMutation("messages:update", { messageId, patch: { url } });
  },
});
export default sendGif;
