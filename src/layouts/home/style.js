import styled, {keyframes} from 'react-emotion';
import ReactSVG from 'react-svg';

export const Hero = styled('div')`
    color: ${props => props.theme.colours.primary.dark['75']};
    display: flex;
        align-items: center;
        justify-content: center;
    font: ${props => props.theme.fonts.headings};
    height: 60vh;
    position: relative;
        top: calc(-1 * ${props => props.theme.values.header.height['320']});
    z-index: 0;

    blockquote {
        font-size: 1.5em;
        margin-top: 80px;
    }
`;

export const HeroBack = styled(ReactSVG)`
    svg {
        height: auto;
            max-height: unset;
        margin-left: 50%;
        position: absolute;
            top: 0;
            left: -50%;
        width: 3500px;
            max-width: unset;
        z-index: 0;
    }

    path {
        fill: url('#_Linear1-1');
    }
`;

export const HeroContent = styled('div')`
    padding: calc(1.5 * ${props => props.theme.values.header.height['320']}) 30px 0;
    position: relative;
`;

const personThinking = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const personIdea = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

export const HomeGraphic = styled(ReactSVG)`
    clip-path: polygon(-1.45% 54.49%, 15.93% 52.35%, 15.93% 37.43%, 13.06% 17.68%, 19.7% 6.29%, 44.76% 12.49%, 46.16% 5.29%, 51.57% 0.39%, 60.93% -0.47%, 70.19% -0.83%, 72.78% 4.81%, 76.81% 9.19%, 81.82% 4.74%, 89.35% 8.51%, 91.72% 23.53%, 97.64% 35.66%, 91.71% 50.16%, 100% 51.58%, 99.54% 63.88%, 85.92% 64.44%, 82.08% 76.61%, 74.66% 90.14%, 75.1% 97.49%, 1.45% 97.8%, 1.7% 88.46%, 4.36% 85.83%);
    float: right;
    shape-outside: polygon(-1.45% 54.49%, 15.93% 52.35%, 15.93% 37.43%, 13.06% 17.68%, 19.7% 6.29%, 44.76% 12.49%, 46.16% 5.29%, 51.57% 0.39%, 60.93% -0.47%, 70.19% -0.83%, 72.78% 4.81%, 76.81% 9.19%, 81.82% 4.74%, 89.35% 8.51%, 91.72% 23.53%, 97.64% 35.66%, 91.71% 50.16%, 100% 51.58%, 99.54% 63.88%, 85.92% 64.44%, 82.08% 76.61%, 74.66% 90.14%, 75.1% 97.49%, 1.45% 97.8%, 1.7% 88.46%, 4.36% 85.83%);
    width: 60%;

    #epiphany {
        animation-name: ${personIdea};
    }

    #thinking {
        animation-name: ${personThinking};
    }

    #epiphany, #thinking {
        animation-duration: 5s;
        animation-iteration-count: infinite;
        animation-timing-function: steps(1, end);
    }
`;

export const HomeContent = styled('div')`
    display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    font-size: 1.7em;
    line-height: 1.5;
    margin: 0 auto;
    padding: 20px;

    p {
        width: 55%;
    }
`;

export const ContentSVG = styled(ReactSVG)`
    height: auto;
    width: 40%;

    svg {
        height: auto;
            max-height: 250px;
        width: auto;
    }
`;