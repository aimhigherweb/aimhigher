import React from 'react';

//Resources
import services from '../data/services';
import Layout from '../components/layout';
import { Content, Head1 } from '../components/layout/style';
import { Product, ServicesList } from '../styles/services';

const meta = {
	name: 'Products | AimHigher Web Design',
	description: 'See our service offerings',
	slug: 'services',
};

const ProductsServices = () => {
	return (
		<Layout meta={meta} wave>
			<Content>
				<Head1>Products & Services</Head1>
				<p>
					AimHigher Web Design can enhance your business with modern
					and professional web development at competitive prices. We
					specialise in building sites for small- to medium-sized
					businesses to large networks throughout Australia.
				</p>
				<p>
					We look after everything from communicating with you to
					assess your website needs to web development to domain
					registration.
				</p>
				<p>
					AimHigher Web Design also offers courteous and efficient
					after-sales service on all websites to help you manage your
					content management system (or CMS) as well as any technical
					issues.
				</p>
				<p>
					Check out some of the{' '}
					<a href="/portfolio">websites we've built</a>, and{' '}
					<a href="contact">contact us</a> if we can help you enhance
					your businesses.
				</p>
				<Products services={services} />
			</Content>
		</Layout>
	);
};

const Products = ({ services }) => {
	let products = services.map((product) => {
		console.log(product.graphic);
		return (
			<Product key={product.slug}>
				{product.graphic}
				<h3 className="name">{product.name}</h3>
				{product.price && (
					<h4 className="price">Starting at {product.price}</h4>
				)}
				<p className="description">{product.description}</p>
			</Product>
		);
	});
	return <ServicesList>{products}</ServicesList>;
};

export default ProductsServices;
