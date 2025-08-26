import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { courseId, amount, status = "pending" } = await request.json();

    if (!courseId || !amount) {
      return NextResponse.json(
        { error: "Course ID and amount are required" },
        { status: 400 }
      );
    }

    // Create order via GraphQL API
    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation CreateOrder($courseId: ID!, $amount: Int!, $status: String) {
            createOrder(courseId: $courseId, amount: $amount, status: $status) {
              id
              amount
              status
              createdAt
              course {
                id
                title
              }
            }
          }
        `,
        variables: { courseId, amount, status },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Order created successfully",
        order: data.data.createOrder
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "userId and courseId are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query HasPurchased($userId: String!, $courseId: String!) {
            hasPurchased(userId: $userId, courseId: $courseId)
          }
        `,
        variables: { userId, courseId },
      }),
    });

    let data: { data?: { hasPurchased?: boolean }, errors?: Array<{ message?: string }> } | null = null;
    try {
      data = await response.json();
    } catch {
      return NextResponse.json({ error: 'Invalid response from backend' }, { status: 502 });
    }

    if (!response.ok || (data && Array.isArray(data.errors) && data.errors.length > 0)) {
      const message = (data && data.errors && data.errors[0] && data.errors[0].message) || `Failed: ${response.status}`;
      return NextResponse.json({ error: message }, { status: response.ok ? 400 : 502 });
    }

    return NextResponse.json({ success: true, purchased: !!(data && data.data && data.data.hasPurchased) }, { status: 200 });
  } catch (error) {
    console.error('HasPurchased error:', error);
    return NextResponse.json({ error: (error as Error).message || 'Internal server error' }, { status: 500 });
  }
}