import React, {Component} from 'react';

import {ChevronRight, ChevronDown} from 'react-feather';
import {FigCaption} from '../layout/style';
import {Image, ImageContainer, Placeholder, AccordionItem, AccordionTitle, AccordionContent} from './style.js';

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