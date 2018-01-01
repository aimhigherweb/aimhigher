import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Components

//Resources

class Meta extends Component {
    render() {
        let name = 'Wondai Country Running Festival - SocialPilot Instructions';
        let description ="Instructions for posting using SocialPilot";
        let slug = 'wondai-country-festival/socialpilot';
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

export class SocialPilot extends Component {
    render() {
        return (
            <article className="content">
                <Meta />
                <h1>Posting to Social Media using SocialPilot</h1>
                <section>
                    <p>URL: <a href="https://panel.socialpilot.co/posts" target="_blank">https://panel.socialpilot.co/posts</a></p>
                    <p>Navigate to <strong>Posts</strong> -> <strong>Create Post</strong></p>
                    <img src="/img/clientPortal/wondaiCountryFestival/documentation/socialpilot-post_menu.png" />
                    <p>If the post is text only (no image/video), click <strong>Share As Text</strong> at the bottom. Otherwise, select <strong>Share as Media</strong> to upload a image/video.</p>
                    <img src="/img/clientPortal/wondaiCountryFestival/documentation/socialpilot-create_post.png" />
                    <p>Enter the content and upload an image/video (if applicable) and select the accounts to share with on the right hand side (if there’s no image, don’t share on Instagram).</p>
                    <img src="/img/clientPortal/wondaiCountryFestival/documentation/socialpilot-post_media.png" />
                    <p>From the drop down, choose one of the following:</p>
                    <img src="/img/clientPortal/wondaiCountryFestival/documentation/socialpilot-post_options.png" />
                    <ul>
                        <li><strong>Add to Queue</strong> – this will add the post to the sharing queue (check where it’s at if you do this)</li>
                        <li><strong>Share Now</strong> – this will share the post straight away (give or take a minute or so). Recommended for something you just want to share at a particular time</li>
                        <li><strong>Share Next</strong> – this will add the post to queue up in the next time slot. If there’s something already there, it will shift everything out to be the first one. If you’re sharing to multiple platforms, it will put each of them in a separate slot</li>
                        <li><strong>Schedule Post</strong> – This will prompt you to confirm when you want to share the post (this is the one we’ll use most other than Share Now).</li>
                        <li><strong>Repeat Post</strong> – This will schedule in a post to be repeated several times (will then prompt you to confirm when they’re scheduled for). Good for bulk scheduling a post to remind people to register</li>
                    </ul>
                    <p>Under <strong>Posts</strong> -> <strong>Calendar</strong>, you can see all the posts shared and what platforms they were shared on (including those shared straight away) as long as they’re shared through SocialPilot (this will give us good visibility of what has been shared when so it’s good if we just share things this way).</p>
                    <p>Unfortunately it’s a bit more difficult to share Instagram posts, you can schedule them, but then needs to be confirmed and posted through a mobile device (<a href="https://support.socialpilot.co/hc/en-us/articles/115004917145-How-Instagram-Scheduling-works-at-SocialPilot-">https://support.socialpilot.co/hc/en-us/articles/115004917145-How-Instagram-Scheduling-works-at-SocialPilot-</a>). It’s not too difficult, and just needs to be completed by someone who has the SocialPilot app and Instagram account on their phone. Not too difficult, just something to be aware of.</p>
                </section>
            </article>
        );
    }
};