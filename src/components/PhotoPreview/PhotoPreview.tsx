import { Link } from 'gatsby';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import { container, title } from './PhotoPreview.module.css';
export interface PhotoPreviewProps {
  slug: string;
  title: string;
  imagePreview: any
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({ 
  slug,
  title,
  imagePreview
 }) => {
  const image = getImage(imagePreview);

  return (
    <li key={slug} className={container}>
      <Link to={slug || "/photography"} itemProp="url">
        <GatsbyImage image={image} alt={title || slug} />      
        <span className={title} itemProp="headline">{title}</span>
      </Link>      
    </li>
  );
};