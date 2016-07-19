// Libs
import React               from 'react';
import firebase            from 'firebase';
import cloudinary          from 'cloudinary';
import HTML5Backend        from 'react-dnd-html5-backend';
import {DragDropContext}   from 'react-dnd';
import getPalette          from 'node-vibrant';
import update              from 'react-addons-update';

// Files    NOTE: Do not include '.jsx'
import Views               from '../../constants/Views';
import DeleteAccountDialog from '../DeleteAccountDialog';
import HiddenNav           from '../hidden_nav/HiddenNav';
import HamburgerIcon       from '../hamburger_icon/HamburgerIcon';
import PortalMain          from './PortalMain';
import EditArtworkDialog   from '../edit_artwork/EditArtworkDialog';
import EditAlbumDialog     from '../edit_album/EditAlbumDialog';
import EditProfileDialog   from '../edit_profile/EditProfileDialog';
import VerifyEmailDialog   from '../edit_profile/VerifyEmailDialog';
import UploadDialog        from './UploadDialog';


// #Global Variables
const pathToPublicOnboarder = "public/onboarders/";
const maxThumbnailWidth     = 550; // ->height set proportional to this value
const thumbNailPadding      = 4;   // ->count(pixels to pad each side of thumbnail with)
const colorCount            = 64;  // ->amount of possible color swatches to start with when
                                   // determining dominant vibrant and muted colors (64 default)
const paletteDownscaling    = 1 ;  // how much to downscale the image before processing.
                                   //  1 means no downscaling, 5 is default.

/**
 * TODO
 */
@DragDropContext(HTML5Backend)     // Adds Drag & Drop to App
export default class PostAuth extends React.Component {
    state = {
        navIsOpen: false,                           // Used to track whether Hidden Navigation is open
        managerIsOpen: true,                        // Used to track whether Album Manager is open
        editArtworkIsOpen: false,                   // Used to track whether Artwork Dialog is open
        editAlbumIsOpen: false,                     // Used to track whether Album Dialog is open
        deleteAccountIsOpen: false,                 // Used to track whether Delete Account Dialog is open
        uploadDialogIsOpen: false,                  // Used to track whether Upload Dialog is open
        editProfileDialogIsOpen: false,             // Used to track whether Edit Profile Dialog is open
        verifyEmailDialogIsOpen: false,             // Used to track whether Verify Email Dialog is open
        currentAlbum: 'Uploads',                    // Used to track the current album open
        currentAppLayout: Views.ARTWORKS,           // Used to track the current layout being displayed in PortalMain
        currentEditArtworkInfo: {},                 // Used to store information of artwork being edit momentarily
        currentEditAlbumInfo: {},                   // Used to store information of album being edit momentarily
        uploadPreviews: [],                         // Used to store files uploaded momentarily, to be previewed once uploaded
        albumNames: ["Uploads"],                    // Used to store the JSON objects to be used by  Edit Artwork Form
        albums : {},                                //
        isUploading: false,                         //
        user  : {},                                 // public/onboarders/{UID} node
        userPrivate : {}                            // _private/onboarders/{UID} node
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----PostAuth");
    }

    render() {
        return (
            <div className="app">
                <HiddenNav
                    user={this.state.user}
                    navIsOpen={this.state.navIsOpen}
                    changeAppLayout={this.changeAppLayout}
                    signOutUser={this.props.signOutUser} />
                <HamburgerIcon
                    toggleNav={this.toggleNav}
                    navIsOpen={this.state.navIsOpen} />
                <PortalMain
                    thumbnail                 ={this.props.thumbnail}
                    user                      ={this.state.user}
                    userPrivate               ={this.state.userPrivate}
                    albums                    ={this.state.albums}
                    navIsOpen                 ={this.state.navIsOpen}
                    deleteArtwork             ={this.deleteArtwork}
                    toggleEditArtworkDialog   ={this.toggleEditArtworkDialog}
                    toggleEditAlbumDialog     ={this.toggleEditAlbumDialog}
                    changeCurrentEditArtwork  ={this.changeCurrentEditArtwork}
                    changeCurrentEditAlbum    ={this.changeCurrentEditAlbum}
                    toggleManager             ={this.toggleManager}
                    managerIsOpen             ={this.state.managerIsOpen}
                    currentAppLayout          ={this.state.currentAppLayout}
                    changeAppLayout           ={this.changeAppLayout}
                    currentAlbum              ={this.state.currentAlbum}
                    changeAlbum               ={this.changeAlbum}
                    setUploadedFiles          ={this.setUploadedFiles}
                    setAlbumNames             ={this.setAlbumNames}
                    editPublicUserInfo        ={this.editPublicUserInfo}
                    editPrivateUserInfo       ={this.editPrivateUserInfo}
                    toggleDeleteAccountDialog ={this.toggleDeleteAccountDialog}
                    toggleVerifyEmailDialog   ={this.toggleVerifyEmailDialog}
                    changeArtworkAlbum        ={this.changeArtworkAlbum} />
                <EditArtworkDialog
                    user={this.state.user}
                    albums={this.state.albums}
                    albumNames={this.state.albumNames}
                    editArtworkIsOpen={this.state.editArtworkIsOpen}
                    toggleEditArtworkDialog={this.toggleEditArtworkDialog}
                    updateArtwork={this.updateArtwork}
                    currentEditArtworkInfo={this.state.currentEditArtworkInfo} />
                <EditAlbumDialog
                    user={this.state.user}
                    editAlbumIsOpen={this.state.editAlbumIsOpen}
                    toggleEditAlbumDialog={this.toggleEditAlbumDialog}
                    updateAlbum={this.updateAlbum}
                    currentEditAlbumInfo={this.state.currentEditAlbumInfo} />
                <UploadDialog
                    closeUploadDialog={this.closeUploadDialog}
                    uploadedPreviews={this.state.uploadPreviews}
                    uploadDialogIsOpen={this.state.uploadDialogIsOpen} />
                <EditProfileDialog
                    closeProfileDialog={this.closeProfileDialog}
                    editProfileDialogIsOpen={this.state.editProfileDialogIsOpen} />
                <DeleteAccountDialog
                    toggleDeleteAccountDialog={this.toggleDeleteAccountDialog}
                    deleteAccountIsOpen={this.state.deleteAccountIsOpen}
                    deleteAccount={this.deleteAccount} />
                <VerifyEmailDialog
                    toggleVerifyEmailDialog={this.toggleVerifyEmailDialog}
                    verifyEmailDialogIsOpen={this.state.verifyEmailDialogIsOpen} />
            </div>
        );
    }

    componentDidMount() {
        console.log("++++++PostAuth");
        const thisUID   = firebase.auth().currentUser.uid;
        const  userPath = `public/onboarders/${thisUID}`;
        const userPrivatePath = `_private/onboarders/${thisUID}`;

        //NOTE: MAIN LISTENER FOR CONNECTION TO firebase
        // these 2 on-methods listen for any change to the database and
        // trigger a re-render on 'value'
        firebase.database().ref(userPath).on('value', (snapshot)=>{
            this.setState({
                user:snapshot.val()
            });
            console.log("FIREBASE: user info updated");
        }, (error)=>{
            console.error(error);
        }, this);

        firebase.database().ref(userPrivatePath).on('value', (snapshot)=>{
            this.setState({
                userPrivate:snapshot.val()
            });
            this.forceUpdate(); //FIXME in theory this line is un-needed.
        }, (error)=>{
            console.error(error);
        }, this);

        this.forceUpdate(); //FIXME TODO  is this needed?

        this.props.clearVerifyEmailMessage(); // Closes verify email snackbar message if manual registration
    }

    componentWillReceiveProps(nextProps) {
        //TODO
    }


    componentWillUnmount() {
        // Moved the Unmount Firebase calls to SignOutUser() method in App.jsx
    }

// -------------- METHODS -------------- //

    //  # Toggle Methods

    /**
     * This method is used by the Hamburger Icon component to
     * toggle the boolean value of this.state.navIsOpen
     * to change the state of the Hidden Navigation component
     * from open to closed.
     */
    toggleNav = () => {
        this.setState({
            navIsOpen: !this.state.navIsOpen
        });
    };

    /**
     * This method is used by the Album Manager Toggler element
     * to toggle the boolean value of this.state.managerIsOpen
     * to change the state of the the Album Manager component
     * from open to closed.
     */
    toggleManager = () => {
        this.setState({
            managerIsOpen: !this.state.managerIsOpen
        });
    };

    /**
     * This method is used by Artwork components
     * to toggle the boolean value of this.state.editArtworkIsOpen
     * to change the state of the the Edit Artwork Dialog component
     * from open to closed.
     */
    toggleEditArtworkDialog = () => {
        this.setState({
            editArtworkIsOpen: !this.state.editArtworkIsOpen
        });
    }

    /**
     * This method is used by Album components
     * to toggle the boolean value of this.state.editAlbumIsOpen
     * to change the state of the the Edit Album Dialog component
     * from open to closed.
     */
    toggleEditAlbumDialog = () => {
        this.setState({
            editAlbumIsOpen: !this.state.editAlbumIsOpen
        });
    }

    /**
     * This method is used by the Delete Account element on the Edit Profile page component
     * to toggle the boolean value of this.state.deleteAccountIsOpen
     * to change the state of the the Delete Account Dialog component
     * from open to closed.
     */
    toggleDeleteAccountDialog = () => {
        this.setState({
            deleteAccountIsOpen: !this.state.deleteAccountIsOpen
        });
    }

    /**
     * This method is used by the Verify Email button the Private Edit Profile page component
     * to toggle the boolean value of this.state.verifyEmailIsOpen
     * to change the state of the the Verify Email Dialog component
     * from open to closed.
     */
    toggleVerifyEmailDialog = () => {
        this.setState({
            verifyEmailDialogIsOpen: !this.state.verifyEmailDialogIsOpen
        });
    }

    /**
     * This method is used by the Upload Layout page component
     * to change the boolean value of this.state.uploadDialogIsOpen
     * to false to close the Upload Dialog component
     */
    closeUploadDialog = () => {
        this.setState({
            uploadDialogIsOpen: false
        });
        this.clearUploadedFiles();
    }

    /**
     * This method is used by the Edit Profile Layout page component
     * to change the boolean value of this.state.editProfileDialogIsOpen
     * to false to close the Edit Profile Dialog component
     */
    closeProfileDialog = () => {
        this.setState({
            editProfileDialogIsOpen: !this.state.editProfileDialogIsOpen
        });
    }

    //  # Uploading Methods

    /**
     * This method takes in an image as a URL, and
     * @param  {String} url - an image to process
     * @return {Object}  an object with keys:
     *                   v,m,lv,lm,dv,dm; which represent:
     * Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, LightMuted
     * NOTE: This is a synchronous method
     * @see [ https://github.com/akfish/node-vibrant ]
     */
    extractColors = (url) => {
        console.log(">> Extracting Color Palette from Upload...");
        let colors = {};
        getPalette.from(url).quality(paletteDownscaling).maxColorCount(colorCount)
        .getPalette( (error,palette)=>{
            if (palette.Vibrant) {
                colors['v'] = {
                    hex:palette.Vibrant.getHex(),
                    rgb:palette.Vibrant.getRgb(),
                    cnt:palette.Vibrant.getPopulation()
                };
            }
            if (palette.Muted != null) {
                colors['m'] = {
                    hex:palette.Muted.getHex(),
                    rgb:palette.Muted.getRgb(),
                    cnt:palette.Muted.getPopulation()
                };
            }
            if (palette.DarkVibrant != null) {
                colors['dv'] = {
                    hex:palette.DarkVibrant.getHex(),
                    rgb:palette.DarkVibrant.getRgb(),
                    cnt:palette.DarkVibrant.getPopulation()
                };
            }
            if (palette.DarkMuted != null) {
                colors['dm'] = {
                    hex:palette.DarkMuted.getHex(),
                    rgb:palette.DarkMuted.getRgb(),
                    cnt:palette.DarkMuted.getPopulation()
                };
            }
            if (palette.LightVibrant != null) {
                colors['lv'] = {
                    hex:palette.LightVibrant.getHex(),
                    rgb:palette.LightVibrant.getRgb(),
                    cnt:palette.LightVibrant.getPopulation()
                };
            }
            if (palette.LightMuted != null) {
                colors['lm'] = {
                    hex:palette.LightMuted.getHex(),
                    rgb:palette.LightMuted.getRgb(),
                    cnt:palette.LightMuted.getPopulation()
                };
            }
        });
        return colors;
    }

    /** FIXME handle color processing in background
     * Heads up: This is a nested-Asynchronous mess.
     *
     * This method takes in a blob object that a user has uploaded, then
     * -uploads the original file to gs:"portal/{user uid}/uploads"
     * - sets DB entry /public/onboarders/artworks/{uid}/fullsize_url
     * -makes a thumbnail size copy of the image,
     * -uploads the thumbnail to "portal/{user uid}/thumbnails"
     * -sets DB entry /public/onboarders/artworks/{uid}/thumbnail_url
     * -sends image to this.extractColors(url)
     *. Asynchronously, we need to wait for:
     *  full url, thumb url, colors.
     * @param  {Blob} blob - an uploaded blob
     */
    uploadArtToTekuma = (blob) => {
        const fileName  = blob.name;
        const fileSize  = blob.size;
        const thisUID   = firebase.auth().currentUser.uid;

            //*Store the original upload, un-changed.
        let uploadPath = `portal/${thisUID}/uploads/${fileName}`;
        const fullRef = firebase.storage().ref(uploadPath);
        fullRef.put(blob).on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot)=>{ //on-event change
                let percent = Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                console.log(percent + "% done w/ original");
            },
            (error)=>{
                console.error(error);
            },
            ()=>{ //on-complete fullsize upload
                console.log(">>Full size upload complete");
                fullRef.getDownloadURL().then( (fullSizeURL)=>{
                    let uploadInfo = {
                        url :fullSizeURL,
                        size:fileSize,
                        name:fileName
                    };
                    this.setState({
                        uploadPreviews: this.state.uploadPreviews.concat(uploadInfo)
                    });
                    console.log(">>URL:",fullSizeURL);


                    //Now, we have all needed async-data. Set it to the DB.
                    const artRef         = firebase.database().ref(pathToPublicOnboarder+thisUID).child('artworks');
                    const artworkUID     = artRef.push().key;
                    const uploadAlbumRef = firebase.database().ref(pathToPublicOnboarder+thisUID+'/albums/0/artworks');

                    //Get the color palette
                    console.log("---Begin Color swatching");
                    const colorObject    = this.extractColors(localURL);
                    console.log("Color Digest:", colorObject);
                    console.log("---End Color swatching");

                    //Build the artwork object
                    let title = fileName.split(".")[0];
                    let artist = "Self";
                    if (this.state.user && this.state.user.display_name != "Untitled Artist") {
                        artist = this.state.user.display_name;
                    }

                    let artObject = {
                        id          : artworkUID,
                        filename    : fileName,
                        title       : title,
                        artist      : artist,
                        album       : "Uploads",
                        upload_date : new Date().toISOString(),
                        year        : new Date().getFullYear(),
                        description : "",
                        tags        : [{id: 1, text: "Art"}],
                        size        : fileSize,
                        fullsize_url: fullSizeURL,
                        colors      : colorObject
                    };

                    // set the art object to the artworks node
                    artRef.child(artworkUID).set(artObject).then(()=>{
                        console.log(">>>>Artwork info set into DB");
                    }).catch((error)=>{
                        console.error(error);
                    });

                    //Now, add a pointer to the artwork object to the uploads album
                    uploadAlbumRef.transaction( (node)=>{
                        if (node == null) {
                            node = {0:artworkUID};
                        } else {
                            let currentLength   = Object.keys(node).length;
                            node[currentLength] = artworkUID;
                        }
                        return node; //finish transaction
                    }, (error,bool,snap)=>{
                            console.log(">>>Img set into album");
                    });
                });//END upload promise and thenable
        });
    }

    /**
     * This method will take in an array of blobs, then for each blob
     * it will handle uploading, storing, and setting into the database.
     * @param  {[Array]} files [Array of Image blobs from the uploader]
     */
    setUploadedFiles = (files) => {
        //FIXME use a toggle method?
        this.setState({
            uploadDialogIsOpen: true   // When we set files, we want to open Uplaod Dialog
        });

        for (let i = 0; i < files.length; i++) {
            this.uploadArtToTekuma(files[i]);
        }
    }

    // #Setter Methods

    /**
     * Setter method to populate an array of all album names.
     * @param  {Array} names - an array of all names
     */
    setAlbumNames = (names) => {
        this.setState({albumNames : names});
    }

    /**
     * This method is used by the closeUploadDialog method
     * to empty this.state.uploadedFiles array once the Upload Dialog component
     * is closed.
     * Once the Upload Dialog component is closed, we no longer need to have the files
     * stored in the state variable
     */
    clearUploadedFiles = () => {
        this.setState({
            uploadPreviews: []
        });
    }

    /**
     * This method is used by the HiddenNav component and PostAuthHeader component
     * to switch the the layout currently being displayed in the Root App Layout component
     * by changing this.state.currentAppLayout.
     * The value can be: Views.UPLOAD, Views.ARTWORKS, and Views.EDIT
     * @param  {[A field of the Views object]} view [View to be displayed]
     */
    changeAppLayout = (view) => {
        if(this.state.navIsOpen) {
            this.setState({
                currentAppLayout: view,
                navIsOpen: false,
                managerIsOpen: true
            });
        } else {
            this.setState({
                currentAppLayout: view,
                managerIsOpen: true
            });
        }
    }

    /**
     * This method is used by Album components to change the album artworks
     * currently being displayed in the Artworks component by changing
     * to change this.state.currentAlbum
     * @param  {String} album [The album to be displayed]
     */
    changeAlbum = (album) => {
        this.setState({
            currentAlbum: album
        });
    }

    /**
     * This method is used by the editArtwork method of the ArtworkManager component
     * populate this.state.currentEditArtworkInfo with the information of the
     * artwork being edited.
     * @param  {String} id [the unique id of the artwork being edited]
     * @param  {String} oldAlbumName - the album that the artwork was in
     */
    changeCurrentEditArtwork = (id,oldAlbumName) => {
        const thisUID = firebase.auth().currentUser.uid;
        let path = "public/onboarders/" + thisUID + "/artworks/" + id;
        let artRef = firebase.database().ref(path);
        artRef.once("value", (snapshot) => {
            let data = snapshot.val();
            data["oldAlbumName"] = oldAlbumName;
            this.setState({
                currentEditArtworkInfo: data
            });
        }, null, this);
    }

    /**
     * This method is used by the editAlbum method of the AlbumManager component
     * populate this.state.currentEditAlbumInfo with the information of the
     * album being edited.
     * @param  {String} id [the unique id of the artwork being edited]
     */
    changeCurrentEditAlbum = (id) => {
        const thisUID = firebase.auth().currentUser.uid;
        let path = `public/onboarders/${thisUID}/albums/${id}`;
        let albumRef = firebase.database().ref(path);
        albumRef.once("value", (snapshot) => {
            let data = snapshot.val();
            data["id"] = id;

            this.setState({
                currentEditAlbumInfo: data
            });
        }, null, this);
    }

    /**
     * TODO
     * @param  {Object} data - object that holds one or more of:
     * - display_name
     * - bio
     * - location
     * - portfolio
     * - dob
     * - gender_pronoun
     * - avatar (blob)
     */
    editPublicUserInfo = (data) => {
        const thisUser    = firebase.auth().currentUser;
        const thisUID     = thisUser.uid;
        const userPath    = `public/onboarders/${thisUID}`;

        if (data.hasOwnProperty('avatar')) {
            const avatarPath  = `portal/${thisUID}/avatars/${data.avatar.name}`;
            const avatarRef   = firebase.storage().ref(avatarPath);

            avatarRef.put(data.avatar).on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot)=>{  },
                ()=>{},
                ()=>{
                    console.log(">> New Avatar Uploaded successfully");
                    avatarRef.getDownloadURL().then( (avatarURL)=>{
                        data.avatar = avatarURL;
                        firebase.database().ref(userPath).update(data)
                        .then( ()=>{
                            //FIXME use a toggle method?
                            this.setState({
                                editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
                            });
                        });
                    });
                }
            );
        }
        else {
            firebase.database().ref(userPath).update(data)
            .then(()=>{
                //FIXME use a toggle method?
                this.setState({
                    editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
                });
            });
        }
    }

    /**
     * @param  {Object} data -object that holds one or more of:
     * - email
     * - password
     * - current_password
     * - legal_name
     */
    editPrivateUserInfo = (data) => {
        const thisUser    = firebase.auth().currentUser;
        const thisUID     = thisUser.uid;
        const userPrivatePath   = `_private/onboarders/${thisUID}`;

        if (data.hasOwnProperty('email')) {
            if (data.email != thisUser.email) {
                console.log(">>> Updating Email Address");
                let thisCredential = firebase.auth.EmailAuthProvider.credential(thisUser.email, data.email_password);
                thisUser.reauthenticate(thisCredential).then( ()=>{
                    thisUser.updateEmail(data.email).then(
                        ()=>{
                            console.log("change email request sent to email");
                            firebase.database().ref(userPrivatePath).update({
                                email: data.email
                            }).then(()=>{
                                //FIXME use a toggle method?
                                this.setState({
                                    editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
                                });
                            });
                        },
                        (error)=>{
                            console.error(error);
                    });
                });
            }
        }//END EMAIL

        if (data.hasOwnProperty('password') && data.hasOwnProperty('current_password')) {
            let thisCredential = firebase.auth.EmailAuthProvider.credential(thisUser.email, data.current_password);
            thisUser.reauthenticate(thisCredential).then( ()=>{
                thisUser.updatePassword(data.password).then(
                    () => {
                        console.log("successful reset password");
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            });
        }

        if (data.hasOwnProperty('legal_name')) {
            firebase.database().ref(userPrivatePath).update({
                legal_name: data.legal_name
            }).then(()=>{
                //FIXME use a toggle method?
                this.setState({
                    editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
                });
            });
        }

    }

    /** TODO re-do this function to 'clean up' the database when deleting a user
     * This method is used by the Delete Account Dialog component
     * to delete a user's information and artworks from the Firebase Database
     */
    deleteAccount = () => {
        const thisUID = firebase.auth().currentUser.uid;
        firebase.auth().signOut().then(function() {
            console.log(thisUID, "this id here >>>>");
            thisPromise = firebase.database().ref(pathToPublicOnboarder + thisUID)
            .set(null, function(error) {console.log(error.message);})
            .then(function() {console.log("Account has been Deleted!");});
          // Sign-out successful.
        }, function(error) {
          // An error happened.
          console.log("Error occured.");
        });
    }

    /**
     * This method is used by the EditArtworkForm Component to:
     * -Update all attributes of this artwork in the artworks branch
     * -move associated artwork UID from/to proper artworks arrays in
     * albums branch.
     * @param  {JSON} data - obj of {attribute:update} to be written to
     * the database.
     */
    updateArtwork = (data) => {
        const thisUID = firebase.auth().currentUser.uid;
        let thisArtworkReference = firebase.database().ref(pathToPublicOnboarder+thisUID+'/artworks/' + data.id);
        thisArtworkReference.set(data).then( () => {
            this.toggleEditArtworkDialog();
        });
        if (data.album != data.oldAlbumName) {
            this.changeArtworkAlbum(data['id'], data.oldAlbumName, data.album);
        }

    }

    /**
     * This method is used by the EditAlbumForm Component to:
     * -Update all attributes of this album in the albums branch
     * @param  {JSON} data - obj of {attribute:update} to be written to
     * the database.
     */
    updateAlbum = (id ,data) => {
        const thisUID = firebase.auth().currentUser.uid;
        let thisAlbumRef = firebase.database().ref(pathToPublicOnboarder+thisUID+'/albums/' + id);
        thisAlbumRef.update(data).then( () => {
            this.toggleEditAlbumDialog();
        });
    }

    /**
     * TODO
     * @param  {} artworkUID - the UID of the artwork
     * @param  {[type]} oldName [description]
     * @param  {[type]} newName [description]
     */
    changeArtworkAlbum = (artworkUID, oldName, newName) => {
        const thisUID    = firebase.auth().currentUser.uid;
        const albumsPath = `public/onboarders/${thisUID}/albums`;
        const albumsRef  = firebase.database().ref(albumsPath);

        albumsRef.transaction( (node) => {
            let albumsCount = Object.keys(node).length;
            for (let i = 0; i < albumsCount; i++) {
                if (node[i]['name'] == oldName) {
                    // NOTE: Firebase has de-abstracted arrays.
                    // remove the ID, then shift indexes manually
                    let artworksCount = Object.keys(node[i]['artworks']).length;
                    let artworksNode = node[i]['artworks'];
                    let found = false;
                    for (let j = 0; j < artworksCount; j++) {
                        if (found) {
                            let aheadValue = artworksNode[j];
                            artworksNode[j-1] = aheadValue;
                        }
                        if (artworksNode[j] == artworkUID) {
                            delete artworksNode[j];
                            found = true;
                        }
                    }
                    delete artworksNode[artworksCount-1];
                } else if (node[i]['name'] == newName) {
                    // just add the ID at the end of the 'array'
                    if (node[i]['artworks'] != null && node[i]['artworks'] != undefined){
                        let artLength = Object.keys(node[i]['artworks']).length;
                        node[i]['artworks'][artLength] = artworkUID;
                        console.log("Artworks already: ", node[i]['artworks']);
                    } else {
                        node[i]['artworks'] = {0: artworkUID};

                    }
                }
            }
            return node;
        });
    }

    /**
     * Delete artwork object from /artworks and
     * delete pointer from albums/{##}/artworks/
     * @param  {String} id [UID of artwork to be deleted]
     */
    deleteArtwork = (id) => {
        const thisUID  = firebase.auth().currentUser.uid;
        const userPath = `public/onboarders/${thisUID}`
        const userRef  = firebase.database().ref(userPath);
        // Remove the artwork pointer from the album via transaction, then
        // shift indexes bc firebase uses de-abstracted arrays
        userRef.child('albums').transaction( (node)=>{
            let albumCount = Object.keys(node).length;
            let albumIndex;
            let artworkIndex;
            let found = false;

            for (let i = 0; i < albumCount; i++) {
                if (found) {
                    break;
                }

                if (node[i]['artworks']) {
                    let artworksCount = Object.keys(node[i]['artworks']).length;
                    for (let j = 0; j < artworksCount; j++) {
                        if (node[i]['artworks'][j]) {
                            if (node[i]['artworks'][j] == id) {
                                console.log("FOUND IN ALBUMS ");
                                albumIndex = i;
                                artworkIndex = j;
                                found = true;
                                break;
                            }
                        }
                    }
                }
            }

            let artworks = update(node[albumIndex]['artworks'], {
                $splice: [[artworkIndex, 1]]
            });

            node[albumIndex]['artworks'] = artworks;
            return node;

        }).then(()=>{
            // Delete from public/onboarders/{uid}/artworks branch
            userRef.child(`artworks/${id}`).set(null).then(()=>{
                console.log(">> Artwork deleted successfully");
            });

        });

    }
}
