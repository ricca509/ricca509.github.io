import React from "react";
import Img from "gatsby-image";
import Cta from "../../../components/cta";
import style from "./about-me.module.css";

const AboutMe = ({ children, image }) => {
  return (
    <section className={style.container}>
      <Img className={style.img} fixed={image} />
      <article
        className={style.content}
        dangerouslySetInnerHTML={{ __html: children }}
      />
      <div className={style.getCv}>
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
