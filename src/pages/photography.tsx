import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PhotographyIndexQuery } from "../../graphql-types";

import Bio from "../components/Bio";
import { Layout } from "../components/Layout/Layout";
import { Seo } from "../components/Seo/Seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Photo = ({ photo }) => {
  const image = getImage(photo?.frontmatter?.photo);
  const title = photo?.frontmatter?.title || photo?.fields?.slug;

  return (
    <li key={photo.fields.slug}>
      <GatsbyImage image={image} alt={title} />
      <label>{title}</label>
    </li>
  );
}

const PhotographyIndex: React.FC<PageProps<PhotographyIndexQuery>> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title || `Photography`;
  const photos = data.photos.nodes;

  if (photos.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Blog" />
        <Bio />
        <p>Oops, No photos found!</p>
      </Layout>
    );
  }

  return (
    <Layout showName location={location} title={siteTitle}>
      <Seo title="Photography" />
      <ul>
        {photos.map((photo) => {
          return <Photo photo={photo} />;
        })}
      </ul>
    </Layout>
  );
};

export default PhotographyIndex;

export const pageQuery = graphql`
  query PhotographyIndex {
    site {
      siteMetadata {
        title
      }
    }
    photos: allMarkdownRemark(
      filter: {fields: {slug: {glob: "**/photography/*"}}, frontmatter: {publication_status: {eq: "published"}}}
      sort: {fields: [frontmatter___date], order: ASC}
      limit: 1000
    ) {
      nodes {
        frontmatter {
          title
          date
          description
          publication_status
          photo {
            childImageSharp {
              gatsbyImageData(width: 800)
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`;
