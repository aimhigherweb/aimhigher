import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

//Resources
import '../resources/products.css';

const services = [
    {
        name: 'Website Development',
        slug: 'web-dev',
        description: 'We specialise in creating custom websites for you and your business. We work with each client individually to find and build the best solution for your needs.',
        price: '',
    },
    {
        name: 'Email Hosting',
        slug: 'email',
        description: 'Get a custom email for your business (me@mybusiness.com.au). Hosting is provided through either Google G Suite or Microsoft Office 365 and includes online storage. Need Microsoft Office as well? We can bundle it in.',
        price: '$6/month',
    },
    {
        name: 'Ongoing Support and Maintenance',
        slug: 'aftersale',
        description: "Websites shouldn't just be 'set and forget'. We're always there for any questions that you have (except if it's 3am). We also offer customised maintenance plans to help manage your website, so you don't have to.",
        price: '$15/month',
    },
    {
        name: 'Website Hosting',
        slug: 'web-host',
        description: "We can help you get your website online (and stay there). Don't worry about the technical aspects, let us do that for you.",
        price: '$6/month',
    },
    {
        name: 'Content Writing and Editing',
        slug: 'content',
        description: 'Having trouble stringing your website content together or just need someone to look over it? We can help read over your content, or research and write your website content for you.',
        price: '',
    },
    {
        name: 'Search Engine Optimisation',
        slug: 'seo',
        description: 'Search Engine Optimisation (SEO) helps you to appear in Google search results. Let us help you with your top-level SEO needs.',
        price: '',
    },
    {
        name: 'Google Analytics',
        slug: 'analytics',
        description: 'Want to know how your website is doing? We can provide custom event tracking for your website, generate regular customised reports and make recommendations.',
        price: '',
    },
    {
        name: 'HTTPS & SSL',
        slug: 'https',
        description: "Security is important. We can upgrade your website to be served over HTTPS (the 's' stands for secure).",
        price: '',
    },
];

class Meta extends Component {
    render() {
        let name = 'Products | AimHigher Web Design';
        let description ="See our service offerings";
        let slug = 'products-services';
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

export class ProductsServices extends Component {
    render() {
        return (
            <div className="content">
                <Meta />
                <h1>Products & Services</h1>
                <p>
                    AimHigher Web Design can enhance your business with modern and professional web development at competitive prices. We specialise in building sites for small- to medium-sized businesses to large networks throughout Australia.
                </p>
                <p>
                    We look after everything from communicating with you to assess your website needs to web development to domain registration.
                </p>
                <p>
                    AimHigher Web Design also offers courteous and efficient after-sales service on all websites to help you manage your content management system (or CMS) as well as any technical issues.
                </p>
                <p>
                    Check out some of the websites we have built, and contact us if we can help you enhance your businesses.
                </p>
                <Products />
            </div>
        );
    }
};

class Products extends Component {
    render() {
        let products = services.map(product => {
            return(
                <div key={product.slug} className="product">
                    <div className="image-container">
                        <img alt={'Product image for ' + product.name}  src={'/img/products/' + product.slug + '.jpg'} />
                    </div>
                    <h3 className="name">{product.name}</h3>
                    {product.price != '' &&
                        <h4 className="price">Starting at {product.price}</h4>
                    }
                    <p className="description">{product.description}</p>
                </div>
            );
        });

        return(
            <div className="products">
                {products}
            </div>
        );
    };
}