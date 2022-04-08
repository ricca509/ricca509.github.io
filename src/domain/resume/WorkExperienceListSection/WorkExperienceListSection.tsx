import React from "react";
import { WorkExperience } from "./WorkExperience/WorkExperience";
import { SectionTitle } from "@Components/SectionTitle/SectionTitle";
import { ComponentProps } from "@Typings/component";
import { ProfileQuery } from "../../../../graphql-types";

interface WorkExperienceListSectionProps extends ComponentProps {
  experienceList: ProfileQuery["experience"]["edges"];
}

export const WorkExperienceListSection: React.FC<
  WorkExperienceListSectionProps
> = ({ experienceList }) => {
  return (
    <>
      <SectionTitle>Experience</SectionTitle>
      {experienceList.map(({ node }) => {
        return (
          <WorkExperience
            key={node.id}
            company={node?.frontmatter?.company}
            role={node?.frontmatter?.role}
            fromDate={node?.frontmatter?.from_date}
            toDate={node?.frontmatter?.to_date}
            technologies={node?.frontmatter?.technologies}
          >
            {node.html}
          </WorkExperience>
        );
      })}
    </>
  );
};

export default WorkExperienceListSection;
