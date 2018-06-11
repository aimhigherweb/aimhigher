import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

//Components
import {Meta} from '../../components/parts/index.js';

//Resources
import Graphic from '../../img/graphic.svg';
import {Hero, HomeContent, HomeGraphic} from './style.js';

const meta = {
	name: 'AimHigher Web Design',
	description: 'AimHigher Web Design bridges the gap between technology and business throughout Australia.',
	slug: '',
};

class Home extends Component {
	render() {
		return (
			<Fragment>
                <Meta {...meta} />
                <Hero>
                    <HomeGraphic path={Graphic} />
                    <blockquote>
                        Bridging the Gap Between Technology and Businesses
                    </blockquote>
                </Hero>
				<HomeContent>
                    <p>
                        AimHigher Web Design is based in Perth and specialises in designing modern and professional websites that can be easily maintained by anyone, regardless of their technical skill. We also provide a full website management service.
                    </p>
                    <p>
                        AimHigher Web Design bridges the gap between technology and business throughout Australia. We are experts in search engine optimisation (SEO)—in other words, the little tricks that get your business to the top of internet searches.
                    </p>
                    <p>
                        We also provide prompt and efficient after-sales technical support to keep your website working for you, while you get on with business.
                    </p>
                </HomeContent>
            </Fragment>
		);
	}
}

export default Home;
