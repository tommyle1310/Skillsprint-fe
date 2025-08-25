import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Call backend GraphQL API
    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation Register($email: String!, $password: String!, $name: String!) {
            register(email: $email, password: $password, name: $name) {
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
        variables: {
          email,
          password,
          name,
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json(
        { message: data.errors[0].message || 'Registration failed' },
        { status: 400 }
      );
    }

    if (data.data?.register) {
      const { access_token, user } = data.data.register;
      
      return NextResponse.json({
        success: true,
        message: 'Registration successful',
        token: access_token,
        user,
      });
    }

    return NextResponse.json(
      { message: 'Registration failed' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
