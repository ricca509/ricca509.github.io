import React from "react";
import { Collapsible } from "@Components/Collapsible/Collapsible";
import { ExpandButton } from "@Components/ExpandButton/ExpandButton";
import * as style from "./WorkExperience.module.css";
import { ComponentProps } from "@Typings/component";

interface WorkExperienceProps extends ComponentProps {
  company?: string | null;
  location?: string | null;
  role?: string | null;
  fromDate?: any | null;
  toDate?: any | null;
  technologies?: Array<string | null> | null;
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({
  company,
  role,
  fromDate,
  toDate,
  technologies,
  children,
}) => {
  const workExperienceContent = (
    <React.Fragment>
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
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
    </React.Fragment>
  );

  return (
    <article className={style.container}>
      <header className={style.head}>
        <h3 className={style.title}>{company}</h3>
        <p>
          <strong>{role}</strong>
        </p>
        <p className={style.dates}>
          <em>{`${fromDate} - ${toDate || "present"}`}</em>
        </p>
      </header>
      <div className={style.printContent}>{workExperienceContent}</div>
      <div className={style.screenContent}>
        <Collapsible
          // @ts-ignore TODO: fix this
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
