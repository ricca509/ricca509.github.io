import React from "react";
import { GenericSection } from "@Components/GenericSection/GenericSection";
import { ComponentProps } from "@Typings/component";
import { ProfileQuery } from "../../../../graphql-types";

interface OtherSectionsListProps extends ComponentProps {
  sectionList: ProfileQuery["otherSections"]["edges"];
}

export const OtherSectionsList: React.FC<OtherSectionsListProps> = ({
  sectionList,
}) => {
  return (
    <React.Fragment>
      {sectionList.map(({ node }) => {
        return (
          <GenericSection key={node.id} title={node?.frontmatter?.title || ""}>
            {node.html}
          </GenericSection>
        );
      })}
    </React.Fragment>
  );
};

export default OtherSectionsList;
