import React from "react";
import Collapsible from "./";

export default { title: "Collapsible" };

export const defaultBeahviour = () => (
  <Collapsible
    renderTrigger={({ onClick, isCollapsed }) => {
      return (
        <button onClick={onClick}>{isCollapsed ? "expand" : "collapse"}</button>
      );
    }}
  >
    Hello...
  </Collapsible>
);
