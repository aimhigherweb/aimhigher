import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

import {ChevronRight, ChevronDown} from 'react-feather';

//Resources
import '../resources/faq.css';

const accordion = [
    {
        title: 'What is a domain or a domain name?',
        slug: 'domain-name',
        content: 
            <div>
                <p>A domain name is the key part of your web address that visitors use to access your site - <span className="link">www.yourdomainhere.com</span> or <span className="link">www.yourdomainhere.com.au</span>.</p>      
                <p>Your domain name is also what is used when creating a related email address - <span className="link">john@yourdomainhere.com</span> or <span className="link">admin@yourdomainhere.com.au</span></p>
            </div>,
    },
    {
        title: 'What is Search Engine Optimisation (SEO)',
        slug: 'seo',
        content: 
            <div>
                <p>Search Engine Optimation (SEO) affects whether or not you come up for a particular Google search and how far up the page you are. SEO refers to this happening "organically", by "earning" your position in the results rather than using services such as Google AdWords to appear near the top.</p>
                <p>In general, the higher up the page you are, the more visitors you will receive to your site (when is the last time you clicked on a link on the second page of Google). </p>
            </div>,
    },
    {
        title: "I want to manage the site myself, but I'm not great with technology",
        slug: 'management',
        content: 
            <div>
                <p>The platform we host our sites on is simple and easy to use. It's designed so that anyone can edit or change the content on their site themselves.</p>
                <p>If you get stuck or need help (or don't want to manage the site yourself), we also offer differing levels of website management from support only to full website management.</p>
            </div>,
    },
    {
        title: 'How long does it take to get a website up and running',
        slug: 'time-frame',
        content: <p>This depends on the complexity of your site and how much you have to start with. On average, time to launch is between a week and a month.
        </p>,
    },
    {
        title: 'How much will it cost? And do I have to pay that upfront?',
        slug: 'pricing',
        content: 
            <div>
                <p>This depends on a number of factors including the complexity of the website, the features you want, what level of support or management you would like.</p>
                <p>Prices start at around $500 (including the first 2 months of ongoing costs) with monthly ongoing costs starting at $20 (billed monthly/bimonthly/quarterly).</p>
                <p>We also know how hard it is to come up with a large amount upfront. We require a small deposit upfront and the rest will be billed just before the site goes live (depending on the size of the project. If you'd prefer, we can also arrange for a regular payment plan instead of a lump sum.</p>
                <p><a href="/contact">Contact Us</a> for a quote today.</p>
            </div>,
    },
    {
        title: 'Can you design a logo for me?',
        slug: 'design',
        content: 
            <div>
                <p>Unfortunately this is not a service we currently offer. We are currently looking to expand our service offerings to include this in the near future.</p>
                <p>We can however recommend several excellent freelance designers who can help you out instead.</p>
            </div>,
    },
    {
        title: 'I want to open an online store, can you help me?',
        slug: 'ecommerce',
        content: <p>Yes, we can!. We build online stores that can accept a variety of payment methods such as PayPal, Direct Deposit and Credit Card. We can also integrate anywhere else you're selling things, such as Etsy.</p>,
    },
    {
        title: "I know what I want on my website, but I'm not great with words",
        slug: 'content',
        content: <p>One of the services we offer is content research, writing and editing. We have a professional writer who will research similar websites and write high quality content for your site. Alternatively, they can just edit and expand on any existing content that you may already have.</p>,
    },
    {
        title: 'Can I get an email with my domain name?',
        slug: 'email-hosting',
        content:
            <div>
                <p>Yes.</p>
                <p>We currently offer a variety of email hosting options through both GSuite (which includes multiple email addresses and 30GB of Google Drive storage) and Office365 (which includes multiple email addresses, access to Office Online apps and Office365 desktop programs).</p>
                <p>We also offer email hosting separately to our website design and hosting packages for those who want an email address but not a website (or aren't ready for a website yet).</p>
            </div>,
    },
    {
        title: "I get an email with my internet and I don't want to have to change it",
        slug: 'email-isp',
        content:
            <div>
                <p>With the launch of NBN and NBN Satellite, a lot of business customers are switching internet service providers (ISPs) and finding that they now have to change their email address (eg. from <span className="link">businessname@bigpond.com</span> to <span className="link">businessname@skymesh.com</span>). Most of the ISPs will tell you that they can let you keep your email even if you switch to another provider (for a fee).</p>
                <p>With internet constantly changing within Australia, more and more companies will come into the market and for a more competitive price than existing companies. Most people will find themselves switching providers every few years as something more affordable or better becomes available elsewhere. All providers will offer an email with your account, but by keeping your main email separate from your ISP, it makes the changeover process much simpler.</p>
            </div>,
    },
];

class Meta extends Component {
    render() {
        let name = 'FAQ | AimHigher Web Design';
        let description ="Have questions? We've already answered some of them for you.";
        let slug = 'faq';
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

export class Faq extends Component {
    render() {
        return (
            <div className="content">
                <Meta />
                <h1>FAQ</h1>
                <Accordion />
            </div>
        );
    }
};

class Accordion extends Component {
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
        let children = accordion.map(child => {
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