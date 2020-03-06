import React from "react";
import Img from "gatsby-image";
import style from "./about-me.module.css";

const AboutMe = ({ children, image }) => {
  return (
    <div className={style.container}>
      <Img
        imgStyle={{
          borderRadius: "50%",
        }}
        fixed={image}
      />
      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </div>
  );
};

export default AboutMe;
