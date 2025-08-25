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
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql'}`, {
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
