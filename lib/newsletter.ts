/**
 * Newsletter service for automated blog post notifications via Buttondown
 */

import type { Post } from './blog';

const BUTTONDOWN_API_URL = 'https://api.buttondown.email/v1';

interface ButtondownEmail {
  id: string;
  subject: string;
  body: string;
  status: string;
  publish_date: string;
  metadata?: Record<string, string>;
}

interface ButtondownEmailsResponse {
  results: ButtondownEmail[];
  count: number;
  next: string | null;
  previous: string | null;
}

/**
 * Generate HTML email template - minimal design that complements Buttondown's wrapper
 * Buttondown adds: title, author, date, subscribe link - so we focus on rich content
 */
export function generateEmailTemplate(post: Post, siteUrl: string): string {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const coverImageUrl = post.coverImage
    ? `${siteUrl}${post.coverImage}`
    : null;

  // Format reading time (handle if it already includes "min read")
  const readingTime = post.readingTime
    ? String(post.readingTime).replace(/\s*min\s*read\s*/gi, '').trim()
    : '';

  const tagsHtml = post.tags
    .slice(0, 4) // Limit to 4 tags for cleaner look
    .map(
      (tag) =>
        `<span style="display: inline-block; padding: 6px 14px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #8892b0; font-size: 11px; font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace; border-radius: 4px; margin-right: 8px; margin-bottom: 8px; border: 1px solid #233554;">${tag}</span>`
    )
    .join('');

  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">
  ${
    coverImageUrl
      ? `
  <!-- Cover Image with overlay gradient -->
  <div style="margin: -20px -20px 24px -20px; position: relative;">
    <img src="${coverImageUrl}" alt="" style="width: 100%; height: auto; display: block; border-radius: 8px 8px 0 0;" />
  </div>
  `
      : ''
  }

  <!-- Description Card -->
  <div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border: 1px solid #30363d; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
    <p style="color: #c9d1d9; font-size: 16px; line-height: 1.7; margin: 0;">
      ${post.description}
    </p>
  </div>

  <!-- Meta Row -->
  <div style="display: flex; align-items: center; margin-bottom: 20px;">
    ${
      readingTime
        ? `
    <span style="display: inline-flex; align-items: center; color: #8b949e; font-size: 13px; font-family: 'SF Mono', Monaco, monospace;">
      <span style="margin-right: 6px;">📖</span> ${readingTime} min read
    </span>
    `
        : ''
    }
  </div>

  <!-- Tags -->
  ${
    tagsHtml
      ? `
  <div style="margin-bottom: 28px;">
    ${tagsHtml}
  </div>
  `
      : ''
  }

  <!-- CTA Button -->
  <div style="text-align: center; margin: 32px 0;">
    <a href="${postUrl}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #238636 0%, #2ea043 100%); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 6px; box-shadow: 0 4px 14px rgba(35, 134, 54, 0.4);">
      Read the full article →
    </a>
  </div>

  <!-- Subtle divider -->
  <div style="border-top: 1px solid #21262d; margin: 32px 0 24px 0;"></div>

  <!-- Footer note -->
  <p style="color: #6e7681; font-size: 12px; text-align: center; margin: 0; line-height: 1.6;">
    Thanks for reading! If you enjoyed this, consider sharing it with a friend.
  </p>
</div>
`.trim();
}

/**
 * Get all previously sent emails from Buttondown
 */
async function getSentEmails(apiKey: string): Promise<ButtondownEmail[]> {
  const allEmails: ButtondownEmail[] = [];
  let nextUrl: string | null = `${BUTTONDOWN_API_URL}/emails`;

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization: `Token ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch emails: ${response.statusText}`);
    }

    const data: ButtondownEmailsResponse = await response.json();
    allEmails.push(...data.results);
    nextUrl = data.next;
  }

  return allEmails;
}

/**
 * Check if a newsletter has already been sent for a specific post
 */
export async function isPostAlreadySent(
  slug: string,
  apiKey: string
): Promise<boolean> {
  const emails = await getSentEmails(apiKey);

  // Check metadata for postSlug match
  return emails.some((email) => email.metadata?.postSlug === slug);
}

/**
 * Get posts that haven't had newsletters sent yet
 */
export async function getUnsentPosts(
  posts: Post[],
  apiKey: string
): Promise<Post[]> {
  const sentEmails = await getSentEmails(apiKey);
  const sentSlugs = new Set(
    sentEmails
      .filter((email) => email.metadata?.postSlug)
      .map((email) => email.metadata!.postSlug)
  );

  return posts.filter((post) => !sentSlugs.has(post.slug));
}

/**
 * Send a newsletter for a blog post via Buttondown
 */
export async function sendNewsletterForPost(
  post: Post,
  apiKey: string,
  siteUrl: string
): Promise<{ success: boolean; message: string; emailId?: string }> {
  // Check if already sent
  const alreadySent = await isPostAlreadySent(post.slug, apiKey);
  if (alreadySent) {
    return {
      success: false,
      message: `Newsletter for "${post.title}" has already been sent`,
    };
  }

  const htmlBody = generateEmailTemplate(post, siteUrl);
  const subject = `New Post: ${post.title}`;

  const response = await fetch(`${BUTTONDOWN_API_URL}/emails`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject,
      body: htmlBody,
      status: 'about_to_send', // Send immediately
      metadata: {
        postSlug: post.slug,
        sentAt: new Date().toISOString(),
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return {
      success: false,
      message: `Failed to send newsletter: ${errorData.detail || response.statusText}`,
    };
  }

  const data: ButtondownEmail = await response.json();

  return {
    success: true,
    message: `Newsletter sent successfully for "${post.title}"`,
    emailId: data.id,
  };
}
