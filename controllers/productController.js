import productModel from "../models/productModel.js";

import orderModel from "../models/orderModel.js";
import cloudinary from "cloudinary";
 
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
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
// export const getProductController = async (req, res) => {
//   try {
//     const products = await productModel
//       .find({})
//       .populate("category")
//       .select("-photo")
//       .limit(12)
//       .sort({ createdAt: -1 });
//     res.status(200).send({
//       success: true,
//       counTotal: products.length,
//       message: "ALL Products ",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr in getting products",
//       error: error.message,
//     });
//   }
// };
// get single product
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-__v") // Excludes __v field, keeping all other fields
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      countTotal: products.length,
      message: "All Products Fetched Successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching products",
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

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
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




export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
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

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
