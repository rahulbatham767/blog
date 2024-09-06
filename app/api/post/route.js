import Post from "@/models/Post";
import connectMongoDB from "../../lib/mongodb";

export async function GET() {
  await connectMongoDB();
  const newPost = await Post.find();

  return Response.json({ post: newPost });
}

export async function POST(req) {
  const { title, content, image, author } = await req.json();
  console.log(title, content, image);
  try {
    await connectMongoDB();
    const newPost = await Post.create({ title, body: content, image, author }); // Properly assign 'content' to 'body'

    return Response.json({
      success: "Post Successfully created",
      data: newPost,
    });
  } catch (error) {
    return Response.json({ error: error });
  }
}
