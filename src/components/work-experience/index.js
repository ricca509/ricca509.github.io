import React from "react";
import Collapsible from "../collapsible";
import ExpandButton from "../expand-button";
import style from "./work-experience.module.css";

const WorkExperience = ({ company, role, dates, technologies, children }) => {
  return (
    <div className={style.container}>
      <div className={style.head}>
        <h3 className={style.title}>{company}</h3>
        <p>
          <strong>{role}</strong>
        </p>
        <p className={style.dates}>
          <em>{dates}</em>
        </p>
      </div>
      <div className={style.additionalContent}>
        <Collapsible
          render={({ onClick, isCollapsed }) => (
            <div className={style.expandSection}>
              <ExpandButton
                onClick={onClick}
                isInCollapsedState={isCollapsed}
              />
            </div>
          )}
        >
          {technologies && (
            <div>
              <strong>Key Technologies used:</strong>
              <p>
                <em>{technologies.join(", ")}</em>
              </p>
            </div>
          )}
          <div
            className={style.content}
            dangerouslySetInnerHTML={{ __html: children }}
          />
        </Collapsible>
      </div>
    </div>
  );
};

export default WorkExperience;
