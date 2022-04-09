import React from "react";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";
import Cta from "@Components/Cta/Cta";
import { container, img, content, getCv } from "./AboutMe.module.css";
import { ComponentProps } from "@Typings/component";

interface AboutMeProps extends ComponentProps {
  image: GatsbyImageProps["image"];
}

export const AboutMe: React.FC<AboutMeProps> = ({ children, image }) => {
  return (
    <section className={container}>
      <GatsbyImage alt="Me" className={img} image={image} />
      <article
        className={content}
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
      <div className={getCv}>
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
