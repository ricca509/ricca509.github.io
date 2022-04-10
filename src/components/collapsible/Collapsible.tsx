import React, { useState } from "react";
import { ComponentProps} from "@Typings/component";

interface CollapsibleProps extends ComponentProps {
  renderTrigger: (props: { onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; isCollapsed: boolean }) => React.ReactNode;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ children, renderTrigger }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const expandCollapse = (e: React.MouseEvent) => {
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
