import { notFound } from "next/navigation";
import {
  BlogHeader,
  BlogContent,
  RelatedPosts,
  TableOfContents,
  SocialShare,
  GiscusComments,
  PostNavigation,
} from "@/components/blog";
import { getPostBySlug, getPublishedPosts, getAdjacentPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

const { baseUrl } = siteConfig;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const ogImage = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${baseUrl}${post.coverImage}`;

  return {
    title: `${post.title} | Aravind Jaimon`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}${post.permalink}`,
    },
  };
}

// Generate JSON-LD structured data (safe - uses our own data, not user input)
function generateJsonLd(post: NonNullable<ReturnType<typeof getPostBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage.startsWith("http")
      ? post.coverImage
      : `${baseUrl}${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Aravind Jaimon",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}${post.permalink}`,
    },
    keywords: post.tags.join(", "),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateJsonLd(post);
  const { previous, next } = getAdjacentPosts(post.slug);

  return (
    <>
      {/* JSON-LD for SEO - safe: generated from our own MDX frontmatter, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:font-medium"
      >
        Skip to content
      </a>

      <main className="min-h-screen bg-background pt-16 md:pt-20">
        {/* Blog Header */}
        <BlogHeader post={post} />

        {/* Content with TOC */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
            {/* Main Content */}
            <div id="main-content" className="max-w-4xl">
              {/* Mobile TOC - only shown on mobile */}
              <div className="lg:hidden">
                <TableOfContents items={post.toc} variant="mobile" />
              </div>

              <BlogContent code={post.content} />

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-border">
                <SocialShare
                  title={post.title}
                  url={`${baseUrl}${post.permalink}`}
                  description={post.description}
                />
              </div>

              {/* Post Navigation */}
              <PostNavigation previous={previous} next={next} />

              {/* Comments */}
              <GiscusComments />

              {/* Related Posts */}
              <RelatedPosts currentSlug={post.slug} />
            </div>

            {/* Desktop TOC Sidebar - only shown on desktop */}
            <div className="hidden lg:block">
              <TableOfContents items={post.toc} variant="desktop" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
