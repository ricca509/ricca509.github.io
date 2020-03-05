import React from "react";
import styles from "./work-experience.module.css";

const WorkExperience = ({
  company,
  role,
  dates,
  description,
  technologies,
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
      <div dangerouslySetInnerHTML={{ __html: description }} />
      {technologies && (
        <div>
          <strong>Key Technologies used:</strong>
          <p>{technologies.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
