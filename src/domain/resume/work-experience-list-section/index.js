import React from "react";
import WorkExperience from "./work-experience";
import SectionTitle from "../../../components/section-title";

const WorkExperienceListSection = ({ experienceList }) => {
  return (
    <>
      <SectionTitle>Experience</SectionTitle>
      {experienceList.map(({ node }) => {
        return (
          <WorkExperience
            key={node.id}
            company={node.frontmatter.company}
            role={node.frontmatter.role}
            fromDate={node.frontmatter.from_date}
            toDate={node.frontmatter.to_date}
            technologies={node.frontmatter.technologies}
          >
            {node.html}
          </WorkExperience>
        );
      })}
    </>
  );
};

export default WorkExperienceListSection;
