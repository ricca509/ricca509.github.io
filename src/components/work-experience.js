import React from "react";
import { MDXTag } from "@mdx-js/tag";
import { MDXRenderer } from "gatsby-plugin-mdx";
import styles from "./work-experience.module.css";

const WorkExperience = ({
  company,
  role,
  dates,
  description,
  technologiesArray,
}) => {
  return (
    <div className={styles.container}>
      <h3>{company}</h3>
      <p>
        <strong>{role}</strong>
      </p>
      <p>
        <em>{dates}</em>
      </p>
      <MDXRenderer scope={{ React, MDXTag }}>{description}</MDXRenderer>
      {technologiesArray && (
        <div>
          <strong>Key Technologies used:</strong>
          <p>{technologiesArray.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
