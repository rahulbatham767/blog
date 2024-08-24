import Post from "@/models/Post";
import connectMongoDB from "../lib/mongodb";

export async function GET() {
  await connectMongoDB();
  const newPost = await Post.find();

  return Response.json({ post: newPost });
}

export async function POST(req) {
  const { title, body, image, author } = await req.json();
  console.log(title, body, image);
  try {
    await connectMongoDB();
    const newPost = await Post.create({ title, body, image, author });

    return Response.json({
      success: "Post Successfully created",
      data: newPost,
    });
  } catch (error) {
    return Response.json({ error: error });
  }
}
