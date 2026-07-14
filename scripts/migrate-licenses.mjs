/**
 * One-off: migrates the hardcoded "Ліцензії" (previously in app/(site)/licenzii/page.tsx)
 * into Sanity as `license` documents, so they can be added/edited in /studio going forward.
 *
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node --env-file=.env.local scripts/migrate-licenses.mjs
 * Idempotent: fixed _ids + createOrReplace, reuses an existing asset by filename.
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

const LICENSES = [
  {
    id: "license-1",
    title: "Офіційний представник ТОВ «Охорона і Безпека»",
    issuedBy: "ТМ «Орлан», «Лунь», «Алет» та «Granat», м. Дніпро",
    validity: "2026 р.",
    image: join(PUB, "images", "licenses", "license-1.jpg"),
  },
  {
    id: "license-2",
    title: "Ajax Authorized Security Company",
    issuedBy: "Сертифікат Ajax Systems · № UA20262003858",
    validity: "дійсний до 31.12.2026",
    image: join(PUB, "images", "licenses", "license-2.jpg"),
  },
  {
    id: "license-3",
    title: "Офіційний дилер ТОВ «Охоронні системи»",
    issuedBy: "ТМ «GSN Electronic», «Elmes electronic» та «CROW»",
    validity: "дійсний до 31.12.2027",
    image: join(PUB, "images", "licenses", "license-3.jpg"),
  },
];

async function run() {
  console.log("\nMigrating Ліцензії (licenses)…\n");
  let order = 0;
  for (const l of LICENSES) {
    const cover = await image(l.image);
    if (!cover) continue;
    await client.createOrReplace({
      _id: l.id,
      _type: "license",
      title: L(l.title),
      issuedBy: L(l.issuedBy),
      validity: L(l.validity),
      image: cover,
      order: order++,
    });
    console.log(`• upserted ${l.id}`);
  }
  console.log("\n✓ Done.\n");
}

run().catch((e) => {
  console.error("\n✗ Failed:", e.message);
  process.exit(1);
});
