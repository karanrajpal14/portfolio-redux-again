import React from "react"
import { Layout } from "../components/Layout"
import { graphql, Link } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { Container, Title, Divider, Button, Icon, Column, Section } from "rbx"
import SEOComponent from "../components/SEOComponent"
import { IconSelector } from "src/components/IconSelector"

const BlogPostTemplate = ({ data, pageContext }) => {
  const { image, siteUrl } = useSiteMetadata()
  const { frontmatter, body, fields, excerpt } = data.mdx
  const { title, date, cover } = frontmatter
  const { previous, next } = pageContext
  return (
    <Layout>
      <SEOComponent
        title={title}
        description={excerpt}
        image={
          cover === null ? `${siteUrl}${image}` : `${siteUrl}${cover.publicURL}`
        }
        article={true}
        publishedDate={date}
        modifiedDate={new Date(Date.now()).toISOString()}
      />
      <Section id="top">
        <Container>
          <Title>{frontmatter.title}</Title>
          <Title subtitle size={5}>
            {frontmatter.date}
          </Title>
          {/* {!!frontmatter.cover ? (
            <Image.Container size={512}>
              <Img sizes={frontmatter.cover.childImageSharp.sizes} />
            </Image.Container>
          ) : null} */}
          <Divider />
          <MDXRenderer>{body}</MDXRenderer>
          <Divider />
          <Column.Group multiline centered>
            <Column narrow>
              {previous === false ? null : (
                <React.Fragment>
                  {previous && (
                    <Button as={Link} to={`/blog${previous.fields.slug}`}>
                      <Icon size="small">
                        <IconSelector icon="chevleft" />
                      </Icon>
                      <Title size={6}>{previous.frontmatter.title}</Title>
                    </Button>
                  )}
                </React.Fragment>
              )}
            </Column>

            <Column narrow>
              <Button as={AnchorLink} to={`/blog${fields.slug}/#top`}>
                Scroll to top
              </Button>
            </Column>

            <Column narrow>
              {next === false ? null : (
                <React.Fragment>
                  {next && (
                    <Button as={Link} to={`/blog${next.fields.slug}`}>
                      <Icon size="small">
                        <IconSelector icon="chevright" />
                      </Icon>
                      <Title size={6}>{next.frontmatter.title}</Title>
                    </Button>
                  )}
                </React.Fragment>
              )}
            </Column>
          </Column.Group>
        </Container>
      </Section>
    </Layout>
  )
}

export default BlogPostTemplate

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
        cover {
          publicURL
          childImageSharp {
            fluid(maxWidth: 2000, traceSVG: { color: "#639" }) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      body
      excerpt
      fields {
        slug
      }
    }
  }
`
