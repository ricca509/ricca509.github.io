import React from "react";
import SectionTitle from "../section-title";

const GenericSection = ({ title, children }) => {
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </>
  );
};

export default GenericSection;
