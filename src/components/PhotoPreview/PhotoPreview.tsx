import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import { container } from './PhotoPreview.module.css';
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
      <GatsbyImage image={image} alt={title || slug} />
      <label style={{
        display: 'block'
      }}>{title}</label>
    </li>
  );
};