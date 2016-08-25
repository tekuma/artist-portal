// Libs
import React                        from 'react';
import firebase                     from 'firebase';
import uuid                         from 'node-uuid';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
import update                       from 'react-addons-update';

// Files
import Albums                       from './Albums.jsx';
import confirm                      from '../confirm_dialog/ConfirmFunction';
import AlbumToggler                 from './AlbumToggler.jsx';

/**
 * TODO
 */
export default class ArtworksAlbumManager extends React.Component {
    state = {
        albums    :{}, // album objects other than uploads
        uploads   :{}, // the uploads album object
        albumNames:[]  // array of strings of album names
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ArtworksAlbumManager");
    }

    render() {
        if(this.props.managerIsOpen) {
            return this.openedManager();
        } else {
            return this.closedManager();
        }
    }

    componentDidMount() {
        console.log("+++++ArtworksAlbumManager");

        if (this.props.user && this.props.user.albums) {
            let user       = this.props.user;
            let allAlbums  = user['albums'];

            let albums  = {};
            let uploads = allAlbums[0];

            let albumKeys  = Object.keys(allAlbums);
            let albumNames = ["Miscellaneous"];
            //NOTE 'i' starting at 1 to ignore uploads album
            for (let i = 1; i < albumKeys.length; i++) {
                let key = albumKeys[i];
                albumNames.push(allAlbums[key]['name']);
                albums[key] = allAlbums[key];
            }

            //Set albums to state
            this.setState({
                albums    :albums,
                uploads   :uploads,
                albumNames:albumNames
            });

        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && nextProps.user.albums) {
            let user       = nextProps.user;
            let allAlbums  = user['albums'];

            let albums  = {};
            let uploads = allAlbums[0];

            let albumKeys  = Object.keys(allAlbums);
            let albumNames = ["Miscellaneous"];

            //NOTE 'i' starting at 1 to ignore uploads album
            for (let i = 1; i < albumKeys.length; i++) {
                let key = albumKeys[i];
                albumNames.push(allAlbums[key]['name']);
                albums[key] = allAlbums[key];
            }

            //Set albums to state
            this.setState({
                albums    :albums,
                uploads   :uploads,
                albumNames:albumNames
            });
        }
    }

// ============= Flow Control ===============

    openedManager = () => {
        const addAlbumTooltip = (
            <Tooltip
                id="add-album-tooltip"
                className="tooltip">
                Create new album
            </Tooltip>
        );

        return (
            <section
                style={{
                    height: window.innerHeight - 60,
                    right: 0
                }}
                className="album-manager artworks-manager">
                <AlbumToggler
                    height          ={window.innerHeight - 60}
                    float           ={"left"}
                    background      ={"#222222"}
                    managerIsOpen   ={this.props.managerIsOpen}
                    toggleManager   ={this.props.toggleManager}/>
                <Albums
                    albums             ={this.state.albums}
                    thumbnail          ={this.props.thumbnail}
                    uploads            ={this.state.uploads}
                    onEditName         ={this.editAlbumName}
                    emptyMisc          ={this.emptyMisc}
                    downloadAlbum      ={this.downloadAlbum}
                    onEdit             ={this.editAlbum}
                    editMisc           ={this.editMisc}
                    onDelete           ={this.deleteAlbum}
                    currentAlbum       ={this.props.currentAlbum}
                    changeAlbum        ={this.props.changeAlbum}
                    user               ={this.props.user}
                    changeArtworkAlbum ={this.props.changeArtworkAlbum} />
                <OverlayTrigger
                    placement   ="left"
                    overlay     ={addAlbumTooltip}>
                    <button
                        onClick     ={this.addAlbum}
                        onTouchTap  ={this.addAlbum}
                        className   ="add-album" >
                        <img src='assets/images/icons/plus-white.svg' />
                    </button>
                </OverlayTrigger>
            </section>
        );
    };

    closedManager = () => {

        return (
            <section
                style={{
                height: window.innerHeight - 60,
                right: -1 * document.getElementsByClassName('album-manager')[0].clientWidth + 40
                }}
                className="album-manager artworks-manager">
                <AlbumToggler
                    height          ={window.innerHeight - 60}
                    float           ={"left"}
                    background      ={"#222222"}
                    managerIsOpen   ={this.props.managerIsOpen}
                    toggleManager   ={this.props.toggleManager}/>
                <Albums
                    albums          ={this.state.albums}
                    uploads         ={this.state.uploads}
                    onEdit          ={this.editAlbum}
                    editMisc        ={this.editMisc}
                    onDelete        ={this.deleteAlbum}
                    emptyMisc       ={this.emptyMisc}
                    currentAlbum    ={this.props.currentAlbum}
                    changeAlbum     ={this.props.changeAlbum}
                    user            ={this.props.user} />
                <div
                    onClick     ={this.addAlbum}
                    onTouchTap  ={this.addAlbum}
                    className   ="add-album" >
                    <img src='assets/images/icons/plus-white.svg' />
                </div>
            </section>
        );
    }

// ============= Methods ===============

    /**
     * [description]
     * @return {[type]} [description]
     */
    addAlbum = () => {
        const thisUID    = firebase.auth().currentUser.uid;
        let newAlbumName = this.getUniqueNewAlbumName();
        let albums       = this.state.albums;


        console.log(this.state.albums, "thisstatealbums");
        let albumPath = `public/onboarders/${thisUID}/albums`;
        let albumRef  = firebase.database().ref(albumPath);

        albumRef.transaction( (data) => {
            let albumLength = Object.keys(data).length;
            data[albumLength] = {
                name: newAlbumName,
                artist: "",
                year: "",
                tags: [],
                description: ""
            };
            console.log(albumLength, "albumLength");
            console.log("data:" ,data);
            return data;
        }, ()=>{
            console.log(">>addAlbum successful");
        });

        if(!this.props.managerIsOpen) {
            this.props.toggleManager();
        }

    };

    /**
     * TODO
     * @param  {String}  id [description]
     */
    editAlbum = (id, e) => {
        e.stopPropagation();
        e.preventDefault();

        this.props.changeCurrentEditAlbum(id);  // Attach Album ID to View
        this.props.toggleEditAlbumDialog();    // Open Edit Dialog
    }

    /**
     * TODO
     * @param  {String}  id [description]
     */
    editMisc = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Entered editMisc");
        this.props.changeCurrentEditAlbum(0);  // Attach Album ID to View
        this.props.toggleEditMiscAlbumDialog();    // Open Edit Dialog
    }

    /**
     * [description]
     * @param  {[type]} index [index of album to delete]
     * @param  {[type]} e  - element
     */
    deleteAlbum = (index, e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        if (index === 0) {
            console.log(">>>ERROR: attempting to delete 'Miscellaneous' album");
            return;
        }
        const thisUID = firebase.auth().currentUser.uid;
        confirm('Are you sure you want to delete this album?').then( () => {

                // # they clicked "yes", so
                // First, Delete all attributed artworks
                // check if album is empty, if so bi-pass first step.
                this.props.changeAlbum("Miscellaneous");

                if (this.props.user.albums[index]['artworks']) {
                    let artLength = Object.keys(this.props.user.albums[index]['artworks']).length;
                    for (let i = 0; i < artLength; i++) {
                        let thisArtKey = this.props.user.albums[index]['artworks'][i];
                        let artworkRef =firebase.database().ref(`public/onboarders/${thisUID}/artworks/${thisArtKey}`);
                        artworkRef.set(null).then(()=>{
                            console.log(">> Artwork deleted successfully");
                        });
                    }
                }

                // then Delete this album branch, and manually update indexes.
                let path = `public/onboarders/${thisUID}/albums`;
                let albumRef = firebase.database().ref(path);
                albumRef.transaction((data) => {
                    let albums = update(data, {
                        $splice: [[index, 1]]
                    });

                    return albums;
                });
            }, () => {
                // they clicked 'no'
                return;
            }
        );
    }

    /**
     * This method removes all artworks from the Miscellaneous album.
     * -gather all artwork UIDs that are in uploads
     * -set uploads artworks array to []
     * -push null to each artwork ref in the DB artworks branch.
     * @return {[type]} [description]
     */
    emptyMisc = (e) => {
        e.stopPropagation();
        confirm('Are you sure you want to empty the Miscellaneous album?').then( () => {
            const Misc  =  this.props.user.albums[0];
            const thisUID  = firebase.auth().currentUser.uid;
            const userPath = `public/onboarders/${thisUID}`;
            const userRef  = firebase.database().ref(userPath);

            // Set Miscellaneous artwork branch to null
            userRef.child("albums/0/artworks").set(null).then(()=>{
                console.log("Miscellaneous set to null");
            });

            // Delete artworks in Miscellaneous
            if (Misc['artworks']) {
                console.log("Entered If of Empty Misc");
                let artLength = Object.keys(Misc['artworks']).length;
                for (let i = 0; i < artLength; i++) {
                    let thisArtKey = Misc['artworks'][i];
                    let artworkRef =firebase.database().ref(`public/onboarders/${thisUID}/artworks/${thisArtKey}`);
                    artworkRef.set(null).then(()=>{
                        console.log(">> Artwork deleted successfully");
                    });
                }
            }


        }, () => {
            // they clicked 'no'
            return;
        });
    }

    /**
     * TODO
     * @param  {Int} index [the index of the album to download]
     */
    downloadAlbum = (index) => {

        let album = this.props.user.albums[index];

        let blobs = [];
        for (let i   = 0; i < Object.keys(album).length; i++) {
            let artUID = album[i];
            let artURL = this.props.user.artworks[artUID]['fullsize_url'];
            let artIMG = new Image;
            artIMG.src = localURL;
            // Load the blob as an <Image>
            artIMG.addEventListener('load', ()=>{
                let canvas    = document.createElement("canvas");
                canvas.height = artIMG.height;
                canvas.width  = artIMG.width;
                let ctx       = canvas.getContext("2d");

                //Draw the Image to canvas, args: img,x0,y0,scaled w, scaled h
                ctx.drawImage(fullSizeImage,0,0);
                canvas.toBlob( (thisBlob)=>{
                    blobs.push(thisBlob);
                });
            });
        }

        while (blobs.length < album.length ) {
            //Wait..... FIXME FIXME FIXME
        }
        console.log(blobs);

    }

    /**
     * TODO TODO TODO
     * @return {[type]} [description]
     */
    getUniqueNewAlbumName = () => {
        let untitledIntegersUsed = [];
        let untitledAlbumIndex = 1;
        let nextAlbumName = "Untitled ";

        let albumKeys = Object.keys(this.state.albums);

        for (let i = 0; i < albumKeys.length; i++) {
            let thisKey   = albumKeys[i];

            let albumName = this.state.albums[thisKey]['name'];
            let isUntitledAlbum = albumName.search("Untitled");  // Returns index of start of term if contained, otherwise -1

            if(isUntitledAlbum != -1) { // True if contains untitled
                let untitledNumber = albumName.split(" ")[1] // Get number
                if(!isNaN(untitledNumber)) {
                    untitledIntegersUsed.push(eval(untitledNumber));
                    // Only add to array if it is a number
                }
            }
        }

        if(untitledIntegersUsed.length == 0) {
            nextAlbumName += "1";
        } else {
            // Determines whether final index has been used
            // Increments it if it has been used
            while(untitledIntegersUsed.indexOf(untitledAlbumIndex) != -1) {
                untitledAlbumIndex += 1;
            }
            nextAlbumName += untitledAlbumIndex.toString();
        }
        console.log(nextAlbumName);
        return nextAlbumName;
    }
}
