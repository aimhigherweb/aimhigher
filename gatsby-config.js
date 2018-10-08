module.exports = {
    siteMetadata: {
        title: 'AimHigher Web Design',
        description: 'AimHigher Web Design bridges the gap between technology and business throughout Australia.',
        siteUrl: 'https://aimhigherweb.design'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-plugin-emotion`,
            options: { 
                "autoLabel": true,
                "hoist": true,
                "sourceMap": true 
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                include: './src/img/'
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
              path: `${__dirname}/src/img`,
              name: 'images',
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/blog/posts`,
                name: "markdown-pages",
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
              plugins: [
                {
                  resolve: `gatsby-remark-oembed`
                },
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        showCaptions: true,
                        maxWidth: 1000,
                        widthWebp: true,
                    },
                },
              ]
            }
        },
        'gatsby-plugin-netlify-cms'
    ],
}