import React from "react";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";
import Cta from "@Components/Cta/Cta";
import { ComponentProps } from "@Typings/component";

interface AboutMeProps extends ComponentProps {
  image: GatsbyImageProps["image"];
}

export const AboutMe: React.FC<AboutMeProps> = ({ children, image }) => {
  return (
    <section className="font-body flex flex-col items-center text-center">
      <GatsbyImage alt="Me" className="rounded-full" image={image} />
      <article    
        className="text-xl text-gray-700"
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
      <div className="mt-4">
        <Cta
          type="a"
          // @ts-ignore TODO: fix this
          target="_blank"
          rel="noopener"
          href="/riccardo-coppola-cv.pdf"
        >
          Get my CV
        </Cta>
      </div>
    </section>
  );
};

export default AboutMe;
