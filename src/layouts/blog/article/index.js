import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import Prismic from 'prismic-javascript';
import {Link, LinkResolver, RichText, Date} from 'prismic-reactjs';
import {Tweet} from 'react-twitter-widgets';
import Codepen from 'react-codepen-embed';

import {Facebook, Twitter} from 'react-feather';
import {Meta} from '../../../components/parts/index.js';

let siteUrl = 'http://localhost:3500';


const Article = ({match}) => (
  <div>
    <Content id={match.params.id} />
  </div>
);

class Content extends Component {
  constructor() {
    super();
    this.state = {
      article: null
    };
  };

  componentWillMount() {
    const apiEndpoint = 'https://prismic-react-blog.prismic.io/api/v2';
    Prismic.api(apiEndpoint).then(api => {
      api.query(
        Prismic.Predicates.at('my.blog_post.uid', this.props.id)
      ).then(response => {
        if (response) {
          this.setState({article: response.results[0]});
        }
      });
    });
  }

  render() {
    let title, item, article, content, intro, date;
    if (this.state.article) {
      item = this.state.article;
      title = item.data.title[0].text;

      let articleLink = siteUrl + item.slugs[0];
      let facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + articleLink;
      let twitterLink = 'https://twitter.com/home?status=Check%20out%20this%20awesome%20blog%20post%20at%20' + articleLink;

      let pubDate = item.first_publication_date;

      let d = Date(pubDate);
      date = d.getDate() + ' ' + d.toLocaleString("en", { month: "long"  }) + ' ' + d.getFullYear();

      let featureImage = item.data.featured_image.url;

      let meta = {
        name: title + ' | AimHigher Blog',
        description: item.data.description[0].text,
        slug: articleLink,
        image: featureImage,
      };

      intro = (
        <div className="share-icons">
          <Meta {...meta} />
          <a href={facebookLink} target="_blank" className="facebook share-link">{<Facebook />}</a>
          <a href={twitterLink} target="_blank" className="twitter share-link">{<Twitter />}</a>
        </div>
      );

      content = item.data.body;
      article = content.map((section) => {
        if (section.slice_type == 'content') {
          return(
            RichText.render(section.primary.text, LinkResolver)
          )
        }
        else if (section.slice_type == 'image') {
          if (section.primary.image_gallery == "Yes") {
            let imageLot = section.items;
            let images = imageLot.map((image) => {
              let panorama = '';
              if (image.panorama == 'Yes') {
                panorama = 'panorama';
              }
              return (
                <div className={'image-container' + panorama} key={image.image.url}>
                  <img src={image.image.url} alt={image.image.alt} />
                </div>
              );
            });

            return (
              <figure>
                {images}
              </figure>
            )
          }
          else if (section.primary.same_caption == "Yes") {
            let imageLot = section.items;
            let images = imageLot.map((image) => (
              <div className="image-container" key={image.image.url}>
                <img src={image.image.url} alt={image.image.alt} />
              </div>
            ));

            return (
              <figure>
                {images}
                <figcaption>{imageLot[0].caption[0].text}</figcaption>
              </figure>
            );
          }
          else {
            let imageLot = section.items;
            let images = imageLot.map((image) => {
              let justify = image.justify.toLowerCase();
              return (
                <figure key={image.image.url} className={justify}>
                  <div className="image-container" >
                    <img src={image.image.url} alt={image.image.alt} />
                  </div>
                  {image.caption[0] && <figcaption>{image.caption[0].text}</figcaption>}
                </figure>
              );
            });

            return (
              <Fragment>{images}</Fragment>
            );
          }
        }
        else if (section.slice_type == 'horizontal_break') {
          return (<hr />);
        }
        else if (section.slice_type == 'blockquote') {
          return (
            <blockquote>{section.primary.blockquote[0].text}</blockquote>
          );
        }
        else if (section.slice_type == 'embed') {
          if (section.primary.embed.provider_name == "Twitter") {
            let urlStart = section.primary.embed.author_url + '/status/';
            let tweetUrl = section.primary.embed.embed_url;
            let urlStartLength = urlStart.length;
            let urlLength = tweetUrl.length
            let tweetIdDraft = tweetUrl.slice(urlStartLength, urlLength);            
            let urlEnd;
            if (tweetIdDraft.indexOf('/') >= 0) {
              urlEnd = tweetUrl.length - 1;
            }
            else {
              urlEnd = tweetUrl.length;
            }
            let tweetId = tweetIdDraft.slice(0, urlEnd); 

            return (
              <Tweet tweetId={tweetId} options={{conversation: "hidden"}} />
            );
          };
        }
        else if (section.slice_type == 'code') {
          let codeSects = section.primary.code;
          let codeBlock = codeSects.map((codeSec) => (
            codeSec.text
          ));
          return (
            <div className="code">
              <pre>
                {codeBlock}
              </pre>
            </div>
          );
        }
        else if (section.slice_type == 'codepens') {
          let codeId = section.primary.codepen_id[0].text;
          let codeUser = section.primary.codepen_user[0].text;
          let defaultTab, preview;
          if (section.primary.preview == 'Yes') {
            preview = false;
          }
          else {
            preview = true;
          }
          if (section.primary.default_tab == 'HTML') {
            defaultTab = 'html'
          }
          else if (section.primary.default_tab == 'CSS') {
            defaultTab = 'css'
          }
          else if (section.primary.default_tab == 'JS') {
            defaultTab = 'js'
          }
          else if (section.primary.default_tab == 'Result') {
            defaultTab = 'result'
          }
          return (
            <Codepen hash={codeId} user={codeUser} preview={preview} defaultTab={defaultTab} />
          );
        }
      });
    };

    return (
      <article className="article content">
        <header>
          <h1>{title}</h1>
          <div className="article-intro">
            {intro}
            <h6 className="date"><time dateTime={date}>{date}</time></h6>
          </div>
        </header>
        {article}
        <a href="/" className="back end">Back to Article Feed</a>
      </article>
    );
  }
};

export default Article;