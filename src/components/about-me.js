import React from "react";
import Img from "gatsby-image";
import style from "./about-me.module.css";

const AboutMe = ({ body, image }) => {
  return (
    <div className={style.container}>
      <Img
        imgStyle={{
          borderRadius: "50%",
        }}
        fixed={image}
      />
      <p dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default AboutMe;
