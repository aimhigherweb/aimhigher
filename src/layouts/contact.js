import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

//Resources
import '../resources/contact.css';

class Meta extends Component {
    render() {
        let name = 'Contact Us | AimHigher Web Design';
        let description ="Get in touch with us today and find out how we can help you";
        let slug = 'contact';
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

export class Contact extends Component {
    render() {        
        return (
            <div className="content">
                <Meta />
                <blockquote>We'd love the chance to work with you and your website. Send us a few details and someone will be in touch to help you</blockquote>
                <div className="full">
                    <div className="typeform-widget" data-url="https://aimhigherwebdesign.typeform.com/to/LeTkEc" data-transparency="100" data-hide-headers={true} style={{width: '100%', height: '500px'}} > </div> <script> {(function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() }</script>
                </div>
            </div>
        );
    }
};