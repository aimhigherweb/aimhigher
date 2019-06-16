import styled from 'styled-components'

export const Article = styled('article')`
	h2,
	h3,
	h4 {
		font: ${props => props.theme.fonts.headings};
	}

	h3 {
		font-size: 1.3em;
	}

	h4 {
		font-size: 1.2em;
	}

	p {
		text-align: justify;
	}

	img {
		display: block;
		max-height: 50vh;
		margin: 0 auto;
	}

	blockquote {
		border-left: 5px solid ${props => props.theme.colours.primary.main};
		font: ${props => props.theme.fonts.headings};
		font-size: 1.2em;
		font-weight: normal;
		padding: 10px 20px;
	}

	.twitter-tweet,
	iframe {
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
