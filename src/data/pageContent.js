import React, {Fragment} from 'react';
import ReactSVG from 'react-svg';

import accordion from './faq.js';
import {Accordion, Images} from '../components/parts/index.js'
import { CheckCircle } from 'react-feather';

import ErrorImage from '../img/404.jpg';

//Styled Components
import {Link, Form} from '../global.js';

//Importing Images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const images = importAll(require.context('../img/placeholders/', false, /\.(jpg)$/));


//Variables
const aboutImages = {
    image: images['profile.jpg'],
    alt: 'Profile Image of Amy Kapernick, the founder of AimHigher Web Design',
    caption: 'Amy Kapernick - Founder of AimHigher Web Design',
    custom: {
        dimensions: {
            height: 'auto',
            width: '30%',
        },
        float: 'right',
    }
}

const Privacy = {
    title: 'Privacy Policy',
    meta: {
        name: 'Privacy Policy | AimHigher Web Design',
        description: "What we do with your information",
        slug: 'privacy',
    },
    content: (
        <Fragment>
            <p>This Privacy Policy sets out our commitment to protecting the privacy of your personal information that we collect through this website <Link href="/">aimhigherwebdesign.com.au</Link> (Site) or directly from you.</p>
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
            <p><strong>Email:</strong> <a href="mailto:admin@aimhigherweb.design">admin@aimhigherweb.design</a></p>
            <p>Last update: 12 November 2017</p>
            <p>This policy is provided by <a href="http://legalvision.com.au" target="_blank">legalvision.com.au</a></p>
        </Fragment>
    )
};

const TermsConditions = {
    title: 'Terms and Conditions',
    meta: {
        name: 'Terms and Conditions | AimHigher Web Design',
        description: "I dunno, this probably just says something about the GDPR",
        slug: 'terms',
    },
    content: (
        <Fragment>
            <p>Welcome to our website. This website with URL address <a href="/">aimhigherweb.design</a> is owned and operated by AimHigher Web Design (48546831052). Should you continue to use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our <a href="/privacy">Privacy Policy</a> govern AimHigher Web Design’s relationship with you in connection with this website. Should you not agree with any of these terms and conditions, please do not use our website.</p>
            <p>The term ‘AimHigher Web Design’ or ‘us’ or ‘our’ or ‘we’ refers to AimHigher Web Design, the owner of the website, whose registered ABN is 48546831052. The term ‘you’ or ‘your’ refers to the website user.</p>
            <p>Your use of this website is subject to the following terms and conditions:</p>
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
            <p>This policy is provided by <a href="http://legalvision.com.au" target="_blank">legalvision.com.au</a></p>
        </Fragment>
    )
};

const CodeEthics = {
    title: 'Code of Ethics',
    meta: {
        name: 'Code of Ethics | AimHigher Web Design',
        description: "Trust the code",
        slug: 'ethics',
    },
    content: (
        <Fragment>
           <p>We take our commitments to you as our clients very seriously, therefore you can always rely on us to abide by the following:</p>
            <ul>
                <li>
                    <CheckCircle />Our service is always helpful and friendly
                </li>
                <li>
                    <CheckCircle />All enquiries will be responded to promptly
                </li>
                <li>
                    <CheckCircle />No question is too simple or too complicated. And there's no such thing as a stupid question.
                </li>
                <li>
                    <CheckCircle />We will always be honest with you.
                </li>
                <li>
                    <CheckCircle />Our services are always good value for money.
                </li>
                <li>
                    <CheckCircle />A full quote will be given upfront with no hidden costs.
                </li>
                <li>
                    <CheckCircle />If you are ever unsatisfied with us in any way, we will endeavour to work towards a positive outcome.
                </li>
            </ul>
        </Fragment>
    )
};

const Contact = {
    title: 'Contact Us',
    meta: {
        name: 'Contact Us | AimHigher Web Design',
        description: "Get in touch with us today and find out how we can help you.",
        slug: 'contact',
    },
    content: (
        <Fragment>
            <p>We'd love the chance to work with you and your website. Send us a few details and someone will be in touch to help you</p>
            <Form name="contact" method="post">
                <input type="hidden" name="form-name" value="contact" />
                <label htmlFor="name">
                    Name
                    <input type="text" name="name"/>
                </label>
                <label htmlFor="email">
                    Email
                    <input type="email" name="email"/>
                </label>
                <label htmlFor="phone">
                    Phone
                    <input type="text" name="phone" />
                </label>
                <label htmlFor="website">
                    Do you have an existing website? Or a Facebook page?
                    <input type="text" name="website" />
                </label>
                <fieldset>
                    <legend>What are you looking for?</legend>
                    <label htmlFor="build">
                        <input type="checkbox" name="build" />
                        Website Build
                    </label>
                    <label htmlFor="edit">
                        <input type="checkbox" name="edit" />
                        Website Editing
                    </label>
                    <label htmlFor="email">
                        <input type="checkbox" name="email" />
                        Email Hosting
                    </label>
                    <label htmlFor="hosting">
                        <input type="checkbox" name="hosting" />
                        Website Hosting
                    </label>
                    <label htmlFor="support">
                        <input type="checkbox" name="support" />
                        Support
                    </label>
                    <label htmlFor="other">
                        <input type="checkbox" name="other" />
                        Something Else
                    </label>
                </fieldset>
                <label htmlFor="message">
                    Message
                    <textarea name="message"></textarea>
                </label>
                <button type="submit">Submit</button>
            </Form>
        </Fragment>
    )
};

const About = {
    title: 'About',
    meta: {
        name: 'About | AimHigher Web Design',
        description: "Who are we? Where did we come from? What are we even doing here?",
        slug: 'about',
    },
    content: (
        <Fragment>
            <Images {...aboutImages} />
            <p>
                I grew up in country Queensland and most people we
                knew had small businesses. But when I found out how
                much it cost them to get a website built, I couldn't
                believe it.
            </p>
            <p>
                AimHigher Web Design was founded to help bridge the
                gap between small businesses and technology, and
                help everyone (no matter what size your business is,
                or if you're a sole trader), get their business
                online.
            </p>
            <p>
                We specialise in helping you out with the entire
                process, starting the website, setting up social
                media, setting up emails and any of the ongoing
                support and maintenance requirements.
            </p>
            <p>
                You know your business the best, and we know the
                web. Let us help you, and leave you to focus on what
                you know best!
            </p>
        </Fragment>
    )
};

const Faq = {
    title: 'Frequently Asked Questions',
    meta: {
        name: 'FAQ | AimHigher Web Design',
        description: "Have questions? We've already answered some of them for you.",
        slug: 'faq'
    },
    content: (
        <Accordion items={accordion}  />
    )
};

const FourOhFour = {
    title: '404 - Page Not Found',
    meta: {
        name: 'Page Not Found | AimHigher Web Design',
        description: "Whoops! Something went wrong!",
        slug: '404',
    },
    content: (
        <Fragment>
           <p>Oh no!  Something went wrong while we were finding the page for you, so here's a picture of a dog instead.</p>
           <p>If the dog picture doesn't help, you can try navigating to one of the pages in the menu above.</p>
           <img src={ErrorImage} />
        </Fragment>
    )
};

const OrgChart = {
    title: 'Our Team',
    meta: {
        name: 'Organisation Chart | AimHigher Web Design',
        description: "Check out who is behind the scenes at AimHigher Web Design",
        slug: 'org-chart',
    },
    content: (
        <figure>
            <ul>
                <li>
                    <h2>Founder</h2>
                    <p>Amy Kapernick</p>
                    <ul>
                        <li>
                            <h2>Director of HR</h2>
                            <p>Amy Kapernick</p>
                            <ul>
                                <li>
                                    <h2>Head of Finance</h2>
                                    <p>Amy Kapernick</p>
                                </li>
                                <li>
                                    <h2>Executive Assistant</h2>
                                    <p>Google Home</p>
                                </li>
                                <li>
                                    <h2>Receptionist</h2>
                                    <p>Amy Kapernick</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h2>Chief Technology Officer</h2>
                            <p>Amy Kapernick</p>
                            <ul>
                                <li>
                                    <h2>Lead Developer</h2>
                                    <p>Amy Kapernick</p>
                                    <ul>
                                        <li>
                                            <h2>Front End Developer</h2>
                                            <p>Amy Kapernick</p>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <h2>Lead Designer</h2>
                                    <p>Amy Kapernick</p>
                                </li>
                                <li>
                                    <h2>Client Support Officer</h2>
                                    <p>Amy Kapernick</p>
                                </li>
                                <li>
                                    <h2>IT Support Officer</h2>
                                    <p>Amy Kapernick</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h2>Director of Support Services</h2>
                            <p>Remus ("Remi")</p>
                        </li>
                        <li>
                            <h2>Director of Marketing</h2>
                            <p>Amy Kapernick</p>
                            <ul>
                                <li>
                                    <h2>Sales Manager</h2>
                                    <p>Amy Kapernick</p>
                                </li>
                                <li>
                                    <h2>Customer Service Manager</h2>
                                    <p>Amy Kapernick</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </figure>
    ),
};

const Pages = {
    about: About,
    contact: Contact,
    ethics: CodeEthics,
    faq: Faq,
    privacy: Privacy,
    terms: TermsConditions,
    orgChart: OrgChart,
    404: FourOhFour,
};

export default Pages;