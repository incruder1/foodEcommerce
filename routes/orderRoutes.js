import express from "express";
import {
  isAdmin,
  requireSignIn,
  isManager,
  adminOrManager,
} from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  placeOrderController,
  getOrdersController,
  updateOrderStatusController,
  getAllOrdersController,

} from "../controllers/orderController.js";

const router = express.Router();

//get products
router.get("/get-order", requireSignIn, getOrdersController);
router.get(
  "/get-all-order",
  requireSignIn,
  adminOrManager,
  getAllOrdersController
);

 

// Post routes to create product
router.post(
  "/create-order",
  requireSignIn,
  // isAdmin,
  // formidable(),
  placeOrderController
);

//routes
router.put(
  "/update-order/:pid",
  requireSignIn,
  //  isAdmin,
  adminOrManager,
  updateOrderStatusController
);

export default router;
