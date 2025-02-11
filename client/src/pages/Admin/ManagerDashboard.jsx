import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import ManagerMenu from "../../components/Layout/ManagerMenu";
const ManagerDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <ManagerMenu />
          </div>
          <div className="col-md-9">
              <h2>Manager Dashboard</h2>
            <div className="card w-75 p-3">
              <h3> Manager Name : {auth?.user?.username}</h3>
              {/* <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
