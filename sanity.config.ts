"use client";

/**
 * Sanity Studio config — mounted inside the Next.js app at /studio.
 * Public env vars are read at build time (see sanity/env.ts).
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { projectId, dataset, apiVersion } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

const SINGLETONS = ["siteSettings", "heroSection", "aboutSection", "contactInfo"];

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "GUARD — Контент",
  schema: {
    types: schemaTypes,
    // Hide the global "create" action for singletons.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    // Singletons: only allow publish/discard/restore (no duplicate/delete).
    actions: (input, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? input.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? "")
          )
        : input,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
