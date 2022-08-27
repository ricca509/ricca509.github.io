import type { GatsbyConfig } from "gatsby";
import path from "path";

const siteUrl = process.env.URL || "https://www.riccardocoppola.me";
const name = "Riccardo Coppola";
const description = "Notes on programming, life, learning and the world";

const config: GatsbyConfig = {
  siteMetadata: {
    title: name,
    description,
    author: {
      name: name,
      summary: `I help companies to create better web applications. 

      Certified Level 3 Personal trainer, nutrition geek, trained barista and (very) amateur photographer.`,
    },
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-tsconfig-paths`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          blogPages: allMarkdownRemark(
            filter: {fields: {slug: {glob: "**/blog/*"}}, frontmatter: {publication_status: {eq: "published"}}}
            sort: {fields: [frontmatter___date], order: ASC}
            limit: 1000
          ) {
            nodes {
              frontmatter {
                date
              }
              fields {
                slug
              }
            }
          }
          aboutMePages: allMarkdownRemark(
            filter: {fields: {slug: {glob: "**/resume/*"}}}
          ) {
            nodes {              
              fields {
                slug
              }
            }
          }
          photographsPages: allMarkdownRemark(
            filter: {fields: {slug: {glob: "**/photographs/*"}}}
          ) {
            nodes {
              frontmatter {
                date
              }
              fields {
                slug
              }
            }
          }
        }               
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          blogPages: { nodes: blogPages },
          aboutMePages: { nodes: aboutMePages },
          photographsPages: { nodes: photographsPages },
        }) => {
          const pages = [...blogPages, ...aboutMePages, ...photographsPages].reduce((acc, node) => {
            const { fields } = node;
            acc[fields.slug] = node;

            return acc;
          }, {});

          const res = allPages
            // .filter((page) => {
            //   return Object.keys(pages).includes(page.path)
            // })
            .map((page) => {
              return { ...page, ...pages[page.path] };
            });

          // console.log(JSON.stringify(res), 'ressss')

          return res;
        },
        serialize: ({ path, ...rest }) => {
          const page = JSON.parse(JSON.stringify(rest));
          return {
            url: path,
            lastmod: page?.frontmatter?.date || new Date().toISOString(),
          };
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(`content`),
        name: `markdown`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(`src/images`),
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
              showCaptions: ["title"],
              markdownCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg height="20" width="20" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"/></svg>`,
            },
          },
          `gatsby-remark-embed-video`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-XM12P224W8", // Google Analytics / GA
        ],
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, blog } }: any) => {
              return blog.nodes.map((node: any) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [
                    node.frontmatter?.featured_image?.publicURL && {
                      "media:content": {
                        _attr: {
                          url: site.siteMetadata.siteUrl + node.frontmatter?.featured_image?.publicURL
                        }
                      }
                    },
                    { "content:encoded": node.html }
                  ],
                });
              });
            },
            query: `
              {
                blog: allMarkdownRemark(
                  filter: {fields: {slug: {glob: "**/blog/*"}}, frontmatter: {publication_status: {eq: "published"}}},
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      featured_image {
                        publicURL
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: `${description} - ${name}`
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name,
        short_name: description,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/finiteloop-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-preload-fonts`,
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-graphql-codegen`,
  ],
};

export default config;
