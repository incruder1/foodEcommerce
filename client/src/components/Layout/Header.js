import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { MdOutlineShoppingCart } from "react-icons/md";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary  ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            🛒 Craft My Plate
          </Link>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav  ms-auto mx-4 mb-lg-0">
              {/* <SearchInput /> */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.username}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === "admin"
                              ? "admin"
                              : auth?.user?.role === "manager"
                              ? "manager"
                              : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className="nav-link d-flex align-items-center"
                >
                  <MdOutlineShoppingCart size={20} className="me-1" />
                  <span>Cart</span>
                  <Badge
                    count={
                      cart?.reduce((total, item) => total + item.quantity, 0) ||
                      0
                    }
                    showZero
                    offset={[8, -4]}
                  />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
