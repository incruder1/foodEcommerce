import React from "react";
import { NavLink } from "react-router-dom";
const ManagerMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/manager/products"
            className="list-group-item list-group-item-action btn-primary"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/manager/orders"
            className="list-group-item list-group-item-action btn-primary"
          >
            Orders
          </NavLink>
          </div>
      </div>
    </>
  );
};

export default ManagerMenu;
