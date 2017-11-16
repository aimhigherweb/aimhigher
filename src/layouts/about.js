import React, { Component } from 'react';
import Media from 'react-media';

//Resources
import '../resources/about.css';

export class About extends Component {
    render() {
        return (
            <div className="content">
                <h1>About</h1>
                <div className="wrap">
                    <div>
                        <p>
                            I grew up in country Queensland and most people we knew had small businesses. But when I found out how much it cost them to get a website built, I couldn't believe it.
                        </p>
                        <p>
                            AimHigher Web Design was founded to help bridge the gap between small businesses and technology, and help everyone (no matter what size your business is, or if you're a sole trader), get their business online.
                        </p>
                        <p>
                            We specialise in helping you out with the entire process, starting the website, setting up social media, setting up emails and any of the ongoing support and maintenance requirements.
                        </p>
                        <p>
                            You know your business the best, and we know the web. Let us help you, and leave you to focus on what you know best!
                        </p>
                    </div>
                    <div className="image-container">
                        <figure>
                            <Media query="(max-width: 735px)" render={() => (
                                <img alt="Amy Kapernick - Founder of AimHigher Web Design" src="/img/profile_320.jpg" />
                            )}/>
                              <Media query="(min-width: 736px)" render={() => (
                                <img alt="Amy Kapernick - Founder of AimHigher Web Design" src="/img/profile_180.jpg" />
                            )}/>
                            <figcaption>Amy Kapernick - Founder of AimHigher Web Design</figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        );
    }
};