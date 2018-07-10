import React, { Fragment } from 'react';

//Resources
import {Meta} from '../../components/parts/index.js';
import Pages from '../../data/pageContent.js';

//Styled Components
import {Content, Head1} from '../../global.js';

const StandardPage = ({location}) => {
    let pageSlug = location.pathname;
        pageSlug = pageSlug.replace(/^\//, '');
    let details = '',
        noPage = false;

    if(Pages[pageSlug]) {
        details = Pages[pageSlug].meta;
    }
    else {
        details = Pages['404'].meta;
        pageSlug = '404';
    }

        return (
            <div className="content">
                {!noPage &&
                    <Fragment>
                        <Meta {...details} />
                        <Content>
                            <Head1>{Pages[pageSlug].title}</Head1>
                            {Pages[pageSlug].content}
                        </Content>
                    </Fragment>
                }
            </div>
        );
};

export default StandardPage;