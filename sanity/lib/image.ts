import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = imageUrlBuilder({ projectId, dataset });

/** Build a URL for a Sanity image source. Returns null for empty sources. */
export function urlForImage(source: Image | undefined | null) {
  if (!source || !(source as { asset?: unknown }).asset) return null;
  return builder.image(source).auto("format").fit("max");
}
