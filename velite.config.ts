import { defineConfig, defineCollection, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";

// Compute reading time from content
const computeReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Extract table of contents from MDX content
function extractTOC(
  content: string
): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/\s+/g, "-");
    items.push({ id, text, level });
  }

  return items;
}

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(100),
      description: s.string().max(300),
      publishedAt: s.isodate(),
      updatedAt: s.isodate().optional(),
      coverImage: s.string(),
      tags: s.array(s.string()),
      author: s.string().default("Ajay"),
      draft: s.boolean().default(false),
      featured: s.boolean().default(false),
      difficulty: s
        .enum(["beginner", "intermediate", "advanced"])
        .default("intermediate"),
      // Auto-computed fields from file path
      content: s.mdx(),
      raw: s.raw(),
      metadata: s.metadata(),
    })
    .transform((data, { meta }) => {
      // Extract slug from file path (e.g., blog/hello-world.mdx -> hello-world)
      const slug =
        meta.path
          .split("/")
          .pop()
          ?.replace(/\.mdx?$/, "") ?? "";
      return {
        ...data,
        slug,
        readingTime: computeReadingTime(data.content),
        permalink: `/blog/${slug}`,
        toc: extractTOC(data.raw),
      };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: true,
          defaultLang: "plaintext",
        },
      ],
    ],
    remarkPlugins: [],
  },
});
