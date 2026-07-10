/**
 * One-off: removes "Бездротові та дротові ДОМОФОНИ" and "Житло під охороною"
 * from the services grid, and enables the already-existing "Я вдома під
 * охороною" service (Anna wrote full copy for it, it was just inGrid:false).
 *
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node --env-file=.env.local scripts/update-services-list.mjs
 * Idempotent.
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function run() {
  console.log("\nUpdating services list…\n");

  for (const id of ["service-domofony", "service-zhytlo"]) {
    const exists = await client.fetch(`*[_id == $id][0]._id`, { id });
    if (exists) {
      await client.delete(id);
      console.log(`• deleted ${id}`);
    } else {
      console.log(`  (skip) not found: ${id}`);
    }
  }

  await client.patch("service-vdoma").set({ inGrid: true }).commit();
  console.log("• service-vdoma: inGrid = true (was false; content already exists)");

  console.log("\n✓ Done.\n");
}

run().catch((e) => {
  console.error("\n✗ Failed:", e.message);
  process.exit(1);
});
