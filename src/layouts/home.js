import React, { Component } from 'react';

//Resources
import '../resources/home.css';

export class Home extends Component {
    render() {
        return (
            <section class="parallax home">
                <div class="bcg slide-1 intro">
                </div>
                <div class="container slide-1 intro">
                    <div class="content">
                        <p>AimHigher Web Design is based in Perth and specialises in designing modern and professional websites that can be easily maintained by anyone, regardless of their technical skill. We also provide a full website management service.</p>
                        <p>AimHigher Web Design bridges the gap between technology and business throughout Australia. We are experts in search engine optimisation (SEO)—in other words, the little tricks that get your business to the top of internet searches.</p>
                        <p>We also provide prompt and efficient after-sales technical support to keep your website working for you, while you get on with business.</p>
                    </div>
                </div>
            </section>
        );
    }
};