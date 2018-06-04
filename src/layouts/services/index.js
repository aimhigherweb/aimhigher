import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import ReactSVG from 'react-svg';

//Resources
import services from '../../data/services.js';

//Importing Images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const images = importAll(require.context('../../img/products/', false, /\.(jpg)$/));

const placeholders = importAll(require.context('../../img/products/', false, /\.(svg)$/));

class Meta extends Component {
    render() { 
        let name = 'Products | AimHigher Web Design';
        let description ="See our service offerings";
        let slug = 'services';
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

class ProductsServices extends Component {
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
                    Check out some of the <a href="/portfolio">websites we've built</a>, and <a href="contact">contact us</a> if we can help you enhance your businesses.
                </p>
                <Products />
            </div>
        );
    }
};
class Products extends Component {
    render() {
        let products = services.map(product => {
            let thisImage = product.slug + ".jpg";
            let thisPlaceholder = product.slug + ".svg";
            return(
                <div key={product.slug} className="product">
                    <div className="image-container">
                        <img alt={'Product image for ' + product.name}  src={images[thisImage]} />
                        <ReactSVG path={placeholders[thisPlaceholder]} />
                    </div>
                    <h3 className="name">{product.name}</h3>
                    {product.price !== '' &&
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
    }
}
export default ProductsServices;