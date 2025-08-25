import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation CreateInquiry($name: String!, $email: String!, $subject: String!, $message: String!) {
            createInquiry(name: $name, email: $email, subject: $subject, message: $message) {
              id
              name
              email
              subject
              message
              createdAt
            }
          }
        `,
        variables: { name, email, subject, message },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json({ message: 'Failed to send message' }, { status: 400 });
    }

    return NextResponse.json({ success: true, inquiry: data.data.createInquiry });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
