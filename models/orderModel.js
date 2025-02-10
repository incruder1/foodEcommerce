// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     products: [
//       {
//         type: mongoose.ObjectId,
//         ref: "Products",
//       },
//     ],
//     payment: {},
//     buyer: {
//       type: mongoose.ObjectId,
//       ref: "users",
//     },
//     status: {
//       type: String,
//       default: "Not Process",
//       enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [
      {
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);