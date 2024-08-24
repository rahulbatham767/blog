import connectMongoDB from "@/app/lib/mongodb";
import Post from "@/models/Post";

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

  return Response.json(
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
    return Response.json({ Message: "Error while fetching post" });
  }

  return Response.json(
    { post: Post, message: "post updated Successfully" },
    { status: 200 }
  );
}
