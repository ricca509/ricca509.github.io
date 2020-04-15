import React, { useState } from "react";

const Collapsible = ({ children, renderTrigger }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const expandCollapse = e => {
    e.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {!isCollapsed && children}
      {renderTrigger({ onClick: expandCollapse, isCollapsed })}
    </>
  );
};

export default Collapsible;
