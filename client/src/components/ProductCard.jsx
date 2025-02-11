import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProductCard = ({ product, onUpdate }) => {

  const [showDialog, setShowDialog] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    availability: product.availability,
  });

  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedProduct.name);
      formData.append("price", updatedProduct.price);
      formData.append("category", updatedProduct.category);
      formData.append("availability", updatedProduct.availability);
  
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (data.success) {
        toast.success("Product Updated Successfully");
        setShowDialog(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating product");
    }
  };
  

    const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success("Product Deleted Successfully");
        // onUpdate();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
    }


  return (
    <div className="relative bg-white rounded-lg ">
      <img
        src={product.image}
        alt={product.name}
        height={200}
        width={200}
        className="object-cover rounded-md"
      />
      <div className="mt-3">
        <h5 className="text-lg font-semibold">{product.name}</h5>
        <p className="text-gray-600 text-sm">{product.category}</p>
        <p className="text-gray-600 text-sm">₹{product.price}</p>
      </div>

        <div className="absolute top-12 right-0 bg-white shadow-md p-2 rounded">
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setShowDialog(!showDialog)}
          >
            Edit
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
          onClick={() => handleDelete(product._id)}
          >
            Delete
          </button>
        </div>
        { showDialog && <div className="bg-transparent flex flex-col items-center justify-center ">
          <div className="p-6 rounded-lg shadow-lg">
            <input
              type="text"
              className="border p-2 w-full mb-2 bg-transparent"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
            />
            <input
              type="text"
              className="border p-2 w-full mb-2 bg-white"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
            />
            <input
              type="text"
              className="border p-2 w-full mb-2 bg-white"
              value={updatedProduct.category}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, category: e.target.value })
              }
            />
            <input
              type="text"
              className="border p-2 w-full mb-2 bg-white"
              value={updatedProduct.availability}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, availability: e.target.value })
              } 
            />

            <button
              className="bg-gray-500 text-black px-4 py-2 rounded mr-2"
              onClick={() => handleUpdate(product._id)}
            >
              Update
            </button>
            <button
              className="bg-gray-500 text-black px-4 py-2 rounded"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </button>
          </div>
        </div>}

    </div>
  );
};

export default ProductCard;
