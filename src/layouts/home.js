import React, { Component } from 'react';
import {Helmet} from 'react-helmet'

//Resources
import '../resources/home.css';
import {ChevronsDown} from 'react-feather';


export class Home extends Component {
    render() {
        return (
            <section className="parallax home">
                <Helmet>
                    <title>AimHigher Web Design</title>
                    <meta name="description" content="AimHigher Web Design bridges the gap between technology and business throughout Australia." />
                    <link rel="canonical" href="https://aimhigherwebdesign.com.au" />

                    {/* Facebook */}
                    <meta property="og:url" content="https://aimhigherwebdesign.com.au" />
                    
                    <meta property="og:title" content="AimHigher Web Design" />
                    <meta property="og:image" content="https://aimhigherwebdesign.com.au/img/logo.png" />
                    <meta property="og:description" content="AimHigher Web Design bridges the gap between technology and business throughout Australia." />

                    {/* Twitter */}
                    <meta name="twitter:url" content='https://aimhigherwebdesign.com.au' />
                    <meta name="twitter:title" content="AimHigher Web Design" />
                    <meta name="twitter:description" content="AimHigher Web Design bridges the gap between technology and business throughout Australia." />
                    <meta name="twitter:image" content="https://aimhigherwebdesign.com.au/img/logo.png" />
                </Helmet>
                <div className="bcg slide-1 intro">
                </div>
                <div className="container slide-1 intro">
                    <div className="scroll">
                        <a href="#slide-1-content">
                            <ChevronsDown />
                        </a>
                    </div>
                    <div id="slide-1-content" className="content link-content">
                        <p>AimHigher Web Design is based in Perth and specialises in designing modern and professional websites that can be easily maintained by anyone, regardless of their technical skill. We also provide a full website management service.</p>
                        <p>AimHigher Web Design bridges the gap between technology and business throughout Australia. We are experts in search engine optimisation (SEO)—in other words, the little tricks that get your business to the top of internet searches.</p>
                        <p>We also provide prompt and efficient after-sales technical support to keep your website working for you, while you get on with business.</p>
                    </div>
                </div>
            </section>
        );
    }
};

