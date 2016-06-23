import React from 'react';
import uuid from 'node-uuid';
import Artwork from './artwork/Artwork.jsx';

export default class ArtworkDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.artworks = {
            uploads: [
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
            ],
            sunsets: [
                {
                    id: uuid.v4(),
                    title: 'Sunset 1',
                    year:'2015',
                    image: '../../assets/images/sunset-1.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Sunset 2',
                    year:'2016',
                    image: '../../assets/images/sunset-2.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Sunset 3',
                    year:'2005',
                    image: '../../assets/images/sunset-3.jpg'
                }
            ],
            elephants: [
                {
                    id: uuid.v4(),
                    title: 'Elephant 1',
                    year:'2008',
                    image: '../../assets/images/elephant-1.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Elephant 2',
                    year:'2003',
                    image: '../../assets/images/elephant-2.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Elephant 3',
                    year:'2000',
                    image: '../../assets/images/elephant-3.jpg'
                }
            ]
        };
    }

    render() {
        console.log(this.props.currentAlbum);
        if(this.props.currentAlbum.search("untitled") != -1) {
            return this.renderEmptyAlbum();
        } else {
            return this.renderArtworks();
        }
    }

    renderArtworks = () => {
        const artworks = this.artworks[this.props.currentAlbum];

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
    };

    renderEmptyAlbum = () => {
        var styleManagerClosed = {
            width: window.innerWidth - 40
        };

        var styleSmallScreen = {
            width: window.innerWidth - 250
        };

        return (
            <main style={this.props.managerOpen ? (window.innerWidth * 0.3 > 250) ? null : styleSmallScreen : styleManagerClosed} >
                <div className="emptyAlbum">
                    <h2>Drag Artworks from Uploads into this Album</h2>
                </div>
            </main>
        );
    }
}
