import { Node, mergeAttributes } from "@tiptap/core";

// Renders as <figure data-type="image-figure"><img/><figcaption>...</figcaption></figure>.
// The figcaption is real editable Tiptap content (content: "inline*"), so the
// caption is optional — type in it or leave it empty — rather than a
// separate prompt/dialog. Styling lives in .blog-prose (src/styles.css),
// shared by the editor and the public post page.
export const ImageFigure = Node.create({
  name: "imageFigure",
  group: "block",
  content: "inline*",
  isolating: true,
  defining: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="image-figure"]',
        contentElement: "figcaption",
        getAttrs: (dom) => {
          if (!(dom instanceof HTMLElement)) return {};
          const img = dom.querySelector("img");
          return {
            src: img?.getAttribute("src") ?? null,
            alt: img?.getAttribute("alt") ?? null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      "figure",
      mergeAttributes(HTMLAttributes, { "data-type": "image-figure" }),
      ["img", { src: node.attrs.src, alt: node.attrs.alt ?? "" }],
      ["figcaption", { "data-placeholder": "Add a caption (optional)" }, 0],
    ];
  },
});
