import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {ExternalLink} from 'react-feather';

//Resources
import '../resources/portfolio.css';

const siteList = [
    {
        name: 'AimHigher Web Design',
        slug: 'aimhigher',
        url: 'https://aimhigherwebdesign.com.au',
        date: 'November 2017',
    },
    {
        name: 'AimHigher Web Design',
        slug: 'aimhigher2',
        url: 'https://aimhigherwebdesign.com.au',
        date: 'November 2017',
    },
    {
        name: 'AimHigher Web Design',
        slug: 'aimhigher3',
        url: 'https://aimhigherwebdesign.com.au',
        date: 'November 2017',
    },
    {
        name: 'AimHigher Web Design',
        slug: 'aimhigher4',
        url: 'https://aimhigherwebdesign.com.au',
        date: 'November 2017',
    },
    {
        name: 'AimHigher Web Design',
        slug: 'aimhigher5',
        url: 'https://aimhigherwebdesign.com.au',
        date: 'November 2017',
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
                        <div className="image-container mobile">
                            <img alt={'Mobile screenshot of ' + item.name}  src={'/img/portfolio/' + item.slug + '/mobile.jpg'} />
                        </div>
                    </div>
                    <h2 className="name">
                        <Link to={'/' + item.slug}>
                            {item.name}
                        </Link>
                    </h2>
                    <a href={item.url} target="_blank">
                        <h3 className="url">{item.url} {<ExternalLink />}</h3>
                    </a>
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