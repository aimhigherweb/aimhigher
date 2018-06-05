import React, {Component} from 'react';
import Helmet from 'react-helmet';

import Logo from '../../img/logo.png';
import {ChevronRight, ChevronDown} from 'react-feather';


export const Meta = ({name, description, slug, image}) => {
    let siteUrl = 'https://aimhigherweb.design/';

    if (!image) {
        image = Logo;
    }
 
    return (
        <Helmet>
            <title>{name}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={siteUrl + slug} />

            {/* Facebook */}
            <meta property="og:url" content={siteUrl + slug} />
            
            <meta property="og:title" content={name} />
            <meta property="og:image" content={image} />
            <meta property="og:description" content={description} />

            {/* Twitter */}
            <meta name="twitter:url" content={siteUrl + slug} />
            <meta name="twitter:title" content={name} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export class Accordion extends Component {
    collapse(accordionItem) {
        if(document.getElementById(accordionItem).classList.contains('active')) {
            document.getElementById(accordionItem).classList.remove('active');
        }
        else {
            let current = document.getElementsByClassName('active');
            while (current[0]) {
                current[0].classList.remove('active');
            };
            document.getElementById(accordionItem).classList.add('active');
        };
    };
    render() {
        let accordion = this.props.items,
            children = accordion.map(child => {
            return(
                <div key={child.slug} id={child.slug} className="section" onClick={this.collapse.bind(this, child.slug)}>
                    <h3 className="title">
                        <span className="closed"><ChevronRight /></span>
                        <span className="open"><ChevronDown /></span>
                        {child.title}
                    </h3>
                    <div className="content">{child.content}</div>
                </div>
            );
        });
        return (
            <div className="accordion">
                {children}
            </div>
        );
    };
};