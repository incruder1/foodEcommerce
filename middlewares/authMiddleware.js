import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    console.log("require sign done");
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {

    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access: No user found",
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }
    console.log("require admin done");

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in admin middleware",
    });
  }
};


// isManager
export const isManager =async(req,res,next)=>{
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 'manager') {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Manager middelware",
    });
  }

}

// administrative control => Ismanager or IsAdmin
export const adminOrManager =async(req,res,next)=>{
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 'manager' && user.role!=='admin') {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Manager middelware",
    });
  }

}