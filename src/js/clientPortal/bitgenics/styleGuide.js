import React, { Component } from 'react';

//Components
import {ColourSwatches, Typography} from '../../layouts/styleGuide.js';

//Resources
import '../../../scss/partials/styleGuide.scss';

export class StyleGuide extends Component {
    render() {
        let names= [
            'purple',
            'pink',
            'grey'
        ];

        return (
            <div className="content">
                <ColourSwatches primary="#4b3165" supporting="#f14254" neutral="#3b3d42" names={names} />
            </div>
        );
    }
};