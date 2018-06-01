import React from 'react';
import Helmet from 'react-helmet';

//Resources
import Favicon from '../../img/favicon.png';

class Meta extends React.Component {
    render() {
        return (
            <Helmet>
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="shortcut icon" href={Favicon} />
                <link rel="icon" sizes="192x192" href={Favicon} />
                <link rel="apple-touch-icon" href={Favicon} />
                <meta name="theme-color" content="#1C75BC" />
                <link rel="mask-icon" href={Favicon} color="#1C75BC" />
            </Helmet>
        );
    }
};
  

export class Header extends React.Component {
    render() {        
        return (
          <div className="inner">
            <Meta />
            <SiteTitle />
          </div>
        );
    };
};

class SiteTitle extends React.Component {
    render() {
        return(
            <div id="site-header" className="site-header">
                <a href="/">
                    <h1 className="site-title">My Blog</h1>
                </a>       
            </div>
        );
    };
};
