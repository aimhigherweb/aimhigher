import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { ExternalLink, GitHub } from 'react-feather'

//Resources
import siteList from '../data/siteList.js'
import Layout from '../components/layout'
import { Content, Head1 } from '../components/layout/style'
import { Date, Desktop, HTTPS, Folio, Frame, Mobile, Mocks, Name, Site, SiteURL, Tablet } from '../styles/portfolio'

//Importing Images
import FrameDesktop from '../img/portfolio/desktop.svg'
import FrameTablet from '../img/portfolio/tablet.svg'
import FrameMobile from '../img/portfolio/mobile.svg'

class Portfolio extends Component {
	render() {
		let data = this.props.data,
			meta = {
				name: 'Portfolio | AimHigher Web Design',
				description: "Check out other projects we've worked on",
				slug: 'portfolio',
			}

		// console.log(data.allFile.edges)

		return (
			<Layout mata={meta} wave>
				<Content>
					<Head1>Portfolio</Head1>
					<Sites siteList={siteList} data={data} />
				</Content>
			</Layout>
		)
	}
}

export const Sites = ({ data, siteList }) => {
	let images = {},
		imageData = data.allFile.edges

	console.log(imageData)

	imageData.map(image => {
		images[image.node.name] = image.node.childImageSharp.fluid
		// console.log(image.node.name)
		// console.log(image.node.childImageSharp)
	})

	// console.log(images)

	let theseSites = siteList,
		portfolio = theseSites.map(item => {
			let desktop = item.slug + '-desktop',
				tablet = item.slug + '-tablet',
				mobile = item.slug + '-mobile',
				sizeValues = {
					height: {
						desk: undefined,
						tab: undefined,
						mob: undefined,
					},
					left: {
						desk: undefined,
						tab: undefined,
						mob: undefined,
					},
					ratio: {
						desk: undefined,
						tab: undefined,
						mob: undefined,
					},
					top: {
						desk: undefined,
						tab: undefined,
						mob: undefined,
					},
					width: {
						desk: undefined,
						deskImg: undefined,
						tab: undefined,
						tabImg: undefined,
						mob: undefined,
						mobImg: undefined,
					},
				},
				initialSizes = {
					desk: 300,
					tab: 200,
					mob: 75,
					height: {
						desk: {
							full: 492,
							img: 404,
						},
						tab: {
							full: 490,
							img: 380,
						},
						mob: {
							full: 390.7,
							img: 311.8,
						},
					},
					left: {
						desk: 101.4,
						tab: 53,
						mob: 12.1,
					},
					top: {
						desk: 30.5,
						tab: 63,
						mob: 34.1,
					},
					width: {
						desk: {
							full: 852.7,
							img: 650,
						},
						tab: {
							full: 778,
							img: 672,
						},
						mob: {
							full: 200,
							img: 176.5,
						},
					},
				}

			sizeValues.ratio.desk = initialSizes.height.desk.img / initialSizes.width.desk.img
			sizeValues.width.desk = initialSizes.desk
			sizeValues.width.deskImg = initialSizes.desk * (initialSizes.width.desk.img / initialSizes.width.desk.full)
			sizeValues.height.desk = initialSizes.desk * (initialSizes.height.desk.full / initialSizes.width.desk.full)
			sizeValues.top.desk =
				(initialSizes.top.desk / initialSizes.height.desk.full) *
				initialSizes.desk *
				(initialSizes.height.desk.full / initialSizes.width.desk.full)
			sizeValues.left.desk = (initialSizes.left.desk / initialSizes.width.desk.full) * initialSizes.desk

			sizeValues.ratio.tab = initialSizes.height.tab.img / initialSizes.width.tab.img
			sizeValues.width.tab = initialSizes.tab
			sizeValues.width.tabImg = initialSizes.tab * (initialSizes.width.tab.img / initialSizes.width.tab.full)
			sizeValues.height.tab = initialSizes.tab * (initialSizes.height.tab.full / initialSizes.width.tab.full)
			sizeValues.top.tab =
				(initialSizes.top.tab / initialSizes.height.tab.full) *
				initialSizes.tab *
				(initialSizes.height.tab.full / initialSizes.width.tab.full)
			sizeValues.left.tab = (initialSizes.left.tab / initialSizes.width.tab.full) * initialSizes.tab

			sizeValues.ratio.mob = initialSizes.height.mob.img / initialSizes.width.mob.img
			sizeValues.width.mob = initialSizes.mob
			sizeValues.width.mobImg = initialSizes.mob * (initialSizes.width.mob.img / initialSizes.width.mob.full)
			sizeValues.height.mob = initialSizes.mob * (initialSizes.height.mob.full / initialSizes.width.mob.full)
			sizeValues.top.mob =
				(initialSizes.top.mob / initialSizes.height.mob.full) *
				initialSizes.mob *
				(initialSizes.height.mob.full / initialSizes.width.mob.full)
			sizeValues.left.mob = (initialSizes.left.mob / initialSizes.width.mob.full) * initialSizes.mob

			sizeValues.width.desk += 'px'
			sizeValues.width.tab += 'px'
			sizeValues.width.mob += 'px'

			sizeValues.width.deskImg += 'px'
			sizeValues.width.tabImg += 'px'
			sizeValues.width.mobImg += 'px'

			sizeValues.height.desk += 'px'
			sizeValues.height.tab += 'px'
			sizeValues.height.mob += 'px'

			sizeValues.top.desk += 'px'
			sizeValues.top.tab += 'px'
			sizeValues.top.mob += 'px'

			sizeValues.left.desk += 'px'
			sizeValues.left.tab += 'px'
			sizeValues.left.mob += 'px'

			// console.log(images[tablet])

			// if(images[desktop] == undefined) {
			// 	console.log(desktop)
			// 	console.log(images[desktop])
			// }

			// console.log(images[desktop])
			// console.log(images[mobile])
			// console.log(images[tablet])

			if (!item.hide) {
				return (
					<Site key={item.slug} sizes={sizeValues}>
						<Mocks>
							<Desktop>
								<Frame>
									<FrameDesktop />
								</Frame>
								<Img fluid={images[desktop]} alt={'Desktop screenshot of ' + item.name} />
							</Desktop>
							<Tablet>
								<Frame>
									<FrameTablet />
								</Frame>
								<Img fluid={images[tablet]} alt={'Desktop screenshot of ' + item.name} />
							</Tablet>
							{item.mobile && (
								<Mobile>
									<Frame>
										<FrameMobile />
									</Frame>
									<Img fluid={images[mobile]} alt={'Desktop screenshot of ' + item.name} />
								</Mobile>
							)}
						</Mocks>
						<Name>{item.name}</Name>
						{item.current && (
							<SiteURL>
								{item.secure && <HTTPS />}
								<a href={'http://' + item.url} target="_blank">
									{item.url}
								</a>
								{<ExternalLink />}
							</SiteURL>
						)}
						{item.github && (
							<a aria-label="Link to Github Repository" href={item.github} target="_blank" rel="nofollow">
								{<GitHub />}
							</a>
						)}
						<Date>{item.date}</Date>
					</Site>
				)
			} else {
				return
			}
		})

	return <Folio>{portfolio}</Folio>
}

export const query = graphql`
	query {
		allFile(filter: { extension: { regex: "/(png)/" }, relativeDirectory: { eq: "portfolio" } }) {
			edges {
				node {
					name
					childImageSharp {
						fluid(maxWidth: 300) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`

export default Portfolio
