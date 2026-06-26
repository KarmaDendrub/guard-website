/**
 * Make the dataset publicly readable so the website can fetch published content
 * without a token. Run once:
 *   node --env-file=.env.local scripts/set-dataset-public.mjs
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;
const base = `https://api.sanity.io/v2021-06-07/projects/${projectId}`;
const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

const list = await fetch(`${base}/datasets`, { headers }).then((r) => r.json());
const current = Array.isArray(list) ? list.find((d) => d.name === dataset) : null;
console.log("current:", current ? `${current.name} (aclMode=${current.aclMode})` : list);

if (current && current.aclMode === "public") {
  console.log("Already public — nothing to do.");
} else {
  const res = await fetch(`${base}/datasets/${dataset}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ aclMode: "public" }),
  });
  console.log("set public:", res.status, await res.text());
}
