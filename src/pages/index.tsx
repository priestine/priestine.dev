import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/layout'
import { BlogPostsQuery } from '../../graphql-types'
import { BlogPost } from '../models/blog-post'
import Seo from '../components/seo'
import { PostList } from '../components/post-list'

interface IIndexPageProps {
  data: BlogPostsQuery
}

const IndexPage: FC<IIndexPageProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map((edge) => BlogPost(edge.node))

  return (
    <>
      <Seo />
      <Layout>
        <PostList posts={posts} title="||l Blog" />
      </Layout>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query BlogPosts {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/" }, frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
  }
`
