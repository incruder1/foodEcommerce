import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      return cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toLocaleString("en-US", {
          style: "currency",
          currency: "INR",
        });
    } catch (error) {
      console.log(error);
      return "₹ 0.00";
    }
  };

  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = (pid, change) => {
    const updatedCart = cart
      .map((item) =>
        item._id === pid ? { ...item, quantity: item.quantity + change } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const placeOrder = async () => {
    if (!auth?.token) {
      navigate("/login", { state: "/cart" });
      return;
    }
    try {
      setLoading(true);
      const orderData = {
        userId: auth.user._id,
        items: cart.map((item) => ({
          menuItemId: item._id,
          quantity: item.quantity,
        })),
        totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        status: "Pending",
      };
      console.log(orderData);
      await axios.post("/api/v1/order/create-order", orderData, {
        headers: { Authorization: auth.token },  
      });
      setCart([]);
      localStorage.removeItem("cart");
      setLoading(false);
      toast.success("Order Placed Successfully");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to place order");
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="container">
          <h1 className="text-center bg-light p-2 mb-3">
            {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
            <p className="text-center">
              {cart.length
                ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout!"}`
                : "Your Cart is Empty"}
            </p>
          </h1>
          <div className="row">
            <div className="col-md-6 p-0 m-0">
              {cart.map((p) => (
                <div className="col card flex-row mb-2" key={p._id}>
                  <div className="col-md-4">
                    <img src={p.image} className="card-img-top" alt={p.name} width={"100%"} height={"100%"} />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>Price: {p.price}</p>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-danger me-2" style={{ width: "40px", height: "40px" }} onClick={() => updateQuantity(p._id, -1)}>
                        -
                      </button>
                      <span style={{ minWidth: "40px", textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>
                        {p.quantity}
                      </span>
                      <button className="btn btn-primary ms-2" style={{ width: "40px", height: "40px" }} onClick={() => updateQuantity(p._id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              <div className="mt-2 text-center">
                <button className="btn btn-primary" onClick={placeOrder} disabled={loading || cart.length === 0}>
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
