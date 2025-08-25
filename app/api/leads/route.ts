import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Create lead via GraphQL API
    const leadResponse = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql'}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation CreateLead($email: String!) {
            createLead(email: $email) {
              id
              email
              createdAt
            }
          }
        `,
        variables: { email },
      }),
    });

    if (!leadResponse.ok) {
      throw new Error("Failed to create lead");
    }

    // Track page view for analytics
    try {
      await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql'}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation TrackPageView {
              trackPageView {
                success
                message
              }
            }
          `,
        }),
      });
    } catch (trackError) {
      console.error("Failed to track page view:", trackError);
      // Don't fail the lead creation if tracking fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Lead created successfully",
        lead: { email, createdAt: new Date().toISOString() }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
