import React from "react";
import ExpandButton from "./";

export default { title: "ExpandButton" };

export const collapsed = () => (
  <ExpandButton onClick={() => {}} isInCollapsedState={true}></ExpandButton>
);

export const expanded = () => (
  <ExpandButton onClick={() => {}} isInCollapsedState={false}></ExpandButton>
);
