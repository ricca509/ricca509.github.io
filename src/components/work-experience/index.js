import React from "react";
import Collapsible from "../collapsible";
import ExpandButton from "../expand-button";
import style from "./work-experience.module.css";

const WorkExperience = ({ company, role, dates, technologies, children }) => {
  const workExperienceContent = (
    <>
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
    </>
  );

  return (
    <article className={style.container}>
      <header className={style.head}>
        <h3 className={style.title}>{company}</h3>
        <p>
          <strong>{role}</strong>
        </p>
        <p className={style.dates}>
          <em>{dates}</em>
        </p>
      </header>
      <div className={style.printContent}>{workExperienceContent}</div>
      <div className={style.screenContent}>
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
          {workExperienceContent}
        </Collapsible>
      </div>
    </article>
  );
};

export default WorkExperience;
