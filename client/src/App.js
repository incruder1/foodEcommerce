import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPasssword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import ManagerRoute from "./components/Routes/ManagerRoute";
import ManagerDashboard from "./pages/Admin/ManagerDashboard";
import ManagerProducts from "./pages/Admin/ManagerProducts";
import ManagerOrders from "./pages/Admin/ManagerOrders";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} /> 
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} /> 
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="/dashboard" element={<ManagerRoute />}>
          <Route path="manager" element={<ManagerDashboard />} />          
          <Route path="manager/products" element={<ManagerProducts />} />
          <Route path="manager/users" element={<Users />} />
          <Route path="manager/orders" element={<ManagerOrders />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
