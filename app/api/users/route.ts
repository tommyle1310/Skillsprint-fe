import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query Users($skip: Int!, $take: Int!) {
            users(skip: $skip, take: $take) {
              id
              email
              name
              role
              image
              createdAt
            }
            usersCount
          }
        `,
        variables: { skip: (page - 1) * pageSize, take: pageSize },
      }),
    });

    const data = await response.json();
    if (data.errors) {
      return NextResponse.json({ message: data.errors[0].message }, { status: 400 });
    }

    return NextResponse.json({ success: true, users: data.data.users, total: data.data.usersCount });
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, role } = body as { userId: string; role: string };
    if (!userId || !role) return NextResponse.json({ message: 'userId and role are required' }, { status: 400 });

    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation UpdateUserRole($userId: String!, $role: String!) {
            updateUserRole(userId: $userId, role: $role) {
              id
              email
              name
              role
              image
              createdAt
            }
          }
        `,
        variables: { userId, role },
      }),
    });

    const data = await response.json();
    if (data.errors) {
      return NextResponse.json({ message: data.errors[0].message }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: data.data.updateUserRole });
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
