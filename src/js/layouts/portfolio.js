import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

import {ExternalLink, Github} from 'react-feather';

//Resources
import '../../scss/layouts/portfolio.scss';
import siteList from '../data/siteList.js';

class Meta extends Component {
    render() {
        let name = 'Portfolio | AimHigher Web Design';
        let description ="Check out other projects we've worked on";
        let slug = 'portfolio';
        let image = 'https://aimhigherwebdesign.com.au/img/logo.png';
        return (
            <Helmet>
                <title>{name}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={'https://aimhigherwebdesign.com.au/' + slug} />

                {/* Facebook */}
                <meta property="og:url" content={'https://aimhigherwebdesign.com.au/' + slug} />
                
                <meta property="og:title" content={name} />
                <meta property="og:image" content={image} />
                <meta property="og:description" content={description} />

                {/* Twitter */}
                <meta name="twitter:url" content={'https://aimhigherwebdesign.com.au/' + slug} />
                <meta name="twitter:title" content={name} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
            </Helmet>
        );
    }
};

export class Portfolio extends Component {
    render() {
        return (
            <div>
                <Meta />
                <h1>Portfolio</h1>
                <Sites />
            </div>
        );
    }
};

class Sites extends Component {
    render() {
        let portfolio = siteList.map(item => {
            return(
                <div key={item.slug} className={'site ' + item.slug}>
                    <div className="mockups">
                        <div className="image-container desktop">
                            <img alt={'Desktop screenshot of ' + item.name} src={'/img/portfolio/' + item.slug + '/desktop.jpg'} />
                        </div>
                        {item.mobile === true &&
                            <div className="image-container mobile">
                                <img alt={'Mobile screenshot of ' + item.name}  src={'/img/portfolio/' + item.slug + '/mobile.jpg'} />
                            </div>
                        }
                    </div>
                    <h2 className="name">
                        {/* <Link to={'/' + item.slug}> */}
                            {item.name}
                        {/* </Link> */}
                    </h2>
                    {item.current === true &&
                        <a href={'http://' + item.url} target="_blank">
                            <h3 className="url">{item.url} {<ExternalLink />}</h3>
                        </a>
                    }
                    {item.github !== false &&
                        <a href={item.github} className="repo" target="_blank">
                            {<Github />}
                        </a>
                    }
                    <h3 className="date">{item.date}</h3>
                </div>
            )
        });

        return (
            <div className="portfolio content">
                {portfolio}
            </div>
        );
    };
};