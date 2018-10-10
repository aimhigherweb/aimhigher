import React from 'react';

import Layout from '../components/layout';

import {Form, Content, Head1} from '../components/layout/style';

const meta = {
    name: 'Contact Us | AimHigher Web Design',
    description: "Get in touch with us today and find out how we can help you.",
    slug: 'contact',
};

const Contact = () => (
    <Layout meta={meta} wave>
        <Content>
            <Head1>Contact Us</Head1>
            <p>We'd love the chance to work with you and your website. Send us a few details and someone will be in touch to help you</p>
            <Form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
                <input type="hidden" name="bot-field" />
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
        </Content>
    </Layout>
)

export default Contact