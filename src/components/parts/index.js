import React, {Component} from 'react';
import Helmet from 'react-helmet';

import Logo from '../../img/logo.png';
import {ChevronRight, ChevronDown} from 'react-feather';
import {FigCaption} from '../../global.js';
import {Image, ImageContainer, Placeholder, AccordionItem, AccordionTitle, AccordionContent} from './style.js';


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

export const Accordion = ({items}) => {
    let accordion = items,
        children = accordion.map(child => {
        return(
            <AccordionItem key={child.slug} id={child.slug}>
                <AccordionTitle href={'faq#' + child.slug}>
                    <ChevronRight className="close" />
                    <ChevronDown className="open" />
                    {child.title}
                </AccordionTitle>
                <AccordionContent>{child.content}</AccordionContent>
            </AccordionItem>
        );
    });
    return (
        <div>
            {children}
        </div>
    );
};

export const Images = ({image, placeholder, alt, caption, custom}) => {
    return (
        <ImageContainer custom={custom}>
            <Image src={image} alt={alt} />
            <FigCaption>{caption}</FigCaption>
        </ImageContainer>
    );
}