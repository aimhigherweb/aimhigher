import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import ReactSVG from 'react-svg';

//Resources
import services from '../../data/services.js';
import {Meta} from '../../components/parts/index.js';
import {Content} from '../../global.js';
import {Product, ServicesList} from './style.js';

//Importing Images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const graphics = importAll(require.context('../../img/products/', false, /\.(svg)$/));

const meta = {
    name: 'Products | AimHigher Web Design',
    description: "See our service offerings",
    slug: 'services',
};

const ProductsServices = () => {
    return (
        <Content>
            <Meta {...meta} />
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
                Check out some of the <a href="/portfolio">websites we've built</a>, and <a href="contact">contact us</a> if we can help you enhance your businesses.
            </p>
            <Products services={services} />
        </Content>
    );
};

const Products = ({services}) => {
    let products = services.map(product => {
        let thisImage = product.slug + ".svg";
        return(
            <Product key={product.slug}>
                <ReactSVG path={graphics[thisImage]} />
                <h3 className="name">{product.name}</h3>
                {product.price !== '' &&
                    <h4 className="price">Starting at {product.price}</h4>
                }
                <p className="description">{product.description}</p>
            </Product>
        );
    });
    return(
        <ServicesList>
            {products}
        </ServicesList>
    );
}


export default ProductsServices;