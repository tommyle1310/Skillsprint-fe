import { NextRequest, NextResponse } from 'next/server';

const GQL = `${process.env.API_URL || 'http://localhost:4000'}/graphql`;

export async function POST(req: NextRequest) {
  const { courseId, title, questions } = await req.json();
  const mutation = `mutation($courseId:String!,$title:String!,$questions:String!){ createQuiz(courseId:$courseId,title:$title,questions:$questions) }`;
  const res = await fetch(GQL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ query: mutation, variables: { courseId, title, questions: JSON.stringify(questions) } }) });
  const json = await res.json();
  if (json.errors) return NextResponse.json({ success:false, message: json.errors[0]?.message || 'Error' }, { status: 400 });
  return NextResponse.json({ success:true, quizId: json.data?.createQuiz });
}

export async function PUT(req: NextRequest) {
  const { ids } = await req.json();
  const mutation = `mutation($ids:[String!]!){ reorderQuizzes(ids:$ids) }`;
  const res = await fetch(GQL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ query: mutation, variables: { ids } }) });
  const json = await res.json();
  if (json.errors) return NextResponse.json({ success:false, message: json.errors[0]?.message || 'Error' }, { status: 400 });
  return NextResponse.json({ success:true });
}


