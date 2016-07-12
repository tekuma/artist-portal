//Libs
import React      from 'react';
import filesaver  from 'file-saver';
import firebase   from 'firebase';
import Dropzone   from 'react-dropzone';
// Files
import Artwork    from '../artwork/Artwork.jsx';
import confirm    from '../confirm-dialog/ConfirmFunction';
import Views      from '../../constants/Views';




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
        if (nextProps.userInfo != null) {
            let artworks = nextProps.userInfo.artworks;
            for (var artworkID in artworks) {
                if (artworks.hasOwnProperty(artworkID)) {
                    let artwork = artworks[artworkID];
                    if (artwork.album == nextProps.currentAlbum) {
                        album.push(artwork);
                    }
                }
            }
        } else {
            console.log("userInfo is undefined in ArtworksLayout.jsx");
        }
        // When the currentAlbum is switched (by clicking on a new album), we load new artworks into view
        this.setState({album});
    }


    render() {
        if(this.state.album.length == 0) {
            if (this.props.currentAlbum == "Uploads") {
                return this.renderEmptyUploads();
            } else {
                return this.renderEmptyAlbum();
            }
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
            <Dropzone
                className="artworks"
                accept="image/*"
                disableClick
                onDrop={this.onDrop}
                ref="dropzone"
                style={this.props.managerIsOpen ? (window.innerWidth * 0.3 > 250) ? null : styleSmallScreen : styleManagerClosed}>{album.map(artwork => {
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
            </Dropzone>
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
                    className="empty-album">
                    <h2>Fill album by Dragging Artworks from Uploads</h2>
                </div>
            </main>
        );
    }

    renderEmptyUploads = () => {
        var styleManagerClosed = {
            width: window.innerWidth - 40,
            height: window.innerHeight - 60
        };

        var styleSmallScreen = {
            width: window.innerWidth - 250,
            height: window.innerHeight - 60
        };

        var styleLargeScreen = {
            width: window.innerWidth * 0.7,
            height: window.innerHeight - 60
        };

        return (
            <Dropzone
                style={this.props.managerIsOpen ? (window.innerWidth * 0.3 > 250) ? styleLargeScreen : styleSmallScreen : styleManagerClosed}
                className="artwork-upload-box"
                accept="image/*"
                onDrop={this.onDrop}>
                <h3 className="upload-writing big">Drop Files Here</h3>
                <h3 className="upload-writing small">or Click to Upload</h3>
            </Dropzone>
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

    onDrop = (files) => {
        this.props.setUploadedFiles(files);
        this.props.changeAppLayout(Views.ARTWORKS);
        console.log('Set uploaded files: ', files);
    }
}
