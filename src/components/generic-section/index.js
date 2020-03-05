import React from "react";

const GenericSection = ({ title, children }) => {
  return (
    <>
      <h2>{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: children }} />
    </>
  );
};

export default GenericSection;
