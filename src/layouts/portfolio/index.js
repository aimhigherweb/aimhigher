import React, { Component } from 'react';
import { Helmet } from 'react-helmet';


import { ExternalLink, Github } from 'react-feather';

//Resources
import siteList from '../../data/siteList.js';
import {Meta} from '../../components/parts/index.js';
import {Content} from '../../global.js';
import {Date, Desktop, HTTPS, Folio, Frame, Mobile, Mocks, Name, Site, SiteURL, Tablet} from './style.js';

//Importing Images
import FrameDesktop from '../../img/portfolio/desktop.svg';
import FrameTablet from '../../img/portfolio/tablet.svg';
import FrameMobile from '../../img/portfolio/mobile.svg';

//Importing Images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const screenshots = importAll(require.context('../../img/portfolio/', false, /\.(png)$/));

const meta = {
	name: 'Portfolio | AimHigher Web Design',
	description: "Check out other projects we've worked on",
	slug: 'portfolio',
};

class Portfolio extends Component {
	render() {
		return (
			<Content>
				<Meta {...meta} />
				<h1>Portfolio</h1>
				<Sites siteList={siteList} />
			</Content>
		);
	}
}

const Sites = (siteList) => {
	let theseSites = siteList.siteList,
		portfolio = theseSites.map((item) => {
		let desktop = item.slug + '-desktop.png',
		tablet = item.slug + '-tablet.png',
        mobile = item.slug + '-mobile.png',
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
            }
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
                }
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
                }
            },
        };

            sizeValues.ratio.desk = initialSizes.height.desk.img / initialSizes.width.desk.img;
            sizeValues.width.desk = initialSizes.desk;
            sizeValues.width.deskImg = initialSizes.desk * (initialSizes.width.desk.img / initialSizes.width.desk.full);
            sizeValues.height.desk = initialSizes.desk * (initialSizes.height.desk.full / initialSizes.width.desk.full);
            sizeValues.top.desk = initialSizes.top.desk / initialSizes.height.desk.full * initialSizes.desk * (initialSizes.height.desk.full / initialSizes.width.desk.full);
            sizeValues.left.desk = initialSizes.left.desk / initialSizes.width.desk.full * initialSizes.desk;

            sizeValues.ratio.tab = initialSizes.height.tab.img / initialSizes.width.tab.img;
            sizeValues.width.tab = initialSizes.tab;
            sizeValues.width.tabImg = initialSizes.tab * (initialSizes.width.tab.img / initialSizes.width.tab.full);
            sizeValues.height.tab = initialSizes.tab * (initialSizes.height.tab.full / initialSizes.width.tab.full);
            sizeValues.top.tab = initialSizes.top.tab / initialSizes.height.tab.full * initialSizes.tab * (initialSizes.height.tab.full / initialSizes.width.tab.full);
            sizeValues.left.tab = initialSizes.left.tab / initialSizes.width.tab.full * initialSizes.tab;

            sizeValues.ratio.mob = initialSizes.height.mob.img / initialSizes.width.mob.img;
            sizeValues.width.mob = initialSizes.mob;
            sizeValues.width.mobImg = initialSizes.mob * (initialSizes.width.mob.img / initialSizes.width.mob.full);
            sizeValues.height.mob = initialSizes.mob * (initialSizes.height.mob.full / initialSizes.width.mob.full);
            sizeValues.top.mob = initialSizes.top.mob / initialSizes.height.mob.full * initialSizes.mob * (initialSizes.height.mob.full / initialSizes.width.mob.full);
            sizeValues.left.mob = initialSizes.left.mob / initialSizes.width.mob.full * initialSizes.mob;

            sizeValues.width.desk += 'px';
            sizeValues.width.tab += 'px';
            sizeValues.width.mob += 'px';

            sizeValues.width.deskImg += 'px';
            sizeValues.width.tabImg += 'px';
            sizeValues.width.mobImg += 'px';

            sizeValues.height.desk += 'px';
            sizeValues.height.tab += 'px';
            sizeValues.height.mob += 'px';

            sizeValues.top.desk += 'px';
            sizeValues.top.tab += 'px';
            sizeValues.top.mob += 'px';

            sizeValues.left.desk += 'px';
            sizeValues.left.tab += 'px';
            sizeValues.left.mob += 'px';

		return (
			<Site key={item.slug} sizes={sizeValues}>
				<Mocks>
					<Desktop>
						<Frame path={FrameDesktop} />
						<img alt={'Desktop screenshot of ' + item.name} src={screenshots[desktop]} />
					</Desktop>
					<Tablet>
						<Frame path={FrameTablet} />
						<img alt={'Tablet screenshot of ' + item.name} src={screenshots[tablet]} />
					</Tablet>
					{item.mobile && (
						<Mobile>
							<Frame path={FrameMobile} />
							<img alt={'Mobile screenshot of ' + item.name} src={screenshots[mobile]} />
						</Mobile>
					)}
				</Mocks>
				<Name>
					{/* <Link to={'/' + item.slug}> */}
					{item.name}
					{/* </Link> */}
				</Name>
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
					<a aria-label="Link to Github Repository" href={item.github}target="_blank" rel="nofollow">
						{<Github />}
					</a>
				)}
				<Date>{item.date}</Date>
			</Site>
		);
	});

	return <Folio>{portfolio}</Folio>;
}

export default Portfolio;