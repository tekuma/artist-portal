//Libs
import React      from 'react';
import filesaver  from 'file-saver';
import firebase   from 'firebase';
// Files
import Artwork    from '../artwork/Artwork.jsx';
import confirm    from '../confirm-dialog/ConfirmFunction';




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
                            onMove={this.move}
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
                    <h2>Click to Upload Artworks</h2>
                    <h3>or drag Uploaded Artworks from Uploads</h3>
                </div>
            </main>
        );
    }

    /**
     * [description]
     * @param  {String}  id [description]
     * @param  {String}  oldAlbumName - name of the album that art was moved from
     */
    editArtwork = (id,oldAlbumName) => {
        this.props.changeCurrentEditArtwork(id,oldAlbumName);  // Attach Artwork ID to View
        this.props.toggleEditArtworkDialog();    // Open Edit Dialog
    }

    /**
     * Deletes a given artwork from the firebase DB.
     * @param  {[string]} id [description]
     * @param  {[type]} e  [description]
     */
    deleteArtwork = (id, e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        confirm('Are you sure you want to delete this artwork?').then(
            () => {
                // Proceed Callback
                this.props.deleteArtwork(id);
            },
            () => {
                // Cancel Callback
                return;
            }
        );
    }

    move = (sourceId, targetId) => {
        console.log("Entered move");
        const userPath = 'public/onboarders/';
        const thisUID = firebase.auth().currentUser.uid;
        let path = userPath + thisUID + "/albums";
        let albumRef = firebase.database().ref(path);
        albumRef.transaction( (data) => {
            let albumsLength = Object.keys(data).length;
            let sourceData;
            let albumIndex;
            let sourceIndex;
            let targetIndex;

            for (let i = 0; i < albumsLength; i++) {
                let artworksLength = Object.keys(data[i]['artworks']).length;
                let found = false;
                let previousData;
                for (let j = 0; i < artworksLength; j++) {
                    if (found) {
                        let dataToPlace = previousData;
                        previousData = data[i]['artworks'][j];
                        data[i]['artworks'][j] = dataToPlace;
                    } else if (data[i]['artworks'][j] == targetId) {
                        previousData = data[i]['artworks'][j];
                        data[i]['artworks'][j] = sourceId;
                    }
                }
            }
            return data;
        });

    }
}
