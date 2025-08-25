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
          query Inquiries($skip: Int!, $take: Int!) {
            inquiries(skip: $skip, take: $take) { id name email subject message status createdAt }
            inquiriesCount
          }
        `,
        variables: { skip: (page - 1) * pageSize, take: pageSize },
      }),
    });

    const data = await response.json();
    if (data.errors) {
      return NextResponse.json(
        { message: data.errors[0].message || 'Failed to fetch inquiries' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, inquiries: data.data.inquiries, total: data.data.inquiriesCount });
  } catch (e) {
    console.error('Inquiries fetch error:', e);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) return NextResponse.json({ message: 'id and status required' }, { status: 400 });

    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation UpdateInquiryStatus($id: String!, $status: String!) { updateInquiryStatus(id: $id, status: $status) { id status } }
        `,
        variables: { id, status },
      }),
    });

    const data = await response.json();
    if (data.errors) {
      return NextResponse.json({ message: data.errors[0].message || 'Failed to update inquiry' }, { status: 400 });
    }

    return NextResponse.json({ success: true, inquiry: data.data.updateInquiryStatus });
  } catch (e) {
    console.error('Inquiry update error:', e);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
