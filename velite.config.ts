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

const slugFromPath = (path: string) =>
  path
    .split("/")
    .pop()
    ?.replace(/\.mdx?$/, "") ?? "";

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
      author: s.string().default("Aravind Jaimon"),
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
      const slug = slugFromPath(meta.path);
      return {
        ...data,
        slug,
        readingTime: computeReadingTime(data.content),
        permalink: `/blog/${slug}`,
        toc: extractTOC(data.raw),
      };
    }),
});

const metric = s.object({ value: s.string(), label: s.string() });

const projects = defineCollection({
  name: "Project",
  pattern: "projects/*.mdx",
  schema: s
    .object({
      id: s.number(),
      title: s.string(),
      subtitle: s.string(),
      industry: s.string(),
      role: s.string(),
      challenge: s.string(),
      solution: s.array(s.string()),
      metrics: s.array(metric),
      stack: s.array(s.string()),
      timeline: s.string().optional(),
      teamSize: s.string().optional(),
      /** Key into the SVG glyph map used by the project cards' morph demo */
      glyph: s.enum([
        "ledger",
        "brain",
        "terminal",
        "cube",
        "joystick",
        "book",
      ]),
      content: s.mdx(),
      raw: s.raw(),
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: slugFromPath(meta.path),
      toc: extractTOC(data.raw),
    })),
});

const profile = defineCollection({
  name: "Profile",
  pattern: "data/profile.yaml",
  single: true,
  schema: s.object({
    name: s.string(),
    title: s.string(),
    subtitle: s.string(),
    tagline: s.string(),
    email: s.string(),
    linkedin: s.string(),
    github: s.string(),
    portfolio: s.string(),
    npm: s.string(),
    location: s.string(),
    /** One-line hiring status shown in the hero and contact */
    availability: s.string(),
  }),
});

const milestones = defineCollection({
  name: "Milestones",
  pattern: "data/milestones.yaml",
  single: true,
  schema: s.object({
    items: s.array(
      s.object({ phase: s.string(), date: s.string(), description: s.string() })
    ),
  }),
});

const skills = defineCollection({
  name: "Skills",
  pattern: "data/skills.yaml",
  single: true,
  schema: s.object({
    groups: s.array(
      s.object({
        key: s.string(),
        label: s.string(),
        items: s.array(s.string()),
      })
    ),
  }),
});

const metrics = defineCollection({
  name: "Metrics",
  pattern: "data/metrics.yaml",
  single: true,
  schema: s.object({ items: s.array(metric) }),
});

const experience = defineCollection({
  name: "Experience",
  pattern: "data/experience.yaml",
  single: true,
  schema: s.object({
    items: s.array(
      s.object({
        period: s.string(),
        role: s.string(),
        company: s.string(),
        highlights: s.array(s.string()),
      })
    ),
  }),
});

const education = defineCollection({
  name: "Education",
  pattern: "data/education.yaml",
  single: true,
  schema: s.object({
    education: s.array(
      s.object({
        degree: s.string(),
        status: s.string(),
        institution: s.string(),
        expected: s.string().optional(),
        year: s.string().optional(),
        note: s.string().optional(),
      })
    ),
    certifications: s.array(s.string()),
    achievements: s.array(
      s.object({
        icon: s.string(),
        title: s.string(),
        description: s.string(),
        detail: s.string(),
      })
    ),
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
  collections: {
    posts,
    projects,
    profile,
    milestones,
    skills,
    metrics,
    experience,
    education,
  },
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
