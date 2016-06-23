import React from 'react';
import uuid from 'node-uuid';
import Album from './artwork/Artwork.jsx';

export default class ArtworkDashboard extends React.Component {
    constructor() {
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

        return (
            <main>{artworks.map(artwork =>
                <Artwork key={artwork.id} artwork={artwork} />
                )}
            </main>

        );
    }
}
