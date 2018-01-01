import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

class Meta extends Component {
    render() {
        let name = 'Terms of Use | AimHigher Web Design';
        let description ="Just a little legal stuff about our website";
        let slug = 'terms';
        let image = 'https://aimhigherwebdesign.com.au/img/logo.png';
        return (
            <Helmet>
                <title>{name}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={'https://aimhigherwebdesign.com.au/' + slug} />

                {/* Facebook */}
                <meta property="og:url" content={'https://aimhigherwebdesign.com.au/' + slug} />
                
                <meta property="og:title" content={name} />
                <meta property="og:image" content={image} />
                <meta property="og:description" content={description} />

                {/* Twitter */}
                <meta name="twitter:url" content={'https://aimhigherwebdesign.com.au/' + slug} />
                <meta name="twitter:title" content={name} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
            </Helmet>
        );
    }
};

export class Terms extends Component {
    render() {
        return (
            <div className="content">
                <Meta />
                <h1>Terms and Conditions of Use</h1>
                <p>Welcome to our website. This website with URL address <a href="/">aimhigherwebdesign.com.au</a> is owned and operated by AimHigher Web Design (48546831052). Should you continue to use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our <a href="/privacy">Privacy Policy</a> govern AimHigher Web Design’s relationship with you in connection with this website. Should you not agree with any of these terms and conditions, please do not use our website.</p>
                <p>The term ‘AimHigher Web Design’ or ‘us’ or ‘our’ or ‘we’ refers to AimHigher Web Design, the owner of the website, whose registered ABN is 48546831052. The term ‘you’ or ‘your’ refers to the website user.</p>
                <p>Your use of this website is subject to the following terms and conditions:
                    <ol>
                        <li>The content of this website is for your general information and use only. It is subject to change without prior notice.</li>
                        <li>Neither we nor any third parties provide any warranty or guarantee as to the performance, accuracy, timeliness, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You hereby acknowledge that such information and materials may contain mistakes, inaccuracies or errors and we expressly exclude any liability for such to the fullest extent permissible by law.</li>
                        <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li>
                        <li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the content, design, layout, appearance, look and graphics of the website. Any reproduction of the website’s material is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                        <li>All trademarks reproduced in this website, which are not the property of, or licensed to us, are acknowledged on the website.</li>
                        <li>Unauthorised use of this website may be a criminal offence and/or give rise to a claim for damages.</li>
                        <li>This website may also, on occasion, include links to other websites which are not controlled by us. These links are provided for your convenience to provide you with further information. You acknowledge that they are used at your own risk. They do not signify that we recommend or endorse the websites. We have no control over the nature, content and availability of those websites.</li>
                        <li>Your use of this website and any dispute arising out of your use of it is subject to the laws of Western Australia.</li>
                        <li>You may only use the website for lawful purposes and in a manner consistent with the nature and purpose of the website.</li>
                        <li>These terms and conditions do not relate to your use of any product or service described on our website unless otherwise agreed. You must refer to the individual warranty relevant to any particular product or service.</li>
                        <li>These terms and conditions may be amended from time to time. Your continued use of our website following any such amendments will be deemed to be confirmation that you accept those amendments.</li>
                        <li>You indemnify us from and against all claims, suits, demands, actions, liabilities, costs and expenses (including legal costs and expenses on a full indemnity basis) resulting from your use of the website.</li>
                        <li>In no event will we be liable for any loss, damage, cost or expense including legal costs and expenses (whether direct or indirect) incurred by you in connection with the use of this website.</li>
                        <li>Every effort is made to keep the website up and running smoothly. However, we take no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.</li>
                    </ol>
                </p>
                <p>This policy is provided by <a href="http://legalvision.com.au" target="_blank">legalvision.com.au</a></p>
            </div>
        );
    }
};