import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PhotographyIndexQuery } from "../../graphql-types";
import { PhotoPreview } from '../components/PhotoPreview/PhotoPreview';
import Bio from "../components/Bio";
import { Layout } from "../components/Layout/Layout";
import { Seo } from "../components/Seo/Seo";
import { list } from './photography.module.css'

const PhotographyIndex: React.FC<PageProps<PhotographyIndexQuery>> = ({
  data,
  location,
}) => {
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
      <ul className={list}>
        {photos.map((photo) => {
          return <PhotoPreview
            imagePreview={photo?.frontmatter?.photo}
            slug={photo.fields?.slug!}
            title={photo?.frontmatter?.title!}
          />;
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
      filter: {
        fields: { slug: { glob: "**/photography/*" } }
        frontmatter: { publication_status: { eq: "published" } }
      }
      sort: { fields: [frontmatter___date], order: ASC }
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
              gatsbyImageData(
                width: 300
                height: 300
                aspectRatio: 1
                transformOptions: { fit: COVER }
                placeholder: BLURRED
              )
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
