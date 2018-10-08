import styled from 'react-emotion';

export const Article = styled('article')`
    text-align: center;

    p {
        text-align: justify;
    }

    img {
        max-height: calc(100vh - #{$height_header});
    }

    .twitter-tweet, iframe {
        display: block;
        margin: 0 auto;
        max-width: 800px;

        &.instagram-media {
            position: relative;
                left: calc(50vw - 50%);
        }    
    }
`

export const ArticleIntro = styled('div')`
    display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
`

export const Date = styled('time')`
    display: block;
    font-size: 0.9em;
`

export const ShareIcons = styled('div')`
    display: flex;
        justify-content: space-between;
    margin-top: 0;
    position: relative;
        bottom: auto;
        right: auto;
    min-width: 150px;
`