import React from 'react';
import Artwork from '../artwork/Artwork.jsx';
import ArtworkActions from '../../actions/ArtworkActions';
import ArtworkStore from '../../stores/ArtworkStore';
import confirm from '../confirm-dialog/ConfirmFunction';
import filesaver from 'file-saver';
import firebase from 'firebase';



export default class ArtworksLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            album: []
        }
    }

    componentDidMount() {
         function getArtworks(that) {
            let album = [];
            let artworks = that.props.userInfo.artworks;
            for (var artworkID in artworks) {
                if (artworks.hasOwnProperty(artworkID)) {
                    let artwork = artworks[artworkID];
                    if (artwork.album == that.props.currentAlbum) {
                        album.push(artwork);
                    }
                }
            }
            // When the currentAlbum is switched (by clicking on a new album), we load new artworks into view
            that.setState({album});
        }

        setTimeout(getArtworks.bind(null, this), 50);
    }

    componentWillReceiveProps(nextProps) {
        let album = [];
        let artworks = nextProps.userInfo.artworks;
        for (var artworkID in artworks) {
            if (artworks.hasOwnProperty(artworkID)) {
                let artwork = artworks[artworkID];
                if (artwork.album == nextProps.currentAlbum) {
                    album.push(artwork);
                }
            }
        }
        // When the currentAlbum is switched (by clicking on a new album), we load new artworks into view
        this.setState({album});
    }


    render() {
        if(this.state.album.length == 0) {
            // Only render empty album if album is empty
            return this.renderEmptyAlbum();
        } else {
            return this.renderArtworks();
        }
    }

    renderArtworks = () => {
        // Import Cloud storage and datebase


        const album = this.state.album;

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
                            onDownload={this.downloadArtwork}
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
                <div
                    className="empty-album"
                    onClick={this.props.changeAppLayout.bind({}, 'Upload')}>
                    <h2>This album is empty. Add artworks by dropping artworks from the Uploads album.</h2>
                </div>
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
