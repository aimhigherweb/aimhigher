import React from 'react';
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout';

import {Content, Head1} from '../components/layout/style';
import {Facebook, Twitter} from 'react-feather';



export default class Blog extends React.Component {
    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark

        const meta = {
            name: 'Blog | AimHigher Web Design',
            description: "Information and general musings of the staff at AimHigher Web Design about building websites",
            slug: 'blog',
        };

        return (
            <Layout meta={meta} wave>
                <Content>
                    <Head1>Blog</Head1>
                    <div className="article-feed">
                    {posts.map(({node: post}) => {
                        let articleLink = meta.slug + post.fields.slug,
                            facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + articleLink,
                            twitterLink = 'https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20' + articleLink;

                        return (
                            <article id={post.id} key={post.id} className="feed-article">
                                <div className="image-feature">
                                    <img src={post.frontmatter.featuredImage} />
                                </div>
                                <header>
                                    <h2 className="article-title">
                                        <Link id={post.id} to={`/${post.fields.slug}`}>
                                            {post.frontmatter.title}
                                        </Link>
                                    </h2>
                                    <h6 className="date">{post.frontmatter.publishDate}</h6>
                                </header>
                                <div className="excerpt">{post.excerpt}</div>
                                <div className="share-icons">
                                    <a href={facebookLink} target="_blank" className="facebook share-link">{<Facebook />}</a>
                                    <a href={twitterLink} target="_blank" className="twitter share-link">{<Twitter />}</a>
                                </div>
                            </article>
                        )
                    })}
                </div>
                </Content>
            </Layout>
        )
    }
}

Blog.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}
  
export const pageQuery = graphql`
    query blogQuery {
        site {
            siteMetadata {
                title
                description
                siteUrl
            }
        }
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___updateDate] }
        ) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 400)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        publishDate(formatString: "DD MMM YYYY")
                        tags,
                        featuredImage
                    }
                }
            }
        }
    }
  `
  