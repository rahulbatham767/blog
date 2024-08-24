import connectMongoDB from "@/app/lib/mongodb";
import userSchema from "@/app/schemas/userSchema";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(req) {
  const { firstname, lastname, email, password } = await req.json();
  await connectMongoDB();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    const validateUser = await userSchema.parse({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    const newUser = await User.create(validateUser);

    // Generate a jwt token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return Response.json({
      success: "User Successfully created",
      data: {
        token, // Send the JWT token to the client
        user: { firstname, lastname, email },
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
