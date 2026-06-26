import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

/**
 * Read client for the website (published content). Used only in server
 * components, so the optional token never reaches the browser. With a public
 * dataset it works with no token via the CDN; with a token it can also read a
 * private dataset.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !token,
  token: token || undefined,
  perspective: "published",
});
