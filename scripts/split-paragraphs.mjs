/**
 * Normalize service descriptions: split any Portable Text block whose text
 * contains embedded line breaks into separate paragraph blocks, so multi-line
 * copy (e.g. Anna's imported text) renders as real paragraphs. Idempotent.
 *
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node --env-file=.env.local scripts/split-paragraphs.mjs
 */
import { createClient } from "@sanity/client";
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

/** Rebuild a block array, splitting normal blocks on newlines into paragraphs. */
function splitBlocks(blocks, prefix) {
  if (!Array.isArray(blocks)) return blocks;
  const out = [];
  let i = 0;
  for (const b of blocks) {
    if (b?._type === "block" && (b.style ?? "normal") === "normal" && Array.isArray(b.children)) {
      const text = b.children.map((c) => c.text ?? "").join("");
      const parts = text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
      if (parts.length <= 1) { out.push({ ...b, _key: `${prefix}${i++}` }); continue; }
      for (const part of parts) {
        out.push({
          _type: "block", _key: `${prefix}${i++}`, style: "normal", markDefs: [],
          children: [{ _type: "span", _key: `s${i}`, text: part, marks: [] }],
        });
      }
    } else {
      out.push({ ...b, _key: b?._key ?? `${prefix}${i++}` });
    }
  }
  return out;
}

const rows = await client.fetch(
  `*[_type=="service"]{ _id, "uk": description.uk, "ru": description.ru }`
);
let tx = client.transaction();
let n = 0;
for (const r of rows) {
  const uk = splitBlocks(r.uk, "u");
  const ru = splitBlocks(r.ru, "r");
  const changed =
    (r.uk?.length ?? 0) !== (uk?.length ?? 0) || (r.ru?.length ?? 0) !== (ru?.length ?? 0);
  if (changed) {
    tx = tx.patch(r._id, (p) => p.set({ "description.uk": uk, "description.ru": ru }));
    n++;
  }
}
if (n) await tx.commit();
console.log(`Normalized paragraphs in ${n} service(s).`);
