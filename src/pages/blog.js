import React from "react"
import { Link } from "gatsby"
import { useBlogPosts } from "../hooks/useBlogPosts"
import { Section, Container, Column, Title, Generic } from "rbx"
import { IconSelector } from "../components/IconSelector"
import { StyledCard } from "../components/StyledCard"
import SEOComponent from "../components/SEOComponent"

const Blog = () => {
  const posts = useBlogPosts()

  return (
    <>
      <SEOComponent title="Blog" />
      <Section className="navbar-margin">
        <Container>
          <Title as="h1">
            <IconSelector icon="chevright" /> All posts
          </Title>
          <Column.Group multiline centered>
            {posts.map(({ id, excerpt, frontmatter, fields }) => (
              <Column size="one-third-desktop half-tablet" key={id}>
                <Link to={`/blog${fields.slug}`}>
                  <StyledCard className="card-equal-height">
                    <StyledCard.Header>
                      <StyledCard.Header.Title align="centered">
                        <Title as="h2" size={4}>
                          {frontmatter.title}
                        </Title>
                      </StyledCard.Header.Title>
                    </StyledCard.Header>
                    <StyledCard.Content>
                      <Title as="p" subtitle size={5}>
                        {excerpt}
                      </Title>
                    </StyledCard.Content>
                    <StyledCard.Footer
                      as="footer"
                      className="card-equal-height card-footer"
                    >
                      <StyledCard.Footer.Item as="p">
                        {!!frontmatter.tags
                          ? frontmatter.tags.map(tag => {
                              return (
                                <Generic
                                  as="span"
                                  tooltip={tag}
                                  tooltipColor="black"
                                  textColor="primary"
                                  key={tag}
                                >
                                  <IconSelector
                                    icon={tag}
                                    style={{ margin: "0.5em" }}
                                  />
                                </Generic>
                              )
                            })
                          : null}
                      </StyledCard.Footer.Item>
                    </StyledCard.Footer>
                  </StyledCard>
                </Link>
              </Column>
            ))}
          </Column.Group>
        </Container>
      </Section>
    </>
  )
}

export default Blog