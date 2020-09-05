import React from "react";
import Collapsible from "../../../../components/collapsible";
import ExpandButton from "../../../../components/expand-button";
import style from "./work-experience.module.css";

const WorkExperience = ({
  company,
  role,
  fromDate,
  toDate = "present",
  technologies,
  children,
}) => {
  const workExperienceContent = (
    <>
      {technologies && (
        <div>
          <strong>Key tools used:</strong>
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
          <em>{`${fromDate} - ${toDate}`}</em>
        </p>
      </header>
      <div className={style.printContent}>{workExperienceContent}</div>
      <div className={style.screenContent}>
        <Collapsible
          renderTrigger={({ onClick, isCollapsed }) => (
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
