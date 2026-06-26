import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const counts = await client.fetch(`{
  "total": count(*),
  "siteSettings": count(*[_type == "siteSettings"]),
  "heroSection": count(*[_type == "heroSection"]),
  "aboutSection": count(*[_type == "aboutSection"]),
  "contactInfo": count(*[_type == "contactInfo"]),
  "statistic": count(*[_type == "statistic"]),
  "service": count(*[_type == "service"]),
  "photoGallery": count(*[_type == "photoGallery"]),
  "imageAssets": count(*[_type == "sanity.imageAsset"])
}`);

console.log(JSON.stringify(counts, null, 2));
