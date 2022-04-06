import React from "react";
import PropTypes from "prop-types";
import Header from "../header";
import Footer from "../footer";
import { container } from "./layout.module.css";

const Layout = ({ children, className, showName = false }) => {
  return (
    <div className={[container, className].join(" ")}>
      <Header showName={showName} />
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
