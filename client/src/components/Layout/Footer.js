import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css"
const Footer = () => {
  return (
    <div className="footer my-1 mb-0 mx-0 ">
      <h5 className="text-center">
        All Right Reserved &copy; JOHRI'S</h5>
      <p className="text-center mt-1 pt-1">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
