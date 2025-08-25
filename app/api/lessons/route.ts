import { NextRequest, NextResponse } from 'next/server';

const GQL = `${process.env.API_URL || 'http://localhost:4000'}/graphql`;

export async function POST(req: NextRequest) {
  const { courseId, title, videoUrl, avatar } = await req.json();
  const mutation = `mutation($courseId:String!,$title:String!,$videoUrl:String,$avatar:String){ createLesson(courseId:$courseId,title:$title,videoUrl:$videoUrl,avatar:$avatar){ id } }`;
  const res = await fetch(GQL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ query: mutation, variables: { courseId, title, videoUrl, avatar } }) });
  const json = await res.json();
  if (json.errors) return NextResponse.json({ success:false, message: json.errors[0]?.message || 'Error' }, { status: 400 });
  return NextResponse.json({ success:true, lessonId: json.data?.createLesson?.id });
}

export async function PUT(req: NextRequest) {
  const { ids } = await req.json();
  const mutation = `mutation($ids:[String!]!){ reorderLessons(ids:$ids) }`;
  const res = await fetch(GQL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ query: mutation, variables: { ids } }) });
  const json = await res.json();
  if (json.errors) return NextResponse.json({ success:false, message: json.errors[0]?.message || 'Error' }, { status: 400 });
  return NextResponse.json({ success:true });
}

export async function PATCH(req: NextRequest) {
  const { id, order, title, videoUrl, avatar, visible } = await req.json();
  const mutation = `mutation($id:ID!,$order:Int,$title:String,$videoUrl:String,$avatar:String,$visible:Boolean){ updateLesson(id:$id,order:$order,title:$title,videoUrl:$videoUrl,avatar:$avatar,visible:$visible){ id } }`;
  const res = await fetch(GQL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ query: mutation, variables: { id, order, title, videoUrl, avatar, visible } }) });
  const json = await res.json();
  if (json.errors) return NextResponse.json({ success:false, message: json.errors[0]?.message || 'Error' }, { status: 400 });
  return NextResponse.json({ success:true });
}


