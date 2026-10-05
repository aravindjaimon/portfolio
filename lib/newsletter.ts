/**
 * Newsletter service for automated blog post notifications via Buttondown
 */

import type { Post } from "./blog";

const BUTTONDOWN_API_URL = "https://api.buttondown.email/v1";

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
 * Generate HTML email template matching the site's light Equinox palette
 */
export function generateEmailTemplate(post: Post, siteUrl: string): string {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const coverImageUrl = post.coverImage ? `${siteUrl}${post.coverImage}` : null;

  const tagsHtml = post.tags
    .map(
      (tag) =>
        `<span style="display: inline-block; padding: 4px 12px; background-color: #F4DFE2; color: #231C27; font-size: 12px; font-family: monospace; margin-right: 8px; margin-bottom: 8px;">${tag}</span>`
    )
    .join("");

  // Handle readingTime - strip "min read" if already present to avoid duplication
  const readingTimeNum = post.readingTime
    ? String(post.readingTime)
        .replace(/\s*min\s*read\s*/gi, "")
        .trim()
    : "";
  const readingTimeText = readingTimeNum ? `${readingTimeNum} min read` : "";

  const dateText = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF6F1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF6F1; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border: 1px solid #E3D9D2;">
          ${
            coverImageUrl
              ? `
          <tr>
            <td>
              <img src="${coverImageUrl}" alt="${post.title}" style="width: 100%; height: auto; display: block;" />
            </td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="padding: 32px;">
              <!-- Header -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 24px; border-bottom: 1px solid #E3D9D2;">
                    <span style="color: #A3324F; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 2px;">NEW POST</span>
                  </td>
                </tr>
              </table>

              <!-- Title -->
              <h1 style="color: #231C27; font-family: Didot, 'Bodoni 72', Georgia, serif; font-size: 28px; font-weight: bold; margin: 24px 0 16px 0; line-height: 1.3;">
                ${post.title}
              </h1>

              <!-- Meta -->
              <p style="color: #5F5562; font-size: 14px; font-family: monospace; margin: 0 0 20px 0;">
                ${dateText}${readingTimeText ? ` • ${readingTimeText}` : ""}
              </p>

              <!-- Description -->
              <p style="color: #231C27; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                ${post.description}
              </p>

              <!-- Tags -->
              <div style="margin-bottom: 32px;">
                ${tagsHtml}
              </div>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="${postUrl}" style="display: inline-block; padding: 16px 32px; background-color: #A3324F; color: #FFFFFF; text-decoration: none; font-size: 14px; font-family: monospace; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                      READ FULL POST →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #FAF6F1; border-top: 1px solid #E3D9D2;">
              <!--
                Buttondown template variable: {{ unsubscribe_url }}
                This is replaced by Buttondown's email processor with a unique
                unsubscribe URL for each subscriber. Do not modify the syntax.
                See: https://docs.buttondown.email/advanced-features/template-variables
              -->
              <p style="color: #5F5562; font-size: 12px; font-family: monospace; margin: 0; text-align: center;">
                You're receiving this because you subscribed to updates from Aravind Jaimon's blog.
                <br><br>
                <a href="{{ unsubscribe_url }}" style="color: #5F5562; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject,
      body: htmlBody,
      status: "about_to_send", // Send immediately
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
