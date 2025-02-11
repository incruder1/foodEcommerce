import productModel from "../models/productModel.js";

import orderModel from "../models/orderModel.js";
import cloudinary from "cloudinary";

import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

// / POST /order - Place an order
export const placeOrderController = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, items, totalAmount } = req.body;
    if (!userId || !items.length || !totalAmount) {
      return res.status(400).json({ message: "Invalid order details" });
    }
    const newOrder = new orderModel({
      userId,
      items,
      totalAmount,
      status: "Pending",
    });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

// GET /orders - Fetch orders of the logged-in user
export const getOrdersController = async (req, res) => {
  try {
    console.log(req.user._id);
    const userId = req.user._id;
    const orders = await orderModel
      .find({ userId })
      .populate("items.menuItemId");
    console.log(orders);
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("userId", "name email")
      .populate("items.menuItemId", "name price description");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching orders", error });
  }
};

// PUT /order/:id/status - Update order status (admin/manager only)
export const updateOrderStatusController = async (req, res) => {
  try {
    const { pid } = req.params;
    const { status } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(
      pid,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order status updated", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

