---
title: Generating SSL Certificates
date: 2020-05-06
description: I remember a few years back when I first started using SSL certificates on my websites, I spent several hours trying to get stuff working on the command line, eventually finding an online generator and working out what they needed me to do to verify the site and generate the certificate. And once that was done, I still needed to install it on my hosting, the whole process was complicated and confusing, and even once I'd written it down it still took some concentration to get it done (and needed to be repeated every 90 days to renew the certificate).
tags: [SSL, Security]
layout: layouts/post.njk
featured: /img/undraw_safe_bnk7.png
---

I remember a few years back when I first started using SSL certificates on my websites, I spent several hours trying to get stuff working on the command line, eventually finding an online generator and working out what they needed me to do to verify the site and generate the certificate. And once that was done, I still needed to install it on my hosting, the whole process was complicated and confusing, and even once I'd written it down it still took some concentration to get it done (and needed to be repeated every 90 days to renew the certificate).

So when I then discovered Cloudflare a couple of months later, it was a game changer for me! None of this faffing about verifying ownership, it was better for managing the DNS records as well and my favourite bit, the certificates auto-renewed so I didn't need to remember to renew them! Since then, pretty much every website I build/host/manage is set up with Cloudflare (the exceptions are the sites hosted on Netlify, who handle that for me as well), and I highly recommend it for anyone who wants a free, no-hassle SSL certificate.

But recently, while setting up a custom domain on [Okta](https://www.okta.com/), I needed to provide an SSL certificate, so had to generate one myself. And while I immediately reached for my online generator, the encoding they use was wrong for Okta, so kept throwing errors. Even though it has only been a few years since I first fought with command line SSL certificates, it feels like several decades of development and I now use CLI tools every day, so I thought I'd give it another go.

As recommended, I used [Certbot](https://certbot.eff.org/) to generate the certificate and installed it on [WSL](https://amygoestoperth.com.au/setting-up-a-windows-computer-for-dev#wsl) (Windows Subsystem for Linux), but Certbot has instructions for installing on different systems. Thankfully being able to use a Unix type terminal (and probably being more comfortable with the command line), this turned out to be a super simple process and within a couple of minutes I'd managed to verify my domain and generate the certificates (which were the right encoding for what I needed).

## Install Certbot

Run the following commands to update the packages and install Certbot in your terminal (these are linux specific instructions)

```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
```

## Generating SSL Certificates

There ae a heap of different options (and plugins) for generating SSL certificates, but I wanted to manually verify my domain (using the `--manual` command).

I also wanted to [verify my domain](https://certbot.eff.org/docs/using.html#manual) by adding a DNS record (`—preferred-challenges dns`), by default it uses HTTP to verify, but I didn't have a page running on the domain so that wouldn't work.

```bash
sudo certbot certonly --manual --preferred-challenges dns
```

When running this command, it will prompt for some information (eg. your domain) and will give you the TXT record to add to your DNS (and if you're on Windows, remember not to use `CTRL + C` to copy the records, because that will end the process and you'll have to start again)

---

And that's it. Once you run the certificate generation command, it will print out exactly where to find the certificate and key, you can then copy the contents of your file to wherever it needs to go!
