import React from 'react';
import uuid from 'node-uuid';
import Artwork from './artwork/Artwork.jsx';
import ArtworkActions from '../actions/ArtworkActions';
import ArtworkStore from '../stores/ArtworkStore';

export default class ArtworkDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            album: ArtworkStore.getState().artworks.filter(artwork => artwork.album == this.props.currentAlbum)
        }
    }

    componentDidMount() {
        ArtworkStore.listen(this.storeChanged);
    }

    componentWillUnmount() {
        ArtworkStore.unlisten(this.storeChanged);
    }

    componentWillReceiveProps(nextProps) {
        this.state.album = ArtworkStore.getState().artworks.filter(artwork => artwork.album == nextProps.currentAlbum);
        // When the currentAlbum is switched (by clicking on a new album), we load new artworks into view
    }

    storeChanged = (store) => {
        // Without a property initializer `this` wouldn't
        // point at the right context because it defaults to
        // `undefined` in strict mode.
        this.setState({
            album: ArtworkStore.getState().artworks.filter(artwork => artwork.album == this.props.currentAlbum)
        });
    };

    render() {
        if(ArtworkStore.getState().artworks.filter(artwork => artwork.album == this.props.currentAlbum).length == 0) {
            // Only render empty album if album is empty
            return this.renderEmptyAlbum();
        } else {
            return this.renderArtworks();
        }
    }

    renderArtworks = () => {
        const album = this.state.album

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
                            onMove={ArtworkActions.move}
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
                <a href="/">
                    <div className="empty-album">
                        <h2>Album is Empty</h2>
                    </div>
                </a>
            </main>
        );
    }

    deleteAlbum = (id, e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        ArtworkActions.delete(id);
    };
}
