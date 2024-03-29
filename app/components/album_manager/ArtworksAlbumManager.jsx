// Libs
import React                        from 'react';
import firebase                     from 'firebase';
import uuid                         from 'uuid';
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
        return this.manager();
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

    manager = () => {
        const addAlbumTooltip = (
            <Tooltip
                id="add-album-tooltip"
                className="tooltip">
                Create new album
            </Tooltip>
        );

        const openManager = {
            height: window.innerHeight - 60,
            right: 0
        }

        let managerWidth = 200; // Magic Number to Instantiate

        if (document.getElementsByClassName('album-manager')[0]) {
            managerWidth = document.getElementsByClassName('album-manager')[0].offsetWidth;
        }

        const closedManager = {
            height: window.innerHeight - 60,
            right: -1 * managerWidth + 40
        }

        return (
            <section
                style={this.props.managerIsOpen ? openManager: closedManager}
                className="album-manager artworks-manager">
                <AlbumToggler
                    height          ={window.innerHeight - 60}
                    float           ={"left"}
                    background      ={"#222222"}
                    managerIsOpen   ={this.props.managerIsOpen}
                    toggleManager   ={this.props.toggleManager}/>
                <Albums
                    paths={this.props.paths}
                    albums             ={this.state.albums}
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

// ============= Methods ===============

    /**
     * Creates a new, empty album.
     * @return {String} [the name of the album created.]
     */
    addAlbum = () => {
        let newAlbumName = this.getUniqueNewAlbumName();
        let albumRef     = firebase.database().ref(this.props.paths.albums);

        albumRef.transaction( (data) => {
            let albumLength = Object.keys(data).length;
            data[albumLength] = {
                name       : newAlbumName,
                artist     : "",
                year       : "",
                tags       : [],
                description: ""
            };
            return data;
        }, ()=>{
            console.log(">> Album Created.");
        });

        if(!this.props.managerIsOpen) {
            this.props.toggleManager();
        }
        return newAlbumName;
    };

    /**
     * Capusle used to call album editing methods from props.
     * @param  {String}  id [?]
     */
    editAlbum = (id, e) => {
        e.stopPropagation();
        e.preventDefault(); // ??

        this.props.changeCurrentEditAlbum(id);  // Attach Album ID to View
        this.props.toggleEditAlbumDialog();    // Open Edit Dialog
    }

    /**
     * TODO
     * @param  {String}  id [description]
     */
    editMisc = (e) => {
        e.stopPropagation(); // ?
        e.preventDefault();  // ?
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

        confirm('Are you sure you want to delete this album?').then( () => {
                // # they clicked "yes", so
                // First, Delete all attributed artworks
                // check if album is empty, if so bi-pass first step.
                this.props.changeAlbum("Miscellaneous");

                if (this.props.user.albums[index]['artworks']) {
                    let artLength = Object.keys(this.props.user.albums[index]['artworks']).length;
                    for (let i = 0; i < artLength; i++) {
                        let thisArtKey = this.props.user.albums[index]['artworks'][i];
                        let thisArtPath= this.props.paths.art + thisArtKey;
                        firebase.database().ref(thisArtPath).set(null).then(()=>{
                            console.log(">> Artwork deleted successfully");
                        });
                    }
                }

                // then Delete this album branch, and manually update indexes.
                let albumRef = firebase.database().ref(this.props.paths.albums);
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
            const Misc      =  this.props.user.albums[0];
            const albumsRef = firebase.database().ref(this.props.paths.albums);

            // Set Miscellaneous artwork branch to null
            albumsRef.child("0/artworks").set(null).then(()=>{
                console.log("Miscellaneous set to null");
            });

            // Delete artworks in Miscellaneous
            if (Misc['artworks']) {
                console.log("Entered If of Empty Misc");
                let artLength = Object.keys(Misc['artworks']).length;
                for (let i = 0; i < artLength; i++) {
                    let thisArtKey = Misc['artworks'][i];
                    let thisArtPath= this.props.paths.art + thisArtKey;
                    firebase.database().ref(thisArtPath).set(null).then(()=>{
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
