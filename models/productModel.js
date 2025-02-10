import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      // enum: ["Appetizers", "Main Course", "Desserts"],
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    image:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);