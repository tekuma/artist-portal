//Libs
import React      from 'react';
import firebase   from 'firebase';
import filesaver  from 'file-saver';
import Dropzone   from 'react-dropzone';
import update     from 'react-addons-update';
import Masonry    from 'react-masonry-component';

// Files
import Artwork    from './Artwork';
import confirm    from '../confirm_dialog/ConfirmFunction';
import Views      from '../../constants/Views';


/**
 * TODO
 */
export default class ArtworkManager extends React.Component {
    state = {
        album :[] // list of Artwork objects in the current album
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("----- ArtworkManager");
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

    componentDidMount() {
        console.log("+++++ ArtworkManager");
        this.props.changeAlbum("Miscellaneous");
        if (this.props.user && this.props.user.albums) {

            let albumIndex;
            let album         = [];
            let thisAlbumName = this.props.currentAlbum; //passed from PostAuth
            let user          = this.props.user;
            let albums        = user['albums'];
            let albumsLength    = Object.keys(albums).length;

            // Look through the albums branch to find which album we are in
            // we have the album name, we need the index of it.
            for (let i = 0; i < albumsLength; i++) {
                if (thisAlbumName == albums[i]['name']) {
                    albumIndex = i;
                    break;
                }
            }
            //FIXME if we never match, albumIndex will be undefined

            let artworks = albums[albumIndex]['artworks'];

            if (artworks) {
                let artworksLength = Object.keys(artworks).length;

                // Load relevant artworks to state album
                for (let i = 0; i < artworksLength; i++) {
                    let artworkUID = artworks[i];
                    let artwork    = user['artworks'][artworkUID];
                    album.push(artwork);
                }
            }

            this.setState({
                album : album
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && nextProps.user.albums &&
            nextProps.actingUID == nextProps.user.uid) {
            // last check guards against having a .on() from a previous acting
            // user still be attached, and feed updates about a previous user.

            let albumIndex;
            let album         = [];
            let thisAlbumName = nextProps.currentAlbum; //passed from PostAuth
            let user          = nextProps.user;
            let albums        = user['albums'];
            let albumsLength  = Object.keys(albums).length;

            // Look through the albums branch to find which album we are in
            // we have the album name, we need the index of it.
            for (let i = 0; i < albumsLength; i++) {
                if (thisAlbumName == albums[i]['name']) {
                    albumIndex = i;
                    break;
                }
            }
            //FIXME if we never match, albumIndex will be undefined

            let artworks = albums[albumIndex]['artworks'];

            if (artworks) {
                let artworksLength = Object.keys(artworks).length;

                // Load relevant artworks to state album
                for (var i = 0; i < artworksLength; i++) {
                    let artworkUID = artworks[i];
                    let artwork    = user['artworks'][artworkUID];
                    // console.log(artwork);
                    album.push(artwork);
                }
            }
            // console.log("ALBUM=>",album);
            this.setState({
                album: album
            });
        }
    }


// ============= Flow Control ===============

    renderArtworks = () => {
        const album = this.state.album;

        let styleManagerClosed = {
            width: window.innerWidth - 40,
            height: window.innerHeight - 60
        };

        let styleManagerOpen = {
            width: window.innerWidth * 0.7,  // Album Manager is 30% of Screen
            height: window.innerHeight - 60
        };

        let styleLargeScreen = {
            width: window.innerWidth - 440,
            height: window.innerHeight - 60
        };

        let styleSmallScreen = {
            width: window.innerWidth - 250,
            height: window.innerHeight - 60
        };

        let fixedWidth = {
            width: window.innerWidth,
            height: window.innerHeight - 60
        };

        let masonryOptions = {
            transitionDuration: 0
        };

        return (
            <Dropzone
                style={this.props.managerIsOpen ?
                            (window.innerWidth * 0.3 > 440) ?
                                styleLargeScreen :
                                (window.innerWidth * 0.3 > 250) ?
                                    styleManagerOpen :
                                    (window.innerWidth > 410) ?
                                        styleSmallScreen :
                                        fixedWidth
                                : styleManagerClosed}
                disableClick
                className       ="artworks"
                accept          ="image/png, image/jpeg"
                onDrop          ={this.onDrop}
                ref             ="dropzone"
                >
                <Masonry
                    className       ="artworks no-margin"
                    style           ={this.props.managerIsOpen ? (window.innerWidth * 0.3 > 250) ? null : styleSmallScreen : styleManagerClosed}
                    elementType={'div'}
                    options={masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
               >

                {album.map(artwork => {
                    return (
                        <Artwork
                            paths       ={this.props.paths}
                            currentAlbum={this.props.currentAlbum}
                            key         ={artwork.id}
                            onSubmit    ={this.submitArtwork}
                            onEdit      ={this.editArtwork}
                            onDelete    ={this.deleteArtwork}
                            onDownload  ={this.downloadArtwork}
                            onMove      ={this.move}
                            artwork     ={artwork} />
                    );
                })}
                </Masonry>
            </Dropzone>

        );
    };

    renderEmptyAlbum = () => {
        let styleManagerClosed = {
            width: window.innerWidth - 40,
            height: window.innerHeight - 60
        };

        let styleManagerOpen = {
            width: window.innerWidth * 0.7,  // Album Manager is 30% of Screen
            height: window.innerHeight - 60
        };

        let styleLargeScreen = {
            width: window.innerWidth - 440,
            height: window.innerHeight - 60
        };

        let styleSmallScreen = {
            width: window.innerWidth - 250,
            height: window.innerHeight - 60
        };

        let fixedWidth = {
            width: window.innerWidth,
            height: window.innerHeight - 60
        };

        return (
            <Dropzone
                style={this.props.managerIsOpen ?
                            (window.innerWidth * 0.3 > 440) ?
                                styleLargeScreen :
                                (window.innerWidth * 0.3 > 250) ?
                                    styleManagerOpen :
                                    (window.innerWidth > 410) ?
                                        styleSmallScreen :
                                        fixedWidth
                                : styleManagerClosed}
                className   ="artwork-upload-box"
                accept      ="image/png, image/jpeg"
                onDrop      ={this.onDrop}>
                <img id="empty-album-icon" src="assets/images/icons/drop-gradient.svg"/>
                <h3 className="upload-writing big">Drop Files Here</h3>
                <h3 className="upload-writing small">or Click to Upload</h3>
                <h3 className="upload-writing tiny">(Max File Size: 20Mb)</h3>
            </Dropzone>
        );
    }

    renderEmptyUploads = () => {

        let styleManagerClosed = {
            width: window.innerWidth - 40,
            height: window.innerHeight - 60
        };

        let styleManagerOpen = {
            width: window.innerWidth * 0.7,  // Album Manager is 30% of Screen
            height: window.innerHeight - 60
        };

        let styleLargeScreen = {
            width: window.innerWidth - 440,
            height: window.innerHeight - 60
        };

        let styleSmallScreen = {
            width: window.innerWidth - 250,
            height: window.innerHeight - 60
        };

        let fixedWidth = {
            width: window.innerWidth,
            height: window.innerHeight - 60
        };

        return (
            <Dropzone
                style={this.props.managerIsOpen ?
                            (window.innerWidth * 0.3 > 440) ?
                                styleLargeScreen :
                                (window.innerWidth * 0.3 > 250) ?
                                    styleManagerOpen :
                                    (window.innerWidth > 410) ?
                                        styleSmallScreen :
                                        fixedWidth
                                : styleManagerClosed}
                className   ="artwork-upload-box"
                accept      ="image/png, image/jpeg"
                onDrop      ={this.onDrop}>
                <img id="empty-album-icon" src="assets/images/icons/drop-gradient.svg"/>
                <h3 className="upload-writing big">Drop Files Here</h3>
                <h3 className="upload-writing small">or Click to Upload</h3>
                <h3 className="upload-writing tiny">(Max File Size: 20Mb)</h3>
            </Dropzone>
        );
    }

// ============= Methods ===============

    /**
     * [description]
     * @param  {String}  id [description]
     * @param  {Array}  oldAlbumName - name of the albums the artwork is currently in
     */
    editArtwork = (id, submitted, oldAlbumName) => {
        this.props.changeCurrentEditArtwork(id, oldAlbumName);  // Attach Artwork ID to View

        if(submitted) {
            this.props.toggleArtworkDetailDialog();    // Open Artwork Detai Dialog

        } else {
            this.props.toggleEditArtworkDialog();    // Open Edit Dialog
        }
    }

    /**
     * Deletes a given artwork from the firebase DB.
     * @param  {[string]} id [description]
     * @param  {[type]} e  [description]
     */
    deleteArtwork = (id, submitted, e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        if (submitted) {
            confirm("Are you sure you want to delete this artwork?", "Please contact Tekuma directly if you would like this artwork to be completely removed from Tekuma's service").then(
                () => {
                    // Proceed Callback
                    this.props.deleteArtwork(id);
                },
                () => {
                    // Cancel Callback
                    return;
                }
            );
        } else {
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
    }

    submitArtwork = (artwork, e) => {
        e.stopPropagation();

        if (artwork.title == "" || artwork.album == "" || artwork.artist == "" || artwork.year == "" || artwork.description == "") {
            let errors = {
                title: false,
                album: false,
                artist: false,
                year: false,
                description: false
            }

            for (let type in errors) {
                console.log(type);
                if (artwork[type] == "") {
                    errors[type] = true
                }
            }

            let message = "Submit failed. You have not filled in the following artwork fields: ";

            for (let error in errors) {
                if (errors[error]) {
                    let capitalized = error.charAt(0).toUpperCase() + error.slice(1);
                    message += capitalized + ", ";
                }
            }

            message = message.substring(0, message.length - 2);

            this.props.sendToSnackbar(message);
        } else {
            confirm("Are you sure you want to submit this artwork?", "Submitting this artwork means you agree to Tekuma's Terms of Use and give Tekuma permission to use your artwork in it's curation service. In addition, you will no longer be able to edit this artwork after this action.").then(
                () => {
                    // Proceed Callback
                    let message = "Your artwork has been submitted to Tekuma! Keep up to date with submission details in your Gallery.";
                    this.props.onSubmit(artwork.id);

                    this.props.sendToSnackbar(message);
                },
                () => {
                    // Cancel Callback
                    return;
                }
            );
        }
    }

    /**
     * [move description]
     * @param  {[type]} albumName [description]
     * @param  {[type]} sourceId  [description]
     * @param  {[type]} targetId  [description]
     */
    move = (albumName ,sourceId, targetId) => {
        console.log("Entered move");
        console.log("Source ID: ", sourceId);
        console.log("Target ID: ", targetId);

        const albumRef  = firebase.database().ref(this.props.paths.albums);

        albumRef.transaction((data) => {
            let albumIndex;
            let sourceIndex;
            let targetIndex;
            let albumsLength = Object.keys(data).length;

            // Find Artworks
            for (let i = 0; i < albumsLength; i++) {
                let artworks = data[i]['artworks'];

                if(data[i]['name'] == albumName) {
                    if (artworks) {
                        let artworksLength = Object.keys(data[i]['artworks']).length;

                        for (let j = 0; j < artworksLength; j++) {
                            if (data[i]['artworks'][j] == sourceId){
                                sourceIndex = j;
                                albumIndex = i;

                            } else if (data[i]['artworks'][j] == targetId) {
                                targetIndex = j;
                                albumIndex = i;

                            }
                        }
                    }
                }
            }
            // array.splice(start, deleteCount[, item1[, item2[, ...]]])
            // start:
            //  -> index at which to start changing the array (with origin 0)
            // deleteCount:
            //  -> An integer indicating the number of old array elements to remove
            //  -> If deleteCount is 0, no elements are removed
            // item1, item2, ...
            //  -> The elements to add to the array, beginning at the start index
            //
            // In the example above, we are deleting 1 element starting from sourceAlbumIndex,
            // then we are removing 0 elements starting from targetAlbumIndex
            // and adding sourceAlbum before targetAlbumIndex

            let albumArtworks = update(data[albumIndex]['artworks'], {
                $splice: [[sourceIndex, 1],[targetIndex, 0, sourceId]]
            });

            data[albumIndex]['artworks'] = albumArtworks;
            return data;
        });
    }

    /**
     * [onDrop description]
     * @param  {[type]} files [description]
     */
    onDrop = (files) => {
        if (files.length == 0) {
            return;
        } else {
            this.props.setUploadedFiles(files);
            console.log('Set uploaded files: ', files);
        }
    }

}
