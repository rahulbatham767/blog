import mongoose from "mongoose";

let isConnected = false; // Track connection status

const connectMongoDB = async () => {
  try {
    if (isConnected) {
      console.log("MongoDB connection is already established.");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, { dbName: "blog" });
    isConnected = true;
    console.log("connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
