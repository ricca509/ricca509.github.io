import { Link } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import { container, title as titleStyles } from "./PhotoPreview.module.css";
export interface PhotoPreviewProps {
  slug: string;
  title: string;
  imagePreview: any;
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({
  slug,
  title,
  imagePreview,
}) => {
  const image = getImage(imagePreview);

  return (
    <li key={slug} className={container}>
      <Link to={slug || "/photographs"} itemProp="url">
        <GatsbyImage image={image} alt={title || slug} />
      </Link>
      <Link to={slug || "/photographs"} itemProp="url">
        <span className={titleStyles} itemProp="headline">
          {title}
        </span>
      </Link>
    </li>
  );
};
