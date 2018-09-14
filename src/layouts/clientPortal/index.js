import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';

// Components
import { ExternalLink } from 'react-feather';
import { ColourSwatches, Typography } from '../../components/style-guide/index.js';
import {Content, Head1} from '../../global.js';
import {Meta} from '../../components/parts/index.js';
import clients from '../../data/clientPortal.js';

//Resources
import '../../components/style-guide/fonts.js';

//Importing Images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const logos = importAll(require.context('../../img/clientPortal/', false, /\.(svg|png)$/));

const ClientPortal = ({location}) => {
    let pageSlug = location.pathname,
        client = pageSlug.replace(/^\/client\//, ''),
        clientDetails = clients[client],
        theme = clientDetails.theme,
        meta = clientDetails.meta,
        logoType = 'svg';

    if(clientDetails.logoType) {
        logoType = clientDetails.logoType;
    }

    let logo = client + '-logo.' + logoType;

    return (
        <Content>
            <Head1>Client Portal - {clientDetails.name}</Head1>
            <Meta {...meta} />
            {clientDetails.live ? (
                <a href={clientDetails.domain} target="_blank">
                    <h3 className="url">
                        {clientDetails.domain} {<ExternalLink />}
                    </h3>
                </a>
            )
            :
            <h3 className="url">{clientDetails.domain}</h3>
            }
            <Typography theme={theme} logo={logos[logo]} type={logoType} ori={clientDetails.logoOri} clientName={client} />
            <ColourSwatches theme={theme} />
        </Content>
    );
}

export default ClientPortal;