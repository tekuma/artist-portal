import React from 'react';
import uuid from 'node-uuid';
import Artwork from './artwork/Artwork.jsx';

export default class ArtworkDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.artworks = [
            {
                id: uuid.v4(),
                title: 'The Starry Night',
                year:'1889',
                image: '../../assets/images/starry-night-1.jpg'
            },
            {
                id: uuid.v4(),
                title: 'Wheat Field with Cypresses',
                year:'1889',
                image: '../../assets/images/field.jpg'
            },
            {
                id: uuid.v4(),
                title: 'Starry Night Over the Rhone',
                year:'1888',
                image: '../../assets/images/starry-night-2.jpg'
            }
        ]
    }

    render() {
        const artworks = this.artworks;

        var styleManagerClosed = {
            width: window.innerWidth - 40
        };

        var styleSmallScreen = {
            width: window.innerWidth - 250
        };

        return (
            <main style={this.props.managerOpen ? (window.innerWidth * 0.3 > 250) ? null : styleSmallScreen : styleManagerClosed} >{artworks.map(artwork => {
                    return (
                        <Artwork key={artwork.id} artwork={artwork} />
                    );
                })}
            </main>
        );
    }
}
