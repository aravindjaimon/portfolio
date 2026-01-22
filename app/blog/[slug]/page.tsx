import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BlogHeader, BlogContent, RelatedPosts } from '@/components/blog';
import { getPostBySlug, getPublishedPosts } from '@/lib/blog';
import type { Metadata } from 'next';

const baseUrl = 'https://aravindjaimon.com';

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
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const ogImage = post.coverImage.startsWith('http')
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
      type: 'article',
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
      card: 'summary_large_image',
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
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.coverImage.startsWith('http') ? post.coverImage : `${baseUrl}${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Aravind Jaimon',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${post.permalink}`,
    },
    keywords: post.tags.join(', '),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateJsonLd(post);

  return (
    <>
      {/* JSON-LD for SEO - safe: generated from our own MDX frontmatter, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0A0A0A]">
        {/* Navigation */}
        <div className="border-b border-[#2D2D2D]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#C41E3A] font-mono text-sm transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Blog Header */}
        <BlogHeader post={post} />

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <BlogContent code={post.content} />

          {/* Related Posts */}
          <RelatedPosts currentSlug={post.slug} />
        </div>
      </main>
    </>
  );
}
