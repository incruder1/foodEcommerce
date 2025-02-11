import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/order/get-order`, {
        headers: {
          Authorization: auth.token, // Ensure token is sent
          //  "User-Id": auth.user._id, // Send user ID for verification
        },
      });
      if (data?.orders) {
        setOrders(data.orders);
      } else {
        console.log("No orders found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  // headers: { Authorization: auth.token }, 
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.length > 0 ? (
              orders.map((o, i) => (
                <div className="border shadow p-3 mb-3" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>₹{o?.totalAmount}</td>
                        <td>{o?.items?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.items?.map((p) => (
                      <div className="row mb-2 p-3 card flex-row" key={p.menuItemId._id || p.menuItemId}>
                        <div className="col-md-4">
                          <img
                            src={p.menuItemId?.image}
                            className="card-img-top"
                            alt={p.menuItemId?.name || "Product"}
                            width={100}
                            height={200}
                          />
                        </div>
                        <div className="col-md-8">
                          <p><strong>{p.menuItemId?.name || "Unknown Item"}</strong></p>
                          <p>Quantity: {p.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No orders found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
