import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import cloudinary from "cloudinary";

import dotenv from "dotenv";

dotenv.config();
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find().select("-password"); // Exclude password field
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching users", error });
  }
};
