/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { container } from "./bio.module.css";

const Bio = () => {
  return (
    <div className={container}>
      My notes on web development, life, learning and the world.
    </div>
  );
};

export default Bio;
