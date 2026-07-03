/**
 * Reconcile services after discovering Anna had already created 3 of the new
 * services in the Studio (with real photos + rich copy) under different slugs.
 *
 *   1. Merge her real image + description into our wired-up docs (client-exact
 *      titles, RU, icons, working routes), then delete her duplicates.
 *   2. Add the `domofony` service to Sanity (it only existed in the hardcoded
 *      fallback, so it would disappear now that the Послуги page is CMS-driven).
 *
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node --env-file=.env.local scripts/reconcile-services.mjs
 * Idempotent.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUB = join(ROOT, "public");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

function textToBlocks(text) {
  if (!text) return [];
  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).map((para, i) => ({
    _type: "block", _key: `p${i}`, style: "normal", markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text: para, marks: [] }],
  }));
}

async function image(relPath) {
  const filename = basename(relPath);
  const abs = join(PUB, relPath.replace(/^\//, ""));
  if (!existsSync(abs)) return undefined;
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $f][0]._id`, { f: filename }
  );
  let assetId = existing;
  if (!assetId) {
    const asset = await client.assets.upload("image", createReadStream(abs), { filename });
    assetId = asset._id;
  }
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

// mine (kept) <- theirs (Anna's real content, then deleted)
const MERGE = [
  { mine: "service-kontrol", theirs: "kontrol-roboti-okhoroni-zamovnika" },
  { mine: "service-navchannya", theirs: "navchalnii-centr-korporaciyi-guard" },
  { mine: "service-suprovid", theirs: "okhorona-vantazhiv-ta-suprovid-transportu" },
];

async function mergeAndCleanup() {
  for (const m of MERGE) {
    const theirs = await client.fetch(
      `*[_type=="service" && slug.current == $s][0]{ _id, image, "descUk": description.uk }`,
      { s: m.theirs }
    );
    if (!theirs) { console.log(`  (skip) not found: ${m.theirs}`); continue; }
    const patch = {};
    if (theirs.image) patch.image = theirs.image;               // keep Anna's real photo
    if (theirs.descUk?.length) patch["description.uk"] = theirs.descUk; // keep Anna's rich UK copy
    await client.patch(m.mine).set(patch).commit();
    await client.delete(theirs._id);
    console.log(`• merged ${m.theirs} → ${m.mine}, deleted duplicate`);
  }
}

async function addDomofony() {
  const doc = {
    _id: "service-domofony",
    _type: "service",
    title: { _type: "localeString", uk: "Бездротові та дротові ДОМОФОНИ", ru: "Беспроводные и проводные ДОМОФОНЫ" },
    slug: { _type: "slug", current: "domofony" },
    description: {
      uk: textToBlocks("Монтаж та обслуговування дротових і бездротових домофонних систем для квартир, приватних будинків і під'їздів. Зручний контроль входу, аудіо- та відеозв'язок з відвідувачами."),
      ru: textToBlocks("Монтаж и обслуживание проводных и беспроводных домофонных систем для квартир, частных домов и подъездов. Удобный контроль входа, аудио- и видеосвязь с посетителями."),
    },
    icon: "Bell",
    image: await image("/images/services/domofony.jpg"),
    inGrid: true,
    order: 10,
  };
  await client.createOrReplace(doc);
  console.log("• created/updated service-domofony");
}

async function run() {
  console.log("\nReconciling services…\n");
  await mergeAndCleanup();
  await addDomofony();
  console.log("\n✓ Done.\n");
}
run().catch((e) => { console.error("✗", e.message); process.exit(1); });
