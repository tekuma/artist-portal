import React from 'react';
import uuid from 'node-uuid';
import Artwork from '../artwork/Artwork';
import ArtworkActions from '../../actions/ArtworkActions';
import ArtworkStore from '../../stores/ArtworkStore';
import confirm from '../confirm-dialog/ConfirmFunction';

export default class ArtworksLayout extends React.Component {
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
        this.setState({});
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
            <main style={this.props.managerIsOpen ? (window.innerWidth * 0.3 > 250) ? null : styleSmallScreen : styleManagerClosed} >{album.map(artwork => {
                    return (
                        <Artwork
                            key={artwork.id}
                            onEdit={this.editArtwork}
                            onDelete={this.deleteArtwork}
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
            <main style={this.props.managerIsOpen ? (window.innerWidth * 0.3 > 250) ? null : styleSmallScreen : styleManagerClosed} >
                <a href="/">
                    <div className="empty-album">
                        <h2>This album is empty</h2>
                    </div>
                </a>
            </main>
        );
    }

    editArtwork = (id) => {
        this.props.changeCurrentEditArtwork(id);  // Attach Artwork ID to View
        this.props.toggleEditArtworkDialog();    // Open Edit Dialog
    }

    deleteArtwork = (id, e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        confirm('Are you sure you want to delete this artwork?').then(
            () => {
                // Proceed Callback
                ArtworkActions.delete(id);
            },
            () => {
                // Cancel Callback
                return;
            }
        );
    }
}
