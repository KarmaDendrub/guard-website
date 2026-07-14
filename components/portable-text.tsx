import type { PortableTextComponents } from "@portabletext/react";

/** Shared Portable Text renderer: paragraphs/subheadings/lists as spaced, readable body text. */
export const richTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 text-lg leading-relaxed text-[#1a1a1a] first:mt-0">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 font-heading text-xl font-bold text-[#1a1a1a] first:mt-0">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-[#1a1a1a]">
        {children}
      </ul>
    ),
  },
};
