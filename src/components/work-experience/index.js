import React from "react";
import Collapsible from "../collapsible";
import ExpandButton from "../expand-button";
import style from "./work-experience.module.css";

const WorkExperience = ({ company, role, dates, technologies, children }) => {
  return (
    <div className={style.container}>
      <h3>{company}</h3>
      <p>
        <strong>{role}</strong>
      </p>
      <p>
        <em>{dates}</em>
      </p>
      {technologies && (
        <div>
          <strong>Key Technologies used:</strong>
          <p>
            <em>{technologies.join(", ")}</em>
          </p>
        </div>
      )}
      <Collapsible
        render={({ onClick, isCollapsed }) => (
          <ExpandButton onClick={onClick} isInCollapsedState={isCollapsed} />
        )}
      >
        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      </Collapsible>
    </div>
  );
};

export default WorkExperience;
