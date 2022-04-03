import React from "react";
import { GatsbyImage } from "gatsby-plugin-image"
import Cta from "../../../components/cta";
import { container, img, content, getCv } from "./about-me.module.css";

const AboutMe = ({ children, image }) => {
  return (
    <section className={container}>
      <GatsbyImage alt="Me" className={img} image={image} />
      <article
        className={content}
        dangerouslySetInnerHTML={{ __html: children }}
      />
      <div className={getCv}>
        <Cta
          type={Cta.types.link}
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
