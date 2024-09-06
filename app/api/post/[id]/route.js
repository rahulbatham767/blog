import connectMongoDB from "@/app/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongoDB();
  const { id } = params;
  const Post = await Post.findOne({ _id: id });

  return Response.json({ post: Post }, { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectMongoDB();
  const { id } = params;
  await Post.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Post Successfully Delete" },
    { status: 200 }
  );
}

export async function PUT(req, { params }) {
  await connectMongoDB();
  const { id } = params;
  const { title, body, image, author } = await req.json();

  const post = await Post.findByIdAndUpdate(
    { _id: id },
    {
      title,
      body,
      image,
      author,
    },
    { new: true }
  );
  if (!post) {
    return NextResponse.json({ Message: "Error while fetching post" });
  }

  return NextResponse.json(
    { post: Post, message: "post updated Successfully" },
    { status: 200 }
  );
}
