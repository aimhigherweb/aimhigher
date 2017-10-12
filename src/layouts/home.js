import React, { Component } from 'react';

//Resources
import '../resources/home.css';
import {ChevronsDown} from 'react-feather';


export class Home extends Component {
    render() {
        window.onscroll = function() {
            const perHeight = window.innerHeight * 0.3;
            if(document.documentElement.scrollTop > perHeight) {
                document.getElementById('main').className = 'scrolled';
            }
            else {
                document.getElementById('main').classList.remove('scrolled');
            };
        };

        return (
            <section className="parallax home">
                <div className="bcg slide-1 intro">
                </div>
                <div className="container slide-1 intro">
                    <div className="scroll">
                        <a href="#slide-1-content">
                            <ChevronsDown />
                        </a>
                    </div>
                    <div id="slide-1-content" className="content link-content">
                        <p>AimHigher Web Design is based in Perth and specialises in designing modern and professional websites that can be easily maintained by anyone, regardless of their technical skill. We also provide a full website management service.</p>
                        <p>AimHigher Web Design bridges the gap between technology and business throughout Australia. We are experts in search engine optimisation (SEO)—in other words, the little tricks that get your business to the top of internet searches.</p>
                        <p>We also provide prompt and efficient after-sales technical support to keep your website working for you, while you get on with business.</p>
                    </div>
                </div>
            </section>
        );
    }
};

