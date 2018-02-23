import React, { Component } from 'react';

// Components
import { StyleGuide } from './styleGuide';

export class Owlkeyme extends Component {
    render() {
        document.getElementById('root').classList.add('style-guide');

        return (
            <div className="content bitgenics">
                <h1>Owlkeyme</h1>
                <div>
                    <StyleGuide />
                </div>
            </div>
        );
    }
};