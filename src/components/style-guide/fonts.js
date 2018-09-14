import { injectGlobal } from 'emotion';

//Importing Images
function importAll(r) {
    let fonts = {};
    r.keys().map((item, index) => { fonts[item.replace('./', '')] = r(item); });
    return fonts;
}
  
const fonts = importAll(require.context('../../fonts/clients', false, /\.(ttf)$/));

injectGlobal`
    // Janne Martin
    @font-face {
        font-family: 'Ovo';
        font-style: normal;
        font-weight: 400;
        src: url('../../fonts/janne-martin-Ovo-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Muli';
        font-style: normal;
        font-weight: 400;
        src: url('../../fonts/janne-martin-Muli-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Muli';
        font-style: italic;
        font-weight: 400;
        src: url('../../fonts/janne-martin-Muli-Italic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Muli';
        font-style: normal;
        font-weight: 700;
        src: url('../../fonts/janne-martin-Muli-Bold.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Muli';
        font-style: italic;
        font-weight: 700;
        src: url('../../fonts/janne-martin-Muli-BoldItalic.ttf') format('truetype');
    }

    //Bellisa Cafe
    @font-face {
        font-family: 'Gudea';
        font-style: normal;
        font-weight: 400;
        src: url('../../fonts/bellisa-cafe-Gudea-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Gudea';
        font-style: italic;
        font-weight: 400;
        src: url('../../fonts/bellisa-cafe-Gudea-Italic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Gudea';
        font-style: normal;
        font-weight: 700;
        src: url('../../fonts/bellisa-cafe-Gudea-Bold.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Rancho';
        font-style: normal;
        font-weight: 400;
        src: url('../../fonts/bellisa-cafe-Rancho-Regular.ttf') format('truetype');
    }
`;
