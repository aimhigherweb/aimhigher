import React, { Component } from 'react';

// Components
import { StyleGuide } from './styleGuide';

export class Bitgenics extends Component {
    render() {
        document.getElementById('root').classList.add('style-guide');

        return (
            <div className="content bitgenics">
                <h1>Bitgenics</h1>
                <div>
                    <StyleGuide />
                </div>
            </div>
        );
    }
};