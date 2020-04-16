import React from "react";
import PropTypes from "prop-types";
import Header from "../header";
import Footer from "../footer";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
