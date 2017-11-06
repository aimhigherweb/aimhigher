import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {ExternalLink, Github} from 'react-feather';

//Resources
import '../resources/portfolio.css';

const siteList = [
    {
        name: 'Nadine Smith Studio',
        slug: 'nadine-smith',
        url: 'nadinesmithstudio.com.au',
        date: 'June 2017',
        mobile: true,
        current: true,
        github: 'https://github.com/amykapernick/nadinesmithstudio',
    },
    {
        name: 'AimHigher Web Design',
        slug: 'aimhigher',
        url: 'aimhigherwebdesign.com.au',
        date: 'November 2017',
        mobile: true,
        current: true,
        github: 'https://github.com/AimHigher-Web-Design/aimhigher',
    },
    {
        name: 'Treasure Pics',
        slug: 'treasure-pics',
        url: 'www.treasurepics.com.au/',
        date: 'January 2015',
        mobile: false,
        current: true,
        github: false,
    },
    {
        name: 'Amy Goes to Perth',
        slug: 'amy-goes-to-perth',
        url: 'amygoestoperth.com.au/',
        date: 'October 2017',
        mobile: true,
        current: true,
        github: 'https://github.com/amykapernick/amygoestoperth',
    },
    {
        name: 'Eco Spray Tans Perth',
        slug: 'eco-spray-tans',
        url: 'www.ecospraytansperth.com.au/',
        date: 'October 2015',
        mobile: true,
        current: true,
        github: false,
    },
    {
        name: 'Glenrock Hay',
        slug: 'glenrock-hay',
        url: 'www.glenrockhay.com',
        date: 'December 2013 and December 2014',
        mobile: true,
        current: true,
        github: false,
    },  
    {
        name: 'Covisor',
        slug: 'covisor',
        url: 'www.covisor.com.au/',
        date: 'January 2015',
        mobile: true,
        current: true,
        github: false,
    },
    {
        name: 'Collards Fuel Supplies',
        slug: 'collards-fuel',
        url: 'www.collardsfuelsupplies.com.au/',
        date: 'January 2015',
        mobile: true,
        current: true,
        github: false,
    },
    {
        name: "Queensland Rural, Regional & Remote Women's Network",
        slug: 'qrrrwn',
        url: 'qrrrwn.org.au',
        date: 'February 2015',
        mobile: false,
        current: false,
        github: false,
    },
];

export class Portfolio extends Component {
    render() {
        return (
            <div>
                <h1>Portfolio</h1>
                <Sites />
            </div>
        );
    }
};

class Sites extends Component {
    render() {
        let portfolio = siteList.map(item => {
            return(
                <div key={item.slug} className={'site ' + item.slug}>
                    <div className="mockups">
                        <div className="image-container desktop">
                            <img alt={'Desktop screenshot of ' + item.name} src={'/img/portfolio/' + item.slug + '/desktop.jpg'} />
                        </div>
                        {item.mobile === true &&
                            <div className="image-container mobile">
                                <img alt={'Mobile screenshot of ' + item.name}  src={'/img/portfolio/' + item.slug + '/mobile.jpg'} />
                            </div>
                        }
                    </div>
                    <h2 className="name">
                        <Link to={'/' + item.slug}>
                            {item.name}
                        </Link>
                    </h2>
                    {item.current === true &&
                        <a href={'http://' + item.url} target="_blank">
                            <h3 className="url">{item.url} {<ExternalLink />}</h3>
                        </a>
                    }
                    {item.github != false &&
                        <a href={item.github} className="repo" target="_blank">
                            {<Github />}
                        </a>
                    }
                    <h3 className="date">{item.date}</h3>
                </div>
            )
        });

        return (
            <div className="portfolio content">
                {portfolio}
            </div>
        );
    };
};