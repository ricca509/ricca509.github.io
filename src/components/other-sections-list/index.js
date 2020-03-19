import React from "react";
import GenericSection from "../generic-section";

const OtherSectionsList = ({ sectionList }) => {
  return sectionList.map(({ node }) => {
    return (
      <GenericSection key={node.id} title={node.frontmatter.title}>
        {node.html}
      </GenericSection>
    );
  });
};

export default OtherSectionsList;
