import styled from 'react-emotion'

export const Swatch = styled('div')`
    grid-column: ${ props => props.opts === 'main' ? 'span 2' : 'span 1' };
    grid-row: ${ props => props.opts === 'main' ? 'span 2' : 'span 1' };
    background: ${ props => props.color };
    border: 3px solid ${ props => props.color };
    border-color: ${ props => props.status === 'fail' && props.theme.colours.fail };
    border-color: ${ props => props.status === 'conditional' && props.theme.colours.warning };
    border-radius: 10px;
    color: ${ props => props.variant === 'light' ? '#000000' : '#FFFFFF' };
    display: flex;
        align-items: center;
        justify-content: center;
    font-size: 12px;
    position: relative;

    p {
        font-size: 1em;
    }

    @media (min-width: 50em) {
        font-size: 15px;
    }

    @media (min-width: 60em) {
        font-size: 18px;
    }
`

export const Set = styled('div')`
    --min: 60px;
    --max: 1fr;
    --gap: 10px;

    display: grid;
        grid-gap: var(--gap);
        grid-template-columns: repeat(auto-fit, minmax(var(--min), var(--max)));
        grid-auto-rows: minmax(var(--min), var(--max));
    margin-bottom: var(--gap);

    @media (min-width: 40em) {
        --gap: 20px;
    }

    @media (min-width: 45em) {
        grid-template-columns: repeat(7, var(--max));
        height: 19vw;
            max-height: 330px;
    }
`

export const TypoContent = styled('div')`
    --icon-size: auto;

    p {
        font: ${ props => props.theme.fonts.regular };
    }

    img {
        max-height: 40vh;
    }

    figcaption {
        border-left: 5px solid ${ props => props.theme.colours.primary.main };
        font: ${ props => props.theme.fonts.headings };
        font-size: 0.9em;
        font-weight: normal;
        padding-left: 5px;
    }

    blockquote {
        border-right: 5px solid ${ props => props.theme.colours.secondary.main };
        font: ${ props => props.theme.fonts.headings };
        font-size: 1.2em;
        padding-right: 10px;
        text-align: right;
    }

    form {
        label {
            color: rgba(${ props => props.theme.colours.primary.main }, 0.9);
            display: block;
            font-weight: bold;
            margin: 0 0 15px;

            input {
                margin-left: 10px;
            }
        }

        input {
            background: rgba(${ props => props.theme.colours.primary.light }, 0.10);
            border: 1px solid rgba(${ props => props.theme.colours.primary.dark }, 0.75);
            padding: 5px 10px;
        }

        textarea {
            display: block;
            margin-top: 10px;
            width: 100%;
                max-width: 300px;
        }
    }
`

const Button = styled('button')`
    --btn-back: rgba(${ props => props.theme.colours.primary.dark }, 0.90);
    --btn-border: var(--btn-back);
    --btn-text: #fff;

    background: var(--btn-back);
    border: 3px solid var(--btn-border);
    color: var(--btn-text);
    cursor: pointer;
    display: inline-block;
    font-size: 1.1em;
    margin: 10px;
    padding: 5px 15px;

    &:active, &:hover, &:focus {
        --btn-back: #fff;
        --btn-border: rgba(${ props => props.theme.colours.primary.dark }, 0.90);
        --btn-text: var(--btn-border);
    }
`

export const PrimaryButton = styled(Button)`
    --btn-back: ${ props => props.theme.colours.secondary.main };

    &:active, &:hover, &:focus {
        --btn-border: ${ props => props.theme.colours.secondary.main };
    }
`

export const SecondaryButton = styled(Button)`
    --btn-back: #fff;
    --btn-border: ${ props => props.theme.colours.primary.main };
    --btn-text: var(--btn-border);

    &:active, &:hover, &:focus {
        --btn-back: ${ props => props.theme.colours.primary.main};
        --btn-border: var(--btn-back);
        --btn-text: #fff;
    }
`

export const NeutralButton = styled(Button)`
    --btn-back: transparent;
    --btn-border: transparent;
    --btn-text: ${ props => props.theme.colours.primary.main };

    text-decoration: underline;

    &:active, &:hover, &:focus {
        --btn-back: ${ props => props.theme.colours.primary.main };
        --btn-text: #fff;

        text-decoration: none;
    }
`

export const Icons = styled('div')`
    --icon-size: 40px;
    --icon-colour: ${ props => props.theme.colours.primary.main };

    display: flex;

    svg {
        color: var(--icon-colour);

        &:active, &:hover, &:focus {
            --icon-colour: ${ props => props.theme.colours.secondary.main };

            cursor: pointer;
        }
    }
`

export const FlexBlock = styled('div')`
    display: flex;
    align-items: flex-start;
        flex-wrap: wrap;
        flex-wrap: ${ props => props.sml && 'nowrap' };

    > * {
        flex: 1 1 auto;
    }

    @media (min-width: 40em) {
        flex-wrap: ${ props => props.med && 'nowrap' };
    }

    @media (min-width: 80em) {
        flex-wrap: ${ props => props.lrg && 'nowrap' };
    }
`
