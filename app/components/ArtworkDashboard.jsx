import React from 'react';
import uuid from 'node-uuid';
import Artwork from './artwork/Artwork.jsx';
import ArtworkActions from '../actions/ArtworkActions';
import ArtworkStore from '../stores/ArtworkStore';

export default class ArtworkDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.album = ArtworkStore.getState().artworkAlbums[this.props.currentAlbum];
    }

    componentDidMount() {
        ArtworkStore.listen(this.storeChanged);
    }

    componentWillUnmount() {
        ArtworkStore.unlisten(this.storeChanged);
    }

    componentWillReceiveProps(nextProps) {
        this.album = ArtworkStore.getState().artworkAlbums[nextProps.currentAlbum];
        // When the currentAlbum is switched (by clicking on a new album), we load new artworks into album
    }

    storeChanged = (state) => {
        // Without a property initializer `this` wouldn't
        // point at the right context because it defaults to
        // `undefined` in strict mode.
        this.setState(state);
    };

    render() {
        if(this.props.currentAlbum.search("untitled") != -1) {
            return this.renderEmptyAlbum();
        } else {
            return this.renderArtworks();
        }
    }

    renderArtworks = () => {
        const album = this.album

        var styleManagerClosed = {
            width: window.innerWidth - 40
        };

        var styleSmallScreen = {
            width: window.innerWidth - 250
        };

        return (
            <main style={this.props.managerOpen ? (window.innerWidth * 0.3 > 250) ? null : styleSmallScreen : styleManagerClosed} >{album.map(artwork => {
                    return (
                        <Artwork
                            key={artwork.id}
                            onDelete={this.deleteAlbum.bind(null, artwork.id)}
                            artwork={artwork} />
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
                <div className="empty-album">
                    <h2>Drag Artworks from Uploads into this Album</h2>
                </div>
            </main>
        );
    }

    deleteAlbum = (id, e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        ArtworkActions.delete(this.props.currentAlbum, id);
    };
}
