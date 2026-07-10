/**
 * One-off: uploads the 3 new montage photos (client-supplied 10.07.2026) into
 * the photoGallery collection under the "montazh" (Монтаж) category.
 *
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node --env-file=.env.local scripts/add-montazh-photos.mjs
 * Idempotent: fixed _ids + createOrReplace, reuses an existing asset by filename.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC_DIR = join(ROOT, "10072026");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function image(absPath) {
  const filename = basename(absPath);
  if (!existsSync(absPath)) {
    console.warn(`  ! missing image, skipping: ${absPath}`);
    return undefined;
  }
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $f][0]._id`,
    { f: filename }
  );
  let assetId = existing;
  if (!assetId) {
    process.stdout.write(`  ↑ uploading ${filename} ... `);
    const asset = await client.assets.upload("image", createReadStream(absPath), {
      filename,
    });
    assetId = asset._id;
    console.log("done");
  } else {
    console.log(`  = reusing existing asset for ${filename}`);
  }
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

const PHOTOS = [
  { id: "montazh-10072026-1", file: "montage_1.jpeg" },
  { id: "montazh-10072026-2", file: "montage_2.jpeg" },
  { id: "montazh-10072026-3", file: "montage_3.jpeg" },
];

async function run() {
  console.log("\nAdding montazh gallery photos…\n");
  // place after any existing gallery items
  const orders = await client.fetch(`*[_type == "photoGallery"].order`);
  const maxOrder = orders.length ? Math.max(...orders) : -1;
  let order = maxOrder + 1;

  for (const p of PHOTOS) {
    const img = await image(join(SRC_DIR, p.file));
    if (!img) continue;
    await client.createOrReplace({
      _id: p.id,
      _type: "photoGallery",
      title: { _type: "localeString", uk: "Монтаж", ru: "Монтаж" },
      image: img,
      category: "montazh",
      order: order++,
    });
    console.log(`• upserted ${p.id}`);
  }
  console.log("\n✓ Done.\n");
}

run().catch((e) => {
  console.error("\n✗ Failed:", e.message);
  process.exit(1);
});
