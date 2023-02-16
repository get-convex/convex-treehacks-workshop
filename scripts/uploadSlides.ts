import { ConvexHttpClient } from "convex/browser";
import type { API } from "../convex/_generated/api";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const address = process.env.VITE_CONVEX_URL;
if (!address) throw new Error("Convex URL not found");
const client = new ConvexHttpClient<API>(address);

const genUploadUrl = client.mutation("files:generateUploadUrl");
const addSlide = client.mutation("slides:add");

const folder = process.env.FOLDER;
if (!folder) throw "Specify FOLDER env variable";

async function upload(folder) {
  const files = fs.readdirSync(folder);
  files.sort();
  for (const file of files) {
    console.log(file);
    continue;
    const image = fs.readFileSync(file);
    const uploadUrl = await genUploadUrl();
    const resp = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": "image/png" },
      body: image,
    });
    const { storageId } = (await resp.json()) as {
      storageId: string;
    };
    const title = path.basename(file, path.extname(file));
    await addSlide(title, storageId);
  }
}
upload(folder);
