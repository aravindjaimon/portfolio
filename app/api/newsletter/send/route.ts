import { NextRequest, NextResponse } from 'next/server';
import { getPublishedPosts, getPostBySlug } from '@/lib/blog';
import {
  sendNewsletterForPost,
  getUnsentPosts,
} from '@/lib/newsletter';

/**
 * Validate admin authentication
 */
function validateAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.slice(7);
  const adminSecret = process.env.NEWSLETTER_ADMIN_SECRET;

  if (!adminSecret) {
    console.error('NEWSLETTER_ADMIN_SECRET is not configured');
    return false;
  }

  return token === adminSecret;
}

/**
 * GET /api/newsletter/send
 * List all unsent posts (posts that haven't had newsletters sent)
 */
export async function GET(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Buttondown API key not configured' },
      { status: 500 }
    );
  }

  try {
    const posts = getPublishedPosts();
    const unsentPosts = await getUnsentPosts(posts, apiKey);

    return NextResponse.json({
      total: posts.length,
      unsent: unsentPosts.length,
      posts: unsentPosts.map((post) => ({
        slug: post.slug,
        title: post.title,
        publishedAt: post.publishedAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching unsent posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch unsent posts' },
      { status: 500 }
    );
  }
}

interface SendRequestBody {
  slug?: string;
  sendAll?: boolean;
}

/**
 * POST /api/newsletter/send
 * Send newsletter for specific post or all unsent posts
 *
 * Body options:
 * - { slug: "post-slug" } - Send for specific post
 * - { sendAll: true } - Send for all unsent posts
 */
export async function POST(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Buttondown API key not configured' },
      { status: 500 }
    );
  }

  const siteUrl = process.env.SITE_URL || 'https://aravindjaimon.com';

  let body: SendRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const { slug, sendAll } = body;

  // Validate request
  if (!slug && !sendAll) {
    return NextResponse.json(
      { error: 'Must provide either "slug" or "sendAll: true"' },
      { status: 400 }
    );
  }

  try {
    // Send for specific post
    if (slug) {
      const post = getPostBySlug(slug);
      if (!post) {
        return NextResponse.json(
          { error: `Post not found: ${slug}` },
          { status: 404 }
        );
      }

      if (post.draft) {
        return NextResponse.json(
          { error: 'Cannot send newsletter for draft posts' },
          { status: 400 }
        );
      }

      const result = await sendNewsletterForPost(post, apiKey, siteUrl);

      return NextResponse.json(result, {
        status: result.success ? 200 : 400,
      });
    }

    // Send for all unsent posts
    if (sendAll) {
      const posts = getPublishedPosts();
      const unsentPosts = await getUnsentPosts(posts, apiKey);

      if (unsentPosts.length === 0) {
        return NextResponse.json({
          success: true,
          message: 'No unsent posts found',
          results: [],
        });
      }

      const results = [];

      for (const post of unsentPosts) {
        const result = await sendNewsletterForPost(post, apiKey, siteUrl);
        results.push({
          slug: post.slug,
          title: post.title,
          ...result,
        });
      }

      const successCount = results.filter((r) => r.success).length;

      return NextResponse.json({
        success: successCount > 0,
        message: `Sent ${successCount} of ${results.length} newsletters`,
        results,
      });
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}
