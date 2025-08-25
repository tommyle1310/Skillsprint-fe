import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { message: 'Course slug is required' },
        { status: 400 }
      );
    }

    // Call backend GraphQL API to get course by slug
    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query Course($slug: String!) {
            course(slug: $slug) {
              id
              title
              slug
              avatar
              description
              price
              createdAt
              lessons {
                id
                title
                order
                avatar
                videoUrl
              }
            }
          }
        `,
        variables: {
          slug,
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json(
        { message: data.errors[0].message || 'Failed to fetch course' },
        { status: 400 }
      );
    }

    if (data.data?.course) {
      return NextResponse.json({
        success: true,
        course: data.data.course,
      });
    }

    return NextResponse.json(
      { message: 'Course not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Course fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
