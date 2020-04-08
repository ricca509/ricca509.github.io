import React from "react";
import Img from "gatsby-image";
import style from "./about-me.module.css";

const AboutMe = ({ children, image }) => {
  return (
    <section className={style.container}>
      <Img className={style.img} fixed={image} />
      <article
        className={style.content}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </section>
  );
};

export default AboutMe;
