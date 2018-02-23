import React, { Component } from 'react';

//Components
import {ColourSwatches, Typography} from '../../layouts/styleGuide.js';

//Resources
import '../../../scss/partials/styleGuide.scss';

export class StyleGuide extends Component {
    render() {
        let names= [
            'yellow',
            'blue',
            'grey'
        ];

        return (
            <div className="content">
                <ColourSwatches primary="#fff75b" supporting="#caeafb" neutral="#f4aabc" names={names} />
            </div>
        );
    }
};