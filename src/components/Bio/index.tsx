/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { container } from "./Bio.module.css";

const Bio = () => {
  return (
    <div className={container}>
      Notes on web development, life, learning and the world.
    </div>
  );
};

export default Bio;
