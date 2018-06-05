import React, { Component, Fragment } from 'react';
import {Helmet} from 'react-helmet';

//Resources
import {Meta} from '../../components/parts/index.js';
import Pages from '../../data/pageContent.js';
import Logo from '../../img/logo.png';

const StandardPage = ({location}) => {
    let pageSlug = location.pathname;
        pageSlug = pageSlug.replace(/^\//, '');
    let details = '',
        noPage = false;

    if(Pages[pageSlug]) {
        details = Pages[pageSlug].meta;
    }
    else {
        noPage = true
    }

        return (
            <div className="content">
                {!noPage &&
                    <Fragment>
                        <Meta {...details} />
                        <h1>{Pages[pageSlug].title}</h1>
                        {Pages[pageSlug].content}
                    </Fragment>
                }
            </div>
        );
};

export default StandardPage;