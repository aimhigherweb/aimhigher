import React from 'react';
import {navigateTo} from 'gatsby'
import Recaptcha from 'react-google-recaptcha'

import Layout from '../components/layout';

import {Form, Content, Head1} from '../components/layout/style';

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY,
meta = {
    name: 'Contact Us | AimHigher Web Design',
    description: "Get in touch with us today and find out how we can help you.",
    slug: 'contact',
};

function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

class Contact extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    handleRecaptcha = value => {
      this.setState({ "g-recaptcha-response": value });
    };
  
    handleSubmit = e => {
      e.preventDefault();
      const form = e.target;
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": form.getAttribute("name"),
          ...this.state
        })
      })
        .then(() => navigateTo(form.getAttribute("action")))
        .catch(error => alert(error));
    };
  
    render() {
      return (
        <Layout meta={meta} wave>
        <Content>
            <Head1>Contact Us</Head1>
            <p>We'd love the chance to work with you and your website. Send us a few details and someone will be in touch to help you</p>
            <Form 
            name="contact-recaptcha"
            method="post"
            action="/thanks/"
            data-netlify="true"
            data-netlify-recaptcha="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            <noscript>
              <p>This form won’t work with Javascript disabled</p>
            </noscript>
            <label for="name">
                    Name
                    <input type="text" name="name" onChange={this.handleChange} />
                </label>
                <label for="email">
                    Email
                    <input type="email" name="email" onChange={this.handleChange} />
                </label>
                <label for="phone">
                    Phone
                    <input type="text" name="phone" onChange={this.handleChange} />
                </label>
                <label for="website">
                    Do you have an existing website? Or a Facebook page?
                    <input type="text" name="website" onChange={this.handleChange} />
                </label>
                <fieldset>
                    <legend>What are you looking for?</legend>
                    <label for="build">
                        <input type="checkbox" name="build" onChange={this.handleChange} />
                        Website Build
                    </label>
                    <label for="edit">
                        <input type="checkbox" name="edit" onChange={this.handleChange} />
                        Website Editing
                    </label>
                    <label for="email">
                        <input type="checkbox" name="email" onChange={this.handleChange} />
                        Email Hosting
                    </label>
                    <label for="hosting">
                        <input type="checkbox" name="hosting" onChange={this.handleChange} />
                        Website Hosting
                    </label>
                    <label for="support">
                        <input type="checkbox" name="support" onChange={this.handleChange} />
                        Support
                    </label>
                    <label for="other">
                        <input type="checkbox" name="other" onChange={this.handleChange} />
                        Something Else
                    </label>
                </fieldset>
                <label for="message">
                    Message
                    <textarea name="message"onChange={this.handleChange} ></textarea>
                </label>
            <Recaptcha
              ref="recaptcha"
              sitekey={RECAPTCHA_KEY}
              onChange={this.handleRecaptcha}
            />
            <p>
              <button type="submit">Submit</button>
            </p>
            </Form>
        </Content>
    </Layout>
      );
    }
  }

export default Contact