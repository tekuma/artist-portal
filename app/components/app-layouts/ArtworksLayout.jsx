//Libs
import React      from 'react';
import filesaver  from 'file-saver';
import firebase   from 'firebase';
import Dropzone   from 'react-dropzone';
import update from 'react-addons-update';
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

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidMount() {
        let thisUID = firebase.auth().currentUser.uid;
        let albumPath = `public/onboarders/${thisUID}/albums`;
        let albumRef = firebase.database().ref(albumPath);

        albumRef.on('value', (snapshot) => {
            let album = [];
            let albumIndex;
            let albums = snapshot.val();
            let albumsLength = Object.keys(albums).length;

            // Find album that corresponds to current album
            for (let i = 0; i < albumsLength; i++) {
                if (this.props.currentAlbum == albums[i]['name']) {
                    albumIndex = i;
                    break;
                }
            }

            let artworks = albums[albumIndex]['artworks'];
            let artworksLength = Object.keys(artworks).length;
            // Load relevant artworks to state album
            for(let i = 0; i < artworksLength; i++) {
                let artworkUID = artworks[i];
                let artwork = this.props.userInfo.artworks[artworkUID];
                album.push(artwork);
            }

            this.setState({album});
        });
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
        const thisUID = firebase.auth().currentUser.uid;
        const albumPath = `public/onboarders/${thisUID}/albums`;
        const albumRef = firebase.database().ref(albumPath);

        albumRef.transaction((data) => {
            let albumsLength = Object.keys(data).length;
            let sourceFound = false;
            let targetFound = false;
            let albumIndex;
            let sourceIndex;
            let targetIndex;
            console.log("Here is Albums: ", data);
            // Find Artworks
            for (let i = 0; i < albumsLength; i++) {
                    console.log("Current iteration: ", i);
                    let artworksLength = Object.keys(data[i]['artworks']).length;

                    for (let j = 0; j < artworksLength; j++) {
                        if (data[i]['artworks'][j] === sourceId){
                            sourceFound = true;
                            sourceIndex = j;
                            albumIndex = i;
                        } else if (data[i]['artworks'][j] === targetId) {
                            targetFound = true;
                            targetIndex = j;
                            albumIndex = i;
                        }
                    }
            }

            let albumArtworks = update(data[albumIndex]['artworks'], {
                $splice: [[sourceIndex, 1],[targetIndex, 0, sourceId]]
            });

            data[albumIndex]['artworks'] = albumArtworks;
            return data;
        });
    }

    onDrop = (files) => {
        if (files.length == 0) {
            return;
        } else {
            this.props.setUploadedFiles(files);
            this.props.changeAppLayout(Views.ARTWORKS);
            console.log('Set uploaded files: ', files);
        }
    }
}
