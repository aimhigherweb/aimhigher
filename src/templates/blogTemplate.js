import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import {Tweet} from 'react-twitter-widgets';

import '../scss/layouts/article.scss';
import {Facebook, Twitter} from 'react-feather';
import AmyKate from '../img/amykate.jpg';
import AimHigher from '../img/aimhigher.png';
import Freelance from '../img/freelancers.png';

const profiles = {
    'amykate': {
        'title': 'Amy Goes to Perth',
        'id': 'amykate',
        'image': AmyKate,
        'url': ''
    },
    'AimHigher': {
        'title': 'AimHigher Web Design',
        'id': 'aimhigher',
        'image': AimHigher,
        'url': 'https://aimhigherwebdesign.com.au'
    },
    'Freelance': {
        'title': "Freelancer's Guide",
        'id': 'freelance',
        'image': Freelance,
        'url': 'https://thefreelance.guide/'
    },
};

export const BlogPostTemplate = ({content, title, slug, tags, publishDate, updateDate, siteUrl}) => {
    let articleLink = siteUrl + slug,
        facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + articleLink,
        twitterLink = 'https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20' + articleLink,
        author;

    Object.entries(profiles).forEach(([key, value]) => {
        if(tags.indexOf(profiles[`${key}`]['id']) > -1) {
            author = profiles[`${key}`];
        }
    });

    if(!author) {
        author = profiles['amykate']
    }

    const intro = (
        <div className="share-icons">
            <a href={facebookLink} target="_blank" className="facebook share-link">{<Facebook />}</a>
            <a href={twitterLink} target="_blank" className="twitter share-link">{<Twitter />}</a>
            <div className="author">
                { author.url !== '' ?
                    <a href={author.url + slug} target="_blank" rel="nofollow" title={"Link to host blog, " + author.title}>
                        <img alt="Profile Image" src={author.image} />
                    </a>
                :
                    <img alt="Profile Image" src={author.image} />
                }
            </div>
        </div>
    );

    return (
        <article className="article content">
            <header>
                <h1>{title}</h1>
                <div className="article-intro">
                    {intro}
                    <h6 className="date"><time dateTime={updateDate}>{updateDate}</time></h6>
                </div>
            </header>
            <main dangerouslySetInnerHTML={{__html: content}}></main>
            <Link to="/" className="back end">Back to Article Feed</Link>
        </article>
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
        <Layout meta={meta}>
            <BlogPostTemplate {...blogPost} />
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
