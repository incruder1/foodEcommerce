import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    // Fix: Set strictQuery before connecting
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB Database: ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in MongoDB: ${error}`.bgRed.white);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
