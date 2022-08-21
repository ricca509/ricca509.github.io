import * as React from "react";
import { graphql, PageProps } from "gatsby";

import { Layout } from "@Components/Layout/Layout";
import { Seo } from "@Components/Seo/Seo";
import { PhotoPostBySlugQuery } from "../../graphql-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { container, date, title } from './PhotoPost.module.css';

const PhotoPostTemplate: React.FC<PageProps<PhotoPostBySlugQuery>> = ({
  data,
  location,
}: any) => {
  const photo = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const image = getImage(photo.frontmatter.photo);

  return (
    <Layout
      showName
      location={location}
      title={siteTitle}
      className={container}
    >
      <Seo
        title={photo.frontmatter.title}
        description={photo.frontmatter.description || photo.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="https://schema.org/Photograph"
      >
        <header>
          <h1 className={title} itemProp="headline">
            {photo.frontmatter.title}
          </h1>
          {/* <p className={date}>{photo.frontmatter.date}</p> */}
        </header>
        <section itemProp="articleBody" style={{
          textAlign: 'center'
        }}>
          <GatsbyImage image={image} alt={photo.frontmatter.title || photo.fields.slug} style={{
            boxShadow: '1px 1px 8px 0px #666'
            // border: '25px solid black'
          }} />      

          <div style={{
            textAlign: 'left'
          }} dangerouslySetInnerHTML={{ __html: photo.html }} />
        </section>
        {/* <hr />
        <footer>
          <Bio />
        </footer> */}
      </article>      
    </Layout>
  );
};

export default PhotoPostTemplate;

export const pageQuery = graphql`
  query PhotoPostBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        publication_status        
        photo {
          childImageSharp {
            gatsbyImageData(
              width: 700                          
              placeholder: BLURRED
              quality: 50
            )
          }
        }
      }
      fields {
        slug
      }
    }  
  }
`;
