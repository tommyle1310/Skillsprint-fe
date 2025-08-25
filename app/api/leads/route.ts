import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Create lead via backend GraphQL
    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation CreateLead($email: String!) {
            createLead(email: $email) { id email createdAt }
          }
        `,
        variables: { email },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json(
        { message: data.errors[0].message || 'Failed to create lead' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, lead: data.data.createLead });
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `query { leads { id email createdAt } }` }),
    });
    const data = await response.json();
    if (data.errors) {
      return NextResponse.json({ message: 'Failed to fetch leads' }, { status: 400 });
    }
    return NextResponse.json({ success: true, leads: data.data.leads });
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
