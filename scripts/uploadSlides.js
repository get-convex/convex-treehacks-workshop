import { ConvexHttpClient } from "convex/browser";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const address = "https://beloved-fox-571.convex.cloud";
if (!address) throw new Error("Convex URL not found");
const client = new ConvexHttpClient(address);

const genUploadUrl = client.mutation("files:generateUploadUrl");
const addSlide = client.mutation("slides:add");

const folder = process.env.FOLDER;
if (!folder) throw "Specify FOLDER env variable";

async function upload(folder) {
  const files = fs.readdirSync(folder);
  files.sort();
  for (const file of files) {
    const fileWithoutExtension = path.basename(file, path.extname(file));
    const parts = fileWithoutExtension.split("-", 2);
    const title = parts[parts.length - 1];
    const filePath = path.join(folder, file);
    const image = fs.readFileSync(filePath);
    const uploadUrl = await genUploadUrl();
    const resp = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": "image/png" },
      body: image,
    });
    const { storageId } = await resp.json();
    await addSlide(title, storageId);
  }
}
upload(folder);
