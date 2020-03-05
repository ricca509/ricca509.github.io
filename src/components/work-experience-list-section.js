import React from "react";
import WorkExperience from "./work-experience";

const WorkExperienceListSection = ({ experienceList }) => {
  return (
    <>
      <h2>
        Experience{" "}
        <span role="img" aria-label="experience">
          💼
        </span>
      </h2>

      {experienceList.map(({ node }) => {
        return (
          <WorkExperience
            key={node.id}
            company={node.frontmatter.company}
            role={node.frontmatter.role}
            dates={`${node.frontmatter.from_date} - ${node.frontmatter.to_date}`}
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
