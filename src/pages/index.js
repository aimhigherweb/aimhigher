import React, { Component } from 'react'

import Layout from '../components/layout'

//Resources
import Graphic from '../img/graphic.svg'
import ComputerCoffee from '../img/computer_coffee.svg'
import Design from '../img/design.svg'
import MultipleHands from '../img/multiple_computers.svg'
import { ContentSVG, Hero, HeroContent, HomeContent, HomeGraphic } from '../styles/index.js'

const meta = {
	name: 'AimHigher Web Design',
	description: 'AimHigher Web Design bridges the gap between technology and business throughout Australia.',
	slug: '',
}

export default class IndexPage extends Component {
	render() {
		return (
			<Layout meta={meta} wave>
				<Hero>
					<HeroContent>
						<HomeGraphic>
							<Graphic />
						</HomeGraphic>
						<blockquote>Bridging the gap between businesses and technology</blockquote>
					</HeroContent>
				</Hero>
				<HomeContent>
					<p>AimHigher Web Design is based in Perth and helps businesses all over Australia in developing an online presence.</p>
					<ContentSVG>
						<ComputerCoffee />
					</ContentSVG>
					<ContentSVG>
						<Design />
					</ContentSVG>
					<p>
						We specialise in building modern and professional websites that can be easily maintained by anyone, regardless of their
						technical skill.
					</p>
					<p>
						AimHigher Web Design also provide prompt and efficient Aftersale support to keep your website working for you, while you get
						on with business.
					</p>
					<ContentSVG>
						<MultipleHands />
					</ContentSVG>
				</HomeContent>
			</Layout>
		)
	}
}
