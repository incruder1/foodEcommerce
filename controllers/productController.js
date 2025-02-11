import productModel from "../models/productModel.js";

import orderModel from "../models/orderModel.js";
import cloudinary from "cloudinary";
 
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment gateway

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// export const createProductController = async (req, res) => {
//   try {
//     console.log(req);
//     const { name ,price, category} =
//       req.fields;
//     const { photo } = req.files;
//     //alidation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case photo && photo.size > 1000000:
//         return res
//           .status(500)
//           .send({ error: "photo is Required and should be less then 1mb" });
//     }

//     const products = new productModel({ ...req.fields, slug: slugify(name) });
//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Created Successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in crearing product",
//     });
//   }
// };

//get all products
export const createProductController = async (req, res) => {
  try {
   // console.log(req.fields);
    const { name, price, category } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case photo:
        return res.status(400).send({ error: "Photo is required" });
    }

    let cloudinaryUrl = "";
    // CLOUDINARY_URL=cloudinary://123386882386973:A8TbhjokxrGMn-hY22RfQs9sSS0@dheiuinbd
    if (photo) {
      const result = await cloudinary.v2.uploader.upload(photo.path);
      cloudinaryUrl = result.secure_url;
    }

    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
      image: cloudinaryUrl,
    });

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const total = await productModel.countDocuments();
    const products = await productModel
      .find({})
      .populate("category")
      .select("-__v")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};



export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};


//delete controller
export const deleteProductController = async (req, res) => {
  try {
   // console.log(req.params.pid);
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product Deleted ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
// export const updateProductController = async (req, res) => {
//   try {
//     const { name, price, category,availability  } =
//       req.fields;
//     const { photo } = req.files;
//     //alidation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
       
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !availability:
//         return res.status(500).send({ error: "availability is Required" });
//       case photo && photo.size > 1000000:
//         return res
//           .status(500)
//           .send({ error: "photo is Required and should be less then 1mb" });
//     }

//     const products = await productModel.findByIdAndUpdate(
//       req.params.pid,
//       { ...req.fields, slug: slugify(name) },
//       { new: true }
//     );
//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Updated Successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in Updte product",
//     });
//   }
// };

// filters

// export const updateProductController = async (req, res) => {
//   try {
//     const { name, price, category, availability } = req.body;

//     if (!name || !price || !category || !availability) {
//       return res.status(400).send({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const product = await productModel.findByIdAndUpdate(
//       req.params.pid,
//       { name, price, category, availability },
//       { new: true }
//     );

//     if (!product) {
//       return res.status(404).send({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.status(200).send({
//       success: true,
//       message: "Product updated successfully",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error updating product",
//       error: error.message,
//     });
//   }
// };

export const updateProductController = async (req, res) => {
  try {
    //console.log("Received update request...");
    // console.log("Fields:", req.fields);
    // console.log("Files:", req.files);

    const { name, price, category, availability } = req.fields;

    if (!name || !price || !category || !availability) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { name, price, category, availability, slug: slugify(name) },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};



 
 
// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = Number(req.params.page) || 1; 
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

