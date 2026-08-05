import { Fragment } from "react";

type InlineImage = { url: string; alt: string };

// Fixed target position for each of the 3 in-article image slots, as a
// fraction of the way through the post's top-level blocks.
const SLOT_FRACTIONS = [0.25, 0.5, 0.75];

const VOID_TAGS = new Set(["br", "img", "hr", "input", "meta", "link"]);

// Splits Tiptap-generated HTML into its top-level sibling elements (each
// <p>, <h2>, <ul>, <figure>, ...) by tracking overall tag-nesting depth
// rather than matching specific tag names — safe even for nested lists,
// and never drops content if the markup doesn't look as expected (it just
// falls back to one big trailing block).
function splitTopLevelBlocks(html: string): string[] {
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)(?:\s[^>]*)?\/?>/g;
  let depth = 0;
  let blockStart = 0;
  const blocks: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(html))) {
    const tag = match[1].toLowerCase();
    const isClosing = match[0].startsWith("</");
    const isVoid = match[0].endsWith("/>") || VOID_TAGS.has(tag);

    if (isClosing) depth--;
    else if (!isVoid) depth++;

    if (depth === 0) {
      const blockEnd = tagRegex.lastIndex;
      blocks.push(html.slice(blockStart, blockEnd));
      blockStart = blockEnd;
    }
  }
  if (blockStart < html.length) blocks.push(html.slice(blockStart));

  return blocks.filter((b) => b.trim().length > 0);
}

function insertionIndex(blockCount: number, fraction: number): number {
  if (blockCount === 0) return 0;
  return Math.min(blockCount, Math.max(1, Math.round(blockCount * fraction)));
}

export function BlogPostBody({ html, images = [] }: { html: string; images?: InlineImage[] }) {
  const activeSlots = images
    .map((img, i) => ({ img, fraction: SLOT_FRACTIONS[i] }))
    .filter((slot) => slot.img.url);

  if (activeSlots.length === 0) {
    return <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const blocks = splitTopLevelBlocks(html);
  let cursor = 0;
  const segments: { html: string; image?: InlineImage }[] = [];
  for (const slot of activeSlots) {
    const pos = Math.max(insertionIndex(blocks.length, slot.fraction), cursor);
    segments.push({ html: blocks.slice(cursor, pos).join(""), image: slot.img });
    cursor = pos;
  }
  segments.push({ html: blocks.slice(cursor).join("") });

  return (
    <div className="blog-prose">
      {segments.map((segment, i) => (
        <Fragment key={i}>
          {segment.html ? <div dangerouslySetInnerHTML={{ __html: segment.html }} /> : null}
          {segment.image ? (
            <figure data-type="image-figure">
              <img src={segment.image.url} alt={segment.image.alt} />
            </figure>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
