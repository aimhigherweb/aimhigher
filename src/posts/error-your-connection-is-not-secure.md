---
title: Error! Your connection is not secure
date: 2017-09-18
description: Confused about what HTTPS means, whether you're being hacked and why you need to care about it? Let me explain some of this for you
tags: [Security, SSL, HTTPS]
layout: layouts/post.njk

featured: /img/dad706da1ff6689d327196aa17bc66b410c43f69_1_nguze1lsf0sywbjiclaszg.jpg
---

These days, there are more and places offering their website through encrypted protocols, or HTTPS. But what does this actually mean for you? Is this something you should be worried about? And should you be concerned if a site isn’t encrypted?

![](/img/dad706da1ff6689d327196aa17bc66b410c43f69_1_nguze1lsf0sywbjiclaszg.jpg)

As the interwebs ventures further and further into every aspect of our lives, there is more and more of our information available out there. Would you trust a bank that had questionable security measures? Probably not. And the same goes for the information we share/save online, we want to know that whoever we give the information to has been verified and is taking steps to look after it (and isn’t just a Nigerian price come to give us a long-lost inheritance).

When looking at a website, we’re used to seeing the HTTP at the start of the URL (although a lot of browsers hide this nowadays), which standards for Hypertext Transfer Protocol (simply put, it’s part of the world wide web). But now most of the websites we see have HTTPS at the start instead, where the ‘S’ stands for Secure. This ‘S’ means that the website has been verified and assigned an SSL certificate so that it can encrypt the information it’s sending and receiving.

For most of the time we spend on the internet, it doesn’t matter too much whether we’re browsing a secure site. But when you’re sharing information with the website (particularly things like credit card details), you want to know that the site is legit and you’re not going to get scammed (note: giving your information to a secure site does not guarantee you won’t get scammed, please don’t use this against me if it happens).

## We’re probably all also familiar with the dreaded Privacy or Security Error; but should we be worried about these?

These errors will appear in your browser for many different reasons. It may be that the site is trying to send you to a HTTPS version, but it doesn’t have an SSL certificate; it may be that the site is actually dodgy and trying to steal your information, or it may be that the SSL certificate it’s using doesn’t match the website (hint: only two of these are causes for concern).

![](/img/cc0ab9008e70377eb12141bf4932d94143549e25_1_xzl9uroyybht4vugxawztq.png)

SSL certificates are something that needs to be renewed on a regular basis, similar to your car registration. And how often have you been a little late in renewing your rego? If you’ve used a site before that’s HTTPS and all of a sudden you’re seeing a Privacy Error, chances are the owner of the site has forgotten to renew the certificate. I’d definitely be cautious about giving the site information while it’s showing this error (as the SSL certificate isn’t active, the information isn’t being encrypted), but if you can, contact the site owner and let them know that they have an error.

Your browser will also check to make sure that the domain name in the SSL certificate matches the site that you’re visiting. This is so that someone can’t steal an SSL certificate for a legitimate site (eg. Facebook) and use it to make their site look verified. The way I came to understand this exchange is:

> Browser: Hey Server, I’ve got a request for <https://mysite.com>, can you give me the SSL certificate?

Now while this sounds super dodgy (and it often is), this often gets people into trouble when they’ve used services that allow you to use a custom domain (such as the support ticketing system Freshdesk). I could have a support portal available at <https://mybusiness.freshdesk.com>, but I want to make sure that I look professional so I use the custom domain <https://help.mybusiness.com>. This is where the browser gets suspicious again because the SSL certificate it receives is for <https://freshdesk.com> which doesn’t match the URL in the browser.

## But why do I care about having my website Secure?

As I said previously, HTTPS sites having only traditionally been seen when requesting or storing information and very important when that information is credit card details. But soon both Google and Firefox will be actioning changes that make it important for all websites to be served through HTTPS.

For the last few years, Google has started taking security into account as part of their SEO algorithm. This means that it will place a higher preference on sites that have been verified and are secure. But unless something looks dodgy or someone has tried to cheat the system, they leave normal HTTP sites alone.

![](/img/e9c8f30fc39e0f059f07870f1fbd7667e176ffff_1_xqzegzysdog4pe4c1c5osw.png)

If your site is secure, you’ll see the familiar green lock in the address bar confirming that everything is ok; for regular HTTP sites there will be nothing at all (or possibly just an information symbol) and for insecure sites, a bright red warning. If the site doesn’t have HTTPS, it will also show a non-obtrusive warning if you’re entering information (such as through a contact form, newsletter sign-up or search box). Coming later this year (with Chrome version 62), it will now regard all non-HTTPS sites as ‘not secure’, even if there is no information being collected. This will still be the non-obtrusive warning (rather than the bright red warning) but will start to affect those sites that haven’t moved over to HTTPS.

With more and more information being stored online, we need to make sure we’re careful about where we enter and store it. And just like you lock up your car, your house and your family heirlooms (if you’re lucky enough to have some), put a lock on your website.

