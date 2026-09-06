import { NextRequest, NextResponse } from "next/server";

interface ButtondownError {
  detail?: string;
  email?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BUTTONDOWN_API_KEY;

    if (!apiKey) {
      console.error("BUTTONDOWN_API_KEY is not configured");
      return NextResponse.json(
        { error: "Newsletter service is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.buttondown.email/v1/subscribers",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          type: "regular", // Skip double opt-in confirmation email
          tags: ["portfolio-signup"],
        }),
      }
    );

    if (response.ok) {
      return NextResponse.json(
        { message: "Successfully subscribed!" },
        { status: 201 }
      );
    }

    // Handle specific Buttondown errors
    const errorData: ButtondownError = await response.json().catch(() => ({}));

    if (response.status === 400) {
      // Check for already subscribed
      if (errorData.email?.some((e) => e.toLowerCase().includes("already"))) {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: errorData.detail || "Invalid subscription request" },
        { status: 400 }
      );
    }

    if (response.status === 429) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Generic error for other cases
    console.error("Buttondown API error:", response.status, errorData);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: response.status }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
