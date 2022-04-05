import React from "react";
import PropTypes from "prop-types";
import Header from "../header";
import Footer from "../footer";
import { container } from "./layout.module.css";

const Layout = ({ children, className }) => {
  return (
    <div className={[container, className].join(" ")}>
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
