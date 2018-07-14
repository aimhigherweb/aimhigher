import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ReactSVG from 'react-svg';

import { ExternalLink, Github } from 'react-feather';

//Resources
import siteList from '../../data/siteList.js';
import {Meta} from '../../components/parts/index.js';
import {Content} from '../../global.js';
import {Desktop, Folio, Image, Mobile, Mocks, Site, Tablet} from './style.js';

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
		mobile = item.slug + '-mobile.png';
		console.log(values);
		return (
			<Site key={item.slug} className={'site ' + item.slug}>
				<Mocks>
					<Desktop values={values}>
						<ReactSVG path={FrameDesktop} />
						<img alt={'Desktop screenshot of ' + item.name} src={screenshots[desktop]} />
					</Desktop>
					<Tablet values={values}>
						<ReactSVG path={FrameTablet} />
						<img alt={'Tablet screenshot of ' + item.name} src={screenshots[tablet]} />
					</Tablet>
					{item.mobile && (
						<Mobile values={values}>
							<ReactSVG path={FrameMobile} />
							<img alt={'Mobile screenshot of ' + item.name} src={screenshots[mobile]} />
						</Mobile>
					)}
				</Mocks>
				<h2 className="name">
					{/* <Link to={'/' + item.slug}> */}
					{item.name}
					{/* </Link> */}
				</h2>
				{item.current && (
					<a href={'http://' + item.url} target="_blank">
						<h3 className="url">
							{item.url} {<ExternalLink />}
						</h3>
					</a>
				)}
				{item.github && (
					<a
						aria-label="Link to Github Repository"
						href={item.github}
						className="repo"
						target="_blank"
					>
						{<Github />}
					</a>
				)}
				<h3 className="date">{item.date}</h3>
			</Site>
		);
	});

	return <Folio>{portfolio}</Folio>;
}

export default Portfolio;

let values = {
    //Change these to change sizes of images (in pixels)
    desk: 300,
    tab: 200,
    mob: 75,
    height: {
        desk: {
            main: undefined,
            full: 492,
            img: {
                main: undefined,
                full: 404
            }
        },
        tab: {
            main: undefined,
            full: 490,
            img: {
                main: undefined,
                full: 380,
            }
        },
        mob: {
            main: undefined,
            full: 390.7,
            img: {
                main: undefined,
                full: 311.8,
            }
        }
    },
    left: {
        desk: {
            main: undefined,
            full: 101.4,
        },
        tab: {
            main: undefined,
            full: 53,
        },
        mob: {
            main: undefined,
            full: 12.1,
        }        
    },
    ratio: {
        desk: {
            main: undefined,
            img: undefined,
            diff: undefined,
        },
        tab: {
            main: undefined,
            img: undefined,
            diff: undefined,
        },
        mob: {
            main: undefined,
            img: undefined,
            diff: undefined,
        },
    },
    top: {
        desk: {
            main: undefined,
            full: 30.5,
        },
        tab: {
            main: undefined,
            full: 63,
        },
        mob: {
            main: undefined,
            full: 34.1
        }
    },
    width: {
        desk: {
            main: undefined,
            full: 852.7,
            img: {
                main: undefined,
                full: 650
            }
        },
        tab: {
            main: undefined,
            full: 778,
            img: {
                main: undefined,
                full: 672,
            }
        },
        mob: {
            main: undefined,
            full: 200,
            img: {
                main: undefined,
                full: 176.5,
            }
        }
    },
}

values.ratio.desk.main = Object.assign(x => values.height.desk.full / values.width.desk.full);
values.ratio.desk.img = Object.assign(x => values.height.desk.img.full / values.width.desk.img.full);
values.ratio.desk.diff = Object.assign(x => values.width.desk.img.full / values.width.desk.full);

values.width.desk.img = Object.assign(x => values.desk * values.ratio.desk.diff);
values.height.desk.main = Object.assign(x => values.desk * values.ratio.desk.main);

values.top.desk.main = Object.assign(x => values.top.desk.full / values.height.desk.full * values.desk * values.ratio.desk.main);
values.left.desk.main = Object.assign(x => values.left.desk.full / values.width.desk.full * values.desk);

values.ratio.tab.main = Object.assign(x => values.height.tab.full / values.width.tab.full);
values.ratio.tab.img = Object.assign(x => values.height.tab.img.full / values.width.tab.img.full);
values.ratio.tab.diff = Object.assign(x => values.width.tab.img.full / values.width.tab.full);

values.width.tab.img = Object.assign(x => values.tab * values.ratio.tab.diff);
values.height.tab.main = Object.assign(x => values.tab * values.ratio.tab.main);

values.top.tab.main = Object.assign(x => values.top.tab.full / values.height.tab.full * values.tab * values.ratio.tab.main);

values.left.tab.main = Object.assign(x => values.left.tab.full / values.width.tab.full * values.width.tab);

values.ratio.mob.main = Object.assign(x => values.height.mob.full / values.width.mob.full);
values.ratio.mob.img = Object.assign(x => values.height.mob.img.full / values.width.mob.img.full);
values.ratio.mob.diff = Object.assign(x => values.width.mob.img.full / values.width.mob.full);

values.width.mob.img.main = Object.assign(x => values.mob * values.ratio.mob.diff);
values.height.mob.main = Object.assign(x => values.mob * values.ratio.mob.main);

values.top.mob.main = Object.assign(x => values.top.mob.full / values.height.mob.full * values.mob * values.ratio.mob.main);
values.left.mob.main = Object.assign(x => values.left.mob.full / values.width.mob.full * values.mob);