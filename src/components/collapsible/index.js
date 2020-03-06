import React, { useState } from "react";

const Collapsible = ({ children, render }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const expandCollapse = e => {
    e.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {!isCollapsed && children}
      {render({ onClick: expandCollapse, isCollapsed })}
    </>
  );
};

export default Collapsible;
