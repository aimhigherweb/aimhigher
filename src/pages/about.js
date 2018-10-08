import React from 'react';

import Layout from '../components/layout';
import {Images} from '../components/parts';

import {Content, Head1} from '../components/layout/style';

import Profile from '../img/placeholders/profile.jpg';

const meta = {
    name: 'About | AimHigher Web Design',
    description: "Who are we? Where did we come from? What are we even doing here?",
    slug: 'about',
};

const images = {
    image: Profile,
    alt: 'Profile Image of Amy Kapernick, the founder of AimHigher Web Design',
    caption: 'Amy Kapernick - Founder of AimHigher Web Design',
    custom: {
        dimensions: {
            height: 'auto',
            width: '30%',
        },
        float: 'right',
    }
}

const About = () => (
    <Layout meta={meta} wave>
        <Content>
            <Head1>About</Head1>
            <Images {...images} />
            <p>
                I grew up in country Queensland and most people we
                knew had small businesses. But when I found out how
                much it cost them to get a website built, I couldn't
                believe it.
            </p>
            <p>
                AimHigher Web Design was founded to help bridge the
                gap between small businesses and technology, and
                help everyone (no matter what size your business is,
                or if you're a sole trader), get their business
                online.
            </p>
            <p>
                We specialise in helping you out with the entire
                process, starting the website, setting up social
                media, setting up emails and any of the ongoing
                support and maintenance requirements.
            </p>
            <p>
                You know your business the best, and we know the
                web. Let us help you, and leave you to focus on what
                you know best!
            </p>
        </Content>
    </Layout>
)

export default About