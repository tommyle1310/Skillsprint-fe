import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Login via GraphQL API
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql'}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              access_token
              user {
                id
                email
                name
                avatar
                createdAt
              }
            }
          }
        `,
        variables: { email, password },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    
    if (data.errors) {
      return NextResponse.json(
        { error: data.errors[0].message || "Invalid credentials" },
        { status: 401 }
      );
    }

    const { access_token, user } = data.data.login;

    // Set HTTP-only cookie with JWT token
    const response_cookie = NextResponse.json(
      { 
        success: true, 
        message: "Login successful",
        user
      },
      { status: 200 }
    );

    response_cookie.cookies.set("auth_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response_cookie;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
