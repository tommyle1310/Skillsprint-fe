import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { courseId, provider, userId } = await request.json();

    if (!courseId || !provider) {
      return NextResponse.json(
        { error: "courseId and provider are required" },
        { status: 400 }
      );
    }

    const apiUrl = process.env.API_URL || 'http://localhost:4000';
    const response = await fetch(`${apiUrl}/graphql` , {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation Purchase($courseId: String!, $provider: String!, $userId: String) {
            purchaseCourse(courseId: $courseId, provider: $provider, userId: $userId) {
              success
              orderId
              transactionId
            }
          }
        `,
        variables: { courseId, provider, userId },
      }),
    });

    let data: { data?: { purchaseCourse?: { success: boolean; orderId?: string; transactionId?: string } }, errors?: Array<{ message?: string }> } | null = null;
    try {
      data = await response.json();
    } catch {
      return NextResponse.json({ error: 'Invalid response from backend' }, { status: 502 });
    }

    if (!response.ok || (data && Array.isArray(data.errors) && data.errors.length > 0)) {
      const message = (data && data.errors && data.errors[0] && data.errors[0].message) || `Purchase failed: ${response.status}`;
      return NextResponse.json({ error: message }, { status: response.ok ? 400 : 502 });
    }

    const result = data && data.data && data.data.purchaseCourse ? data.data.purchaseCourse : null;
    if (!result) {
      return NextResponse.json({ error: 'Malformed response from backend' }, { status: 502 });
    }

    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error) {
    console.error("Purchase error:", error);
    return NextResponse.json({ error: (error as Error).message || "Internal server error" }, { status: 500 });
  }
}


