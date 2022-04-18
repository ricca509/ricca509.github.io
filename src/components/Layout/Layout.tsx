import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
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
    <div className={["container mx-auto px-5 max-w-4xl text-base", className].join(" ")}>
      <Header showName={showName} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
