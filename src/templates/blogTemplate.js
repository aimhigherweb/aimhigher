import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import {Content, Head1} from '../components/layout/style'
import {Article, ArticleIntro, Date, ShareIcons} from '../styles/article';

import {Facebook, Twitter} from 'react-feather';

export const BlogPostTemplate = ({content, title, slug, tags, publishDate, updateDate, siteUrl}) => {
    let articleLink = siteUrl + 'blog' + slug,
        facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + articleLink,
        twitterLink = 'https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20' + articleLink;

    const intro = (
        <ShareIcons>
            <a href={facebookLink} target="_blank" className="facebook share-link">{<Facebook />}</a>
            <a href={twitterLink} target="_blank" className="twitter share-link">{<Twitter />}</a>
        </ShareIcons>
    );

    return (
        <Article>
            <header>
                <Head1>{title}</Head1>
                <ArticleIntro>
                    {intro}
                    <Date dateTime={updateDate}>{updateDate}</Date>
                </ArticleIntro>
            </header>
            <main dangerouslySetInnerHTML={{__html: content}}></main>
            <Link to="/" className="back end">Back to Article Feed</Link>
        </Article>
    )
}

BlogPostTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    description: PropTypes.string,
    title: PropTypes.string,
}

const BlogPost = ({ data }) => {
    const { markdownRemark: post } = data

    const blogPost = {
        content: post.html,
        title: post.frontmatter.title,
        slug: post.fields.slug,
        publishDate: post.frontmatter.publishDate,
        updateDate: post.frontmatter.updateDate,
        tags: post.frontmatter.tags,
        siteUrl: data.site.siteMetadata.siteUrl
    }

    const meta = {
        name: post.frontmatter.title + ' | ' + data.site.siteMetadata.title,
        description: post.frontmatter.description,
        slug: data.site.siteMetadata.siteUrl + post.fields.slug,
    };

    return (
        <Layout meta={meta} wave>
            <Content>
                <BlogPostTemplate {...blogPost} />
            </Content>
        </Layout>
    )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
    query BlogPostByID($id: String!) {
        site {
            siteMetadata {
                title
                siteUrl
            }
        }
        markdownRemark(id: { eq: $id }) {
            id
            fields {
                slug
            }
            html
            frontmatter {
                publishDate(formatString: "DD MMM YYYY")
                updateDate(formatString: "DD MMM YYYY")
                title
                description
                tags
            }
        }
    }
`
