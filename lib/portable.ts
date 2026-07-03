/**
 * Helpers for Portable Text (rich text) service descriptions.
 * `Blocks` is a Portable Text block array as returned by Sanity / accepted by
 * <PortableText>. We convert legacy plain-string fallbacks into blocks, and
 * flatten blocks back to plain text for compact places like service cards.
 */
export type Block = { _type: string; [key: string]: unknown };
export type Blocks = Block[];

/** Turn a plain string (possibly multi-paragraph) into Portable Text blocks. */
export function textToBlocks(text: string | null | undefined): Blocks {
  if (!text) return [];
  return text
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
}

/** Flatten Portable Text blocks (or a plain string) to a single plain string. */
export function blocksToPlainText(
  input: Blocks | string | null | undefined
): string {
  if (!input) return "";
  if (typeof input === "string") return input;
  return input
    .filter((b) => b && b._type === "block" && Array.isArray(b.children))
    .map((b) => {
      const children = b.children as unknown as Array<{ text?: string }>;
      return children.map((c) => c.text ?? "").join("");
    })
    .join("\n\n");
}
