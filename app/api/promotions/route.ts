import { NextRequest, NextResponse } from 'next/server';

const GQL_ENDPOINT = `${process.env.API_URL || 'http://localhost:4000'}/graphql`;

export async function GET(req: NextRequest) {
  const query = `query { promotions { id code discountPercentage expiresAt } }`;
  const res = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  return NextResponse.json({ success: true, promotions: json.data?.promotions ?? [] });
}

export async function POST(req: NextRequest) {
  const { code, discountPercentage, expiresAt } = await req.json();
  const mutation = `mutation($code:String!,$discountPercentage:Int!,$expiresAt:String!){ createPromotion(code:$code,discountPercentage:$discountPercentage,expiresAt:$expiresAt){ id code discountPercentage expiresAt } }`;
  const res = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation, variables: { code, discountPercentage, expiresAt } }),
  });
  const json = await res.json();
  return NextResponse.json({ success: true, promotion: json.data?.createPromotion });
}

export async function PUT(req: NextRequest) {
  const { id, code, discountPercentage, expiresAt } = await req.json();
  const mutation = `mutation($id:ID!,$code:String,$discountPercentage:Int,$expiresAt:String){ updatePromotion(id:$id,code:$code,discountPercentage:$discountPercentage,expiresAt:$expiresAt){ id code discountPercentage expiresAt } }`;
  const res = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation, variables: { id, code, discountPercentage, expiresAt } }),
  });
  const json = await res.json();
  return NextResponse.json({ success: true, promotion: json.data?.updatePromotion });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const mutation = `mutation($id:ID!){ deletePromotion(id:$id) }`;
  const res = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation, variables: { id } }),
  });
  const json = await res.json();
  return NextResponse.json({ success: true, deleted: json.data?.deletePromotion });
}


