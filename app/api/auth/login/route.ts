import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
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
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              access_token
              user {
                id
                email
                name
                role
                avatar
                createdAt
              }
            }
          }
        `,
        variables: {
          email,
          password,
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json(
        { message: data.errors[0].message || 'Login failed' },
        { status: 400 }
      );
    }

    if (data.data?.login) {
      const { access_token, user } = data.data.login;
      console.log('check user.role', user)
      
      return NextResponse.json({
        success: true,
        token: access_token,
        user,
      });
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
