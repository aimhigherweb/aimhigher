import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';

// Components
import { ColourSwatches, Typography } from '../../components/style-guide/index.js';
import {Meta} from '../../components/parts/index.js';
import clients from '../../data/clientPortal.js';

//Resources

//Importing Images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const logos = importAll(require.context('../../img/clientPortal/', false, /\.(svg)$/));

const ClientPortal = ({location}) => {
    let pageSlug = location.pathname,
        client = pageSlug.replace(/^\/client\//, ''),
        clientDetails = clients[client],
        theme = clientDetails.theme,
        meta = clientDetails.meta,
        logo = client + '-logo.svg';

    return (
        <Fragment>
            <h1>Client Portal - {clientDetails.title}</h1>
            <Meta {...meta} />
            <Typography theme={theme} logo={logos[logo]} ori={clientDetails.logoOri} clientName={client} />
            <ColourSwatches theme={theme} />
        </Fragment>
    );
}

export default ClientPortal;