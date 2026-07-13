/**
 * One-off: migrates the hardcoded "Новини" (data/news.json) and "Монтажні
 * роботи" (data/installations.json) posts into Sanity as `newsPost` / `work`
 * documents, so Anna can edit them in /studio going forward.
 *
 * The two installation covers are swapped for the real client photos
 * extracted from Изменить.docx (10072026/photos/*.jpeg) instead of the old
 * placeholder SVGs.
 *
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node --env-file=.env.local scripts/migrate-news-works.mjs
 * Idempotent: fixed _ids + createOrReplace, reuses an existing asset by filename.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUB = join(ROOT, "public");
const PHOTOS_DIR = join(ROOT, "10072026", "photos");

const newsData = JSON.parse(readFileSync(join(ROOT, "data", "news.json"), "utf8"));
const installData = JSON.parse(
  readFileSync(join(ROOT, "data", "installations.json"), "utf8")
);

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

const L = (uk) => ({ _type: "localeString", uk, ru: uk });
const T = (uk) => ({ _type: "localeText", uk, ru: uk });

/** Plain multi-paragraph text -> localePortableText { uk, ru } blocks. */
function toPortableText(text) {
  const blocks = (text || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((para, i) => ({
      _type: "block",
      _key: `p${i}`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `s${i}`, text: para, marks: [] }],
    }));
  return { _type: "localePortableText", uk: blocks, ru: blocks };
}

// Real client photos take priority over the old SVG placeholders for works.
const WORK_COVER_OVERRIDE = {
  "perimetralna-signalizaciya-ajax": join(PHOTOS_DIR, "ajax-signalizaciya.jpeg"),
  "montazh-skud-ta-domofoniyi": join(PHOTOS_DIR, "skud-domofoniya.jpeg"),
};

async function run() {
  console.log("\nMigrating Новини (news)…\n");
  for (const n of newsData) {
    const cover = await image(join(PUB, n.image.replace(/^\//, "")));
    if (!cover) continue;
    await client.createOrReplace({
      _id: `news-${n.slug}`,
      _type: "newsPost",
      title: L(n.title),
      slug: { _type: "slug", current: n.slug },
      date: n.date,
      excerpt: T(n.excerpt),
      body: toPortableText(n.body),
      image: cover,
    });
    console.log(`• upserted news-${n.slug}`);
  }

  console.log("\nMigrating Монтажні роботи (works)…\n");
  let order = 0;
  for (const w of installData) {
    const coverPath = WORK_COVER_OVERRIDE[w.slug] ?? join(PUB, w.image.replace(/^\//, ""));
    const cover = await image(coverPath);
    if (!cover) continue;
    await client.createOrReplace({
      _id: `work-${w.slug}`,
      _type: "work",
      title: L(w.title),
      slug: { _type: "slug", current: w.slug },
      date: w.date,
      excerpt: T(w.excerpt),
      body: toPortableText(w.body),
      image: cover,
      gallery: [cover],
      order: order++,
    });
    console.log(`• upserted work-${w.slug}`);
  }

  console.log("\n✓ Done.\n");
}

run().catch((e) => {
  console.error("\n✗ Failed:", e.message);
  process.exit(1);
});
