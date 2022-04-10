import React from "react";
import SectionTitle from "@Components/SectionTitle/SectionTitle";
import { ComponentProps } from "@Typings/component";

interface GenericSectionProps extends ComponentProps {
  title: string;
}

export const GenericSection: React.FC<GenericSectionProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <div dangerouslySetInnerHTML={{ __html: children as string }} />
    </>
  );
};

export default GenericSection;
