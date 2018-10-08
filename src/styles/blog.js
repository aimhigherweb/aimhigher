import styled from 'react-emotion';

export const ArticleFeed = styled('div')`
    display: grid;
        grid-gap: 30px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding: 20px 15px;
`

export const Article = styled('article')`
    background: rgb(255, 255, 255, 0.7);
    border-radius: 10px;
    display: block;
    padding: 20px 20px 40px;
    position: relative;

    h2, h5, h6 {
        margin: 0;
    }

    &:active, &:hover, &:focus {
        background: ${props => props.theme.colours.primary.light['25']};
    }
`

export const FeatureImage = styled('div')`
    display: flex;
        justify-content: center;
        align-items: center;
    height: 15vh * 2;
        max-height: 300px;
    margin-bottom: 10px;
    overflow: hidden;
    text-align: center;

    img {
        height: 100%;
            max-height: 100%;
        width: auto;
            max-width: unset;
    }
`

export const ArticleTitle = styled('h2')`
    font-size: 1.1em;
    padding-right: 50px;
    
    a {
        text-decoration: none;
    }
`

export const Date = styled('time')`
    display: block;
    font-size: 12px;
    margin: 10px 0;
`

export const Excerpt = styled('div')`
    font-size: 0.8em;
`

export const ShareIcons = styled('div')`
    font-size: 30px;
    margin-top: -30px;
    position: absolute;
        bottom: 10px;
        right: 20px;

    a {
        padding: 5px;
    }
`