import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

//Resources
import '../resources/privacy.css';


class Meta extends Component {
    render() {
        let name = 'Privacy Policy | AimHigher Web Design';
        let description ="What we do with your information";
        let slug = 'faq';
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

export class Privacy extends Component {
    render() {
        return (
            <div className="content">
                <Meta />
                <h1>Privacy Policy</h1>
                <p>This Privacy Policy sets out our commitment to protecting the privacy of your personal information that we collect through this website <a href="/">aimhigherwebdesign.com.au</a> (Site) or directly from you.</p>
                <p>Please read this Privacy Policy carefully.  Please contact us if you have any questions.</p>
                <p>You providing us with personal information indicates that you have had sufficient opportunity to access this Privacy Policy and that you have read and accepted it.</p>
                <p>If you do not wish to provide personal information to us, then you do not have to do so, however it may affect your use of this Site or any products and services offered on it.</p>
                <ol className="privacy">
                    <li>
                        <h3>Type of personal information collected</h3>
                        <p><strong>Personal Information:</strong> The type of personal information we collect may include is set out on our website.</p>
                        <p>If we receive your personal information from third parties, we will protect it as set out in this Privacy Policy.</p>
                    </li>
                    <li>
                        <h3>Collection and use of personal information</h3>
                        <p>We collect and use the personal information for purposes including to contact and communicate with you, for internal record keeping and for marketing.</p>
                    </li>
                    <li>
                        <h3>Disclosure of personal information</h3>
                        <p>We may disclose personal information for purposes including to provide our products and services to you, and as required by law.</p>
                        <p>Where we disclose your personal information to third parties for these purposes, we will request that the third party follow this Privacy Policy regarding handling of your personal information.</p>
                    </li>
                    <li>
                        <h3>Access to and correction of personal information</h3>
                        <p><strong>Access:</strong> You may request details of personal information that we hold about you, in certain circumstances set out in the Privacy Act 1988 (Cth).  An administrative fee may be payable for the provision of information.  We may refuse to provide you with information that we hold about you, in certain circumstances set out in the Privacy Act.</p>
                        <p><strong>Correction:</strong> If you believe that any information we hold on you is inaccurate, out of date, incomplete, irrelevant or misleading, please contact us by email. We rely in part upon customers advising us when their personal information changes.  We will respond to any request within a reasonable time.  We will endeavor to promptly correct any information found to be inaccurate, incomplete or out of date.</p>
                    </li>
                    <li>
                        <h3>Complaints about breach</h3>
                        <p>If you believe that we have breached the Australian Privacy Principles and wish to make a complaint about that breach, please contact us on the email address below.</p>
                    </li>
                    <li>
                        <h3>Unsubscribe</h3>
                        <p>To unsubscribe from our e-mail database, or opt out of communications, please contact us at the details below.</p>
                        <p>You can also unsubscribe using the link at the bottom of your emails. Please note, these emails are used for notification purposes, if you unsubscribe you may miss an important notice.</p>
                    </li>
                    <li>
                        <h3>Storage and Security</h3>
                        <p>We are committed to ensuring that the information you provide is secure.</p>
                    </li>
                </ol>
                <h3>For any questions or notice, please contact us at:</h3> 
                <p><strong>AimHigher Web Design ABN:</strong> 48546831052</p> 
                <p><strong>Email:</strong> <a href="mailto:admin@aimhigherwebdesign.com.au">admin@aimhigherwebdesign.com.au</a></p>
                <p>Last update: 12 November 2017</p>
                <p>This policy is provided by <a href="http://legalvision.com.au" target="_blank">legalvision.com.au</a></p>
            </div>
        );
    }
};