import express from "express";
import {
  isAdmin,
  requireSignIn,
  isManager,
  adminOrManager,
} from "../middlewares/authMiddleware.js";
import { getAllUsersController } from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/get-all-users",
  //  requireSignIn,
  //  isAdmin,
  getAllUsersController
);

// Post routes to create product

export default router;
