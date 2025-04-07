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
		Reflections on thoughtful engineering, focused work, and the systems that shape our work, life, and learning.
    </div>
  );
};

export default Bio;
