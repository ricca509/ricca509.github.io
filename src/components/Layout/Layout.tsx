import React from "react";
import PropTypes from "prop-types";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { container } from "./Layout.module.css";
import { ComponentProps } from "@Typings/component";
import { PageProps } from "gatsby";

interface LayoutProps extends ComponentProps {
  showName?: boolean;
  location?: PageProps["location"];
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  showName = false,
}) => {
  return (
    <div className={["ml-3 mr-3 text-base md:m-auto md:max-w-2xl lg:max-w-4xl", className].join(" ")}>
      <Header showName={showName} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
