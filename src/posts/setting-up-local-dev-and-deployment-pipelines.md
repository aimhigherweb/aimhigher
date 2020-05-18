---
title: Setting up Local Dev and Deployment Pipelines
date: 2017-09-04
description: How-to article on setting up a local development environment and continuous deployment pipeline for a Wordpress website (using free tools of course)
tags: [WordPress, Automation, Process, 'Continuous Deployment']
layout: layouts/post.njk

featured: /img/2e2caf5740aabb6fe6334d2aef4cab7acd28b408_rawpixel-com-579231-unsplash.jpg
---

Since I discovered git, everything I do gets recorded on GitHub (it’s one of the most amazing things I’ve learnt in web). I’ve also started using XAMPP so that I can develop on my local machine. But while copying files from my local development onto my server I thought surely there must be an easier way to do this. Unfortunately there didn’t seem to be a lot of information about simply setting this up with FTP so I’m documenting it to make it easier for the next person.

These instructions are specific to a WordPress build and using cPanel but can be adjusted to different situations.

To set this up you’ll need a few things:

- Install [XAMPP](https://www.apachefriends.org/index.html) (or [MAMP](https://www.mamp.info/en/) on a Mac) for local development
- [Github](https://github.com/) Account (can also use GitLab or Bitbucket)
- Latest [WordPress](https://en-au.wordpress.org/) version
- [Git client](https://git-for-windows.github.io/) (for Windows computers, Mac and Linux can use Terminal). You could also use [Ubuntu Bash](https://msdn.microsoft.com/en-au/commandline/wsl/install_guide) if you have the lastest Windows 10
- Access to your hosting through cPanel (or similar)

## Install WordPress

To start, you will need to have WordPress installed on both your [local machine](https://premium.wpmudev.org/blog/setting-up-xampp/) and on your [hosting](https://codex.wordpress.org/Installing_WordPress). For my local installation, I include it in a subdirectory (eg. <http://localhost/wordpress>) rather than the root path as that way I can have a bunch of different installations at once.

## Setup Git Repository

Technically you could use the whole WordPress folder as your repository but I just include my theme folder and have no issues with that. You can get a copy of the Twenty Seventeen WordPress theme from my [repository](https://github.com/amykapernick/wordpress). Clone this repository into the Themes folder of your local installation.

## Install Gulp and Sass

I use Gulp to not only compile my Sass (definitely one of the most amazing things I’ve learnt) but also to create source maps and change the file paths when changing from local to online. If you’re starting from scratch, you’ll have to install the following:

- [Node.js](https://nodejs.org/en/)
- [Gulp](https://www.npmjs.com/package/gulp-install) (via Git Bash, Terminal or similar)
- [Gulp Sass](https://www.npmjs.com/package/gulp-sass)
- [Gulp Replace](https://www.npmjs.com/package/gulp-replace)
- [Gulp String Replace](https://www.npmjs.com/package/gulp-string-replace)
- [Gulp Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)

These are all modules needed in my Gulpfile but feel free to use different ones or add your own, just remember to adjust as necessary.

```javascript
//Variables
var gulp = require("gulp");
var sass = require("gulp-sass");
var replace = require("gulp-replace");
var replaceString = require("gulp-string-replace");
var sourcemaps = require("gulp-sourcemaps");

//File Paths
var sassFiles = "source/scss/**/*.scss",
  mainSassFile = "source/scss/main.scss",
  cssFiles = "assets/css/",
  localHostPath = "/wordpress/wp-content/",
  remotePath = "/wp-content/",
  pathFiles = "*";

//Compile main sass into css
gulp.task("sassy", function() {
  gulp
    .src(mainSassFile)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError)) //Using gulp-sass
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest(cssFiles));
});

//Watch for changes in sass files and running sass compile
gulp.task("watch", function() {
  gulp.watch(sassFiles, ["sassy"]);
});

//Replace file paths for local host with remote server
gulp.task("replaceLocalDev", function() {
  gulp
    .src([pathFiles, "!gulpfile.js"])
    .pipe(replace(localHostPath, remotePath))
    .pipe(gulp.dest("./"));

  gulp
    .src([sassFiles, "!gulpfile.js"])
    .pipe(replaceString(localHostPath, remotePath))
    .pipe(gulp.dest("source/scss/"));

  gulp.start("sassy");
});
```

Make sure that you add the node_modules folder to your gitignore file otherwise it will take forever.

## Setup Codeship

Codeship allows users with free accounts to have unlimited projects setup, run 1 build at a time and have 100 builds each month. For most freelancers or small businesses this should be fine otherwise plans start at \$49/month and include unlimited builds.

Once you’ve created your account, setup a project linked to your GitHub account and follow the instructions to link it to your desired repository.

When prompted, select to run node.js commands and add to those to install any gulp modules you’re using. It should end up looking similar to this:

```shell
# By default we use the Node.js version set in your package.json or the latest
# version from the 0.10 release
#
# You can use nvm to install any Node.js (or io.js) version you require.
# nvm install 4.0
nvm install 0.10
npm install
npm install --save gulp-install
npm install gulp-sass --save-dev
npm install --save-dev gulp-replace
npm install gulp-string-replace --save-dev
```

Navigate to **Project Settings** -> **Deployment** and select to setup a new deployment pipeline. You can choose whether to trigger the build to happen when you push to the master branch or another one, for example I’ve set it to build when I push the the dev branch (which means I can specifically target when I want to build).

For this setup, you will need to select **Custom Script** but if your deployment is different, you can choose another option. You can also choose to run the build in multiple locations if you like. Again, add anything you’d like to run to the scripts but I use the following:

```shell
gulp replaceLocalDev
gulp sassy
rm -rf node_modules
lftp -c "open -u $FTP_USER,$FTP_PASSWORD {insertFTPhosthere}; set ssl:verify-certificate no; mirror -R ~/clone/ /wp-content/themes/wordpresstheme"
```

This script runs the gulp functions to change file paths, removes the node_modules folder that was created (this isn’t needed for the website and both takes up a lot of room and has a tendency to break when moved to your hosting) and then moves the cloned files via FTP (you can also set this up to use SFTP or SSH). Make sure you update your version to include your FTP address and make sure that the target folder path is correct.

Navigate to **Project Settings** -> **Environment** and assign the variables for FTP_USER and FTP_PASSWORD for your login details. This way any logs for your build will include the variable name rather than your actual username and password.

If needed, edit the **Projects Settings** -> **Notification** to specify how you’d like to be notified of build successes or failures, for example you can get notified via [Slack](https://slack.com/).

## Databases

Unfortunately the process for migrating database information is still a manual process (although I’ll definitely let you know once I work out how to automate that as well). Open the database for your local installation and perform a full export, then import that into the database for your hosting (you may need to delete existing tables before you import). Once you’ve imported the database, you will need to adjust the wp_options table to update the siteurl and home values for the live URL rather than the localhost one.

This doesn’t have to be done every time, but includes any updates in content (such as posts and pages), plugins and other config. The build process only brings through theme files which includes any templates, styles and scripts being used.

## Plugins

Again, unfortunately this method doesn’t result in the plugins being brought across. My method to approach this, is to install the plugins on both local and live and when the database gets imported, it will bring through any config that you’ve set.

