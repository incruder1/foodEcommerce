import React, { useState, useEffect } from "react";
import ManagerMenu from "../../components/Layout/ManagerMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard"; 

const ManagerProducts = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
    <div className="row dashboard">
      <div className="col-md-3">
        <ManagerMenu />
      </div>
      <div className="col-md-9">
        <h1 className="text-center">All Products List</h1>
       <div className="flex flex-col p-2">
  {products.map((product) => (
    <div key={product._id} className=" p-2">
      <ProductCard product={product} />
    </div>
  ))}
</div>

      </div>
    </div>
  </Layout>

  );
};

export default ManagerProducts;
