import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ManagerMenu from "../../components/Layout/ManagerMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const ManagerOrders = () => {
  const [status, setStatus] = useState(["Pending", "Completed"]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/order/get-all-order`, {
        headers: {
          Authorization: auth.token,
        },
      });

      if (data?.orders) {
        setOrders(data.orders);
        console.log(data.orders);
      } else {
        console.log("No orders found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    // console.log(auth?.token);
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `/api/v1/order/update-order/${orderId}`,
        { status: value },
        {
          headers: { Authorization: auth.token },
        }
      );
      toast.success("Order status updated");
      getOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Layout title="All Orders Data">
      <div className="row dashboard">
        <div className="col-md-3">
          <ManagerMenu />
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
                      {/* <th>Buyer</th> */}
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      {/* <td>{o?.username || "Unknown"}</td> */}
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{"Success"}</td>
                      <td>
                        {o?.items && Array.isArray(o.items)
                          ? o.items.reduce((total, item) => {
                               
                              return total + (item?.quantity || 0);
                            }, 0)
                          : 0}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={p.image}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>
                          <strong>{p.name}</strong>
                        </p>
                        <p>{p.description.substring(0, 30)}...</p>
                        <p>Price: ₹{p.price}</p>
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
    </Layout>
  );
};

export default ManagerOrders;
