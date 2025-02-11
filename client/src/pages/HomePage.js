import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import banner1 from "../images/banner1.png";
import cover from "../images/cover1.png";
import "../styles/Homepage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 4; // Set to 4 per page

  useEffect(() => {
    getAllProducts();
  }, [page]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/get-product?page=${page}&limit=${limit}`);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout title={"Craft My Plate"}>
      <div className="home">
        <img className="banner" src={banner1} alt="Banner" />
        <div>
          <img className="cover" src={cover} alt="Cover Pic" />
        </div>
      </div>

      <div className="w-full row mt-3 home-page">
        <h1 className="text-center">All Products</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {products.map((p) => (
            <div className="card mx-2 mt-4" key={p._id}>
              <img src={p.image} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name.length > 10 ? p.name.slice(0, 20) + "..." : p.name}</h5>
                <h5 className="card-price">
                  {p.price.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                </h5>
                <p className="card-text">{p.category}</p>
                
                <div className="card-name-price">
                  {cart.find((item) => item._id === p._id) ? (
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-danger me-2"
                        style={{ width: "120px", height: "40px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const updatedCart = cart
                            .map((item) =>
                              item._id === p._id
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                            )
                            .filter((item) => item.quantity > 0);
                          setCart(updatedCart);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(updatedCart)
                          );
                        }}
                      >
                        -
                      </button>
                      <span
                        style={{
                          minWidth: "50px",
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {cart.find((item) => item._id === p._id)?.quantity}
                      </span>
                      <button
                        className="btn btn-primary ms-2"
                        style={{ width: "120px", height: "40px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const updatedCart = cart.map((item) =>
                            item._id === p._id
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                          );
                          setCart(updatedCart);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(updatedCart)
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-dark ms-1"
                      style={{ width: "240px", height: "40px" }}
                      onClick={() => {
                        const updatedCart = [...cart, { ...p, quantity: 1 }];
                        setCart(updatedCart);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(updatedCart)
                        );
                        toast.success("Item Added to Cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls d-flex justify-content-center align-items-center mt-3">
          <button
            className="btn btn-sm btn-primary pagination-btn mx-2"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            {"<"} Prev
          </button>
          <span className="mx-2">Page {page} of {totalPages}</span>
          <button
            className="btn btn-sm btn-primary pagination-btn mx-2"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next {">"}
          </button>
        </div>
      </div>

      {/* Pagination Button Styling */}
      <style>
  {`
    .pagination-btn {
      padding: 5px 8px;
      font-size: 14px;
      max-width: 60px; /* Reduced width */
    }

    @media (max-width: 768px) {
      .pagination-btn {
        padding: 4px 6px;
        font-size: 12px;
        min-width: 50px; /* Even smaller on mobile */
      }
    }
  `}
</style>

    </Layout>
  );
};

export default HomePage;
