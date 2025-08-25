import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { page, referrer, userAgent } = await request.json();

    // Track page view via GraphQL API
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql'}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation TrackPageView($page: String, $referrer: String, $userAgent: String) {
            trackPageView(page: $page, referrer: $referrer, userAgent: $userAgent) {
              success
              message
            }
          }
        `,
        variables: { page, referrer, userAgent },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to track page view");
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Page view tracked successfully" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error tracking page view:", error);
    return NextResponse.json(
      { error: "Failed to track page view" },
      { status: 500 }
    );
  }
}
