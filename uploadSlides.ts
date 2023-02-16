import { ConvexHttpClient } from "convex/browser";
import type { API } from "./convex/_generated/api";

const address = process.env.VITE_CONVEX_URL;
if (!address) throw new Error("Convex URL not found");
const client = new ConvexHttpClient<API>(address);
