import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Call backend GraphQL API to get courses
    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            courses {
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
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json(
        { message: data.errors[0].message || 'Failed to fetch courses' },
        { status: 400 }
      );
    }

    if (data.data?.courses) {
      return NextResponse.json({
        success: true,
        courses: data.data.courses,
      });
    }

    return NextResponse.json(
      { message: 'Failed to fetch courses' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Courses fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, price, slug, avatar, createdById } = await request.json();

    if (!title || !description || !price || !slug || !createdById) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Call backend GraphQL API to create course
    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        query: `
          mutation CreateCourse($title: String!, $description: String!, $price: Int!, $slug: String!, $avatar: String, $createdById: String!) {
            createCourse(title: $title, description: $description, price: $price, slug: $slug, avatar: $avatar, createdById: $createdById) {
              id
              title
              slug
              description
              price
              createdById
              createdAt
            }
          }
        `,
        variables: {
          title,
          description,
          price: parseInt(price),
          slug,
          avatar,
          createdById,
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json(
        { message: data.errors[0].message || 'Failed to create course' },
        { status: 400 }
      );
    }

    if (data.data?.createCourse) {
      return NextResponse.json({
        success: true,
        message: 'Course created successfully',
        course: data.data.createCourse,
      });
    }

    return NextResponse.json(
      { message: 'Failed to create course' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
