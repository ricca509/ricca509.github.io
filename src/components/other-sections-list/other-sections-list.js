import React from "react";
import GenericSection from "../generic-section/generic-section";

const OtherSectionsList = ({ sectionList }) => {
  return sectionList.map(({ node }) => {
    return (
      <GenericSection title={node.frontmatter.title}>
        {node.html}
      </GenericSection>
    );
  });
};

export default OtherSectionsList;
