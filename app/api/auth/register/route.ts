import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Register via GraphQL API
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql'}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation Register($name: String!, $email: String!, $password: String!) {
            register(name: $name, email: $email, password: $password) {
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
        variables: { name, email, password },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    const data = await response.json();
    
    if (data.errors) {
      const errorMessage = data.errors[0].message;
      if (errorMessage.includes("unique constraint")) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: errorMessage || "Registration failed" },
        { status: 400 }
      );
    }

    const { access_token, user } = data.data.register;

    // Set HTTP-only cookie with JWT token
    const response_cookie = NextResponse.json(
      { 
        success: true, 
        message: "Registration successful",
        user
      },
      { status: 201 }
    );

    response_cookie.cookies.set("auth_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response_cookie;
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
