// Libs
import React               from 'react';
import firebase            from 'firebase';
import cloudinary          from 'cloudinary';
import HTML5Backend        from 'react-dnd-html5-backend';
import {DragDropContext}   from 'react-dnd';
import getPalette          from 'node-vibrant';
import update              from 'react-addons-update';
import Snackbar            from 'material-ui/Snackbar';
import getMuiTheme         from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider    from 'material-ui/styles/MuiThemeProvider';

// Files    NOTE: Do not include '.jsx'
import Views               from '../../constants/Views';
import DeleteAccountDialog from '../DeleteAccountDialog';
import HiddenNav           from '../hidden_nav/HiddenNav';
import HamburgerIcon       from '../hamburger_icon/HamburgerIcon';
import PortalMain          from './PortalMain';
import EditArtworkDialog   from '../edit_artwork/EditArtworkDialog';
import EditAlbumDialog     from '../edit_album/EditAlbumDialog';
import EditMiscAlbumDialog from '../edit_misc/EditMiscAlbumDialog';
import EditProfileDialog   from '../edit_profile/EditProfileDialog';
import VerifyEmailDialog   from '../edit_profile/VerifyEmailDialog';
import UploadDialog        from './UploadDialog';


// ====== Global Variables ======
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
        editMiscAlbumIsOpen: false,                 // Used to track whether MiscAlbum Dialog is open
        editAlbumIsOpen: false,                     // Used to track whether Album Dialog is open
        deleteAccountIsOpen: false,                 // Used to track whether Delete Account Dialog is open
        uploadDialogIsOpen: false,                  // Used to track whether Upload Dialog is open
        editProfileDialogIsOpen: false,             // Used to track whether Edit Profile Dialog is open
        verifyEmailDialogIsOpen: false,             // Used to track whether Verify Email Dialog is open
        currentAlbum: "Miscellaneous",              // Used to track the current album open
        currentAppLayout: Views.ARTWORKS,           // Used to track the current layout being displayed in PortalMain
        currentEditArtworkInfo: {},                 // Used to store information of artwork being edit momentarily
        currentEditAlbumInfo: {},                   // Used to store information of album being edit momentarily
        uploadPreviews: [],                         // Used to store files uploaded momentarily, to be previewed once uploaded
        albumNames: ["Miscellaneous"],              // Used to store the JSON objects to be used by  Edit Artwork Form
        albums : {},                                //
        isUploading: false,                         //
        user  : {},                                 // public/onboarders/{UID} node
        userPrivate : {},                            // _private/onboarders/{UID} node
        currentError: ""
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
                    user           ={this.state.user}
                    thumbnail      ={this.props.thumbnail}
                    navIsOpen      ={this.state.navIsOpen}
                    changeAppLayout={this.changeAppLayout}
                    signOutUser    ={this.props.signOutUser} />
                <HamburgerIcon
                    toggleNav={this.toggleNav}
                    navIsOpen={this.state.navIsOpen} />
                <PortalMain
                    thumbnail                 ={this.props.thumbnail}
                    user                      ={this.state.user}
                    userPrivate               ={this.state.userPrivate}
                    albums                    ={this.state.albums}
                    toggleNav                 ={this.toggleNav}
                    navIsOpen                 ={this.state.navIsOpen}
                    deleteArtwork             ={this.deleteArtwork}
                    toggleEditArtworkDialog   ={this.toggleEditArtworkDialog}
                    toggleEditAlbumDialog     ={this.toggleEditAlbumDialog}
                    toggleEditMiscAlbumDialog ={this.toggleEditMiscAlbumDialog}
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
                    thumbnail={this.props.thumbnail}
                    currentEditArtworkInfo={this.state.currentEditArtworkInfo} />
                <EditAlbumDialog
                    user={this.state.user}
                    editAlbumIsOpen={this.state.editAlbumIsOpen}
                    toggleEditAlbumDialog={this.toggleEditAlbumDialog}
                    updateAlbum={this.updateAlbum}
                    currentEditAlbumInfo={this.state.currentEditAlbumInfo} />
                <EditMiscAlbumDialog
                    user={this.state.user}
                    editMiscAlbumIsOpen={this.state.editMiscAlbumIsOpen}
                    toggleEditMiscAlbumDialog={this.toggleEditMiscAlbumDialog}
                    updateAlbum={this.updateAlbum}
                    currentEditAlbumInfo={this.state.currentEditAlbumInfo} />
                <UploadDialog
                    thumbnail        ={this.props.thumbnail}
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
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="registration-error"
                        open={this.state.currentError.length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000} />
                </MuiThemeProvider>
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
            this.setState({
                currentError: error.message
            });

            setTimeout(() => {
                this.setState({
                    currentError: ""
                });
            }, 4500);   // Clear error once it has been shown
        }, this);

        firebase.database().ref(userPrivatePath).on('value', (snapshot)=>{
            this.setState({
                userPrivate:snapshot.val()
            });
            this.forceUpdate(); //FIXME in theory this line is un-needed.
        }, (error)=>{
            console.error(error);
            this.setState({
                currentError: error.message
            });

            setTimeout(() => {
                this.setState({
                    currentError: ""
                });
            }, 4500);   // Clear error once it has been shown
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
            navIsOpen: !this.state.navIsOpen,
            managerIsOpen: true
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
     * This method is used by the Misc Album component
     * to toggle the boolean value of this.state.editMiscAlbumIsOpen
     * to change the state of the the Edit Misc Album Dialog component
     * from open to closed.
     */
    toggleEditMiscAlbumDialog = () => {
        this.setState({
            editMiscAlbumIsOpen: !this.state.editMiscAlbumIsOpen
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
     * This method takes in a blob object that a user has uploaded, then
     * -uploads the original file to gs:"portal/{user uid}/uploads"
     * - sets DB entry /public/onboarders/artworks/{uid}/fullsize_url
     * -makes a thumbnail size copy of the image,
     * -uploads the thumbnail to "portal/{user uid}/thumbnails"
     * -sets DB entry /public/onboarders/artworks/{uid}/thumbnail_url
     * -sends image to this.Colors(url)
     *. Asynchronously, we need to wait for:
     *  full url, thumb url, colors.
     * @param  {Blob} blob - an uploaded blob
     */
    uploadArtToTekuma = (blob) => {
        const fileName  = blob.name;
        const fileSize  = blob.size;
        const thisUID   = firebase.auth().currentUser.uid;

        //Now, we have all needed async-data. Set it to the DB.
        let artPath          = `public/onboarders/${thisUID}`
        const artRef         = firebase.database().ref(artPath).child('artworks');
        const artworkUID     = artRef.push().key;

        //*Store the original upload, un-changed.
        let uploadPath = `portal/${thisUID}/uploads/${artworkUID}`;
        const fullRef  = firebase.storage().ref(uploadPath);
        fullRef.put(blob).on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot)=>{ //on-event change
                let percent = Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                console.log(percent + "% done w/ original");
            },
            (error)=>{
                console.error(error);
                this.setState({
                    currentError: error.message
                });

                setTimeout(() => {
                    this.setState({
                        currentError: ""
                    });
                }, 4500);   // Clear error once it has been shown
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

                    // Find Current Album index

                    let albums = this.state.user.albums;
                    let albumIndex = 0;

                    for(let i = 0; i < Object.keys(albums).length; i++) {
                        let album = albums[i];

                        if (album.name == this.state.currentAlbum) {
                            console.log("AlbumIndex: ", i);
                            albumIndex = i;
                        }
                    }

                    let albumPath  = `public/onboarders/${thisUID}/albums/${albumIndex}/artworks`;
                    const albumRef = firebase.database().ref(albumPath);


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
                        album       : this.state.currentAlbum,
                        upload_date : new Date().toISOString(),
                        year        : new Date().getFullYear(),
                        description : "",
                        tags        : [], // handled in cloud
                        size        : fileSize,
                        fullsize_url: fullSizeURL,
                        colors      : {} // handled in cloud
                    };

                    // set the art object to the artworks node
                    artRef.child(artworkUID).set(artObject).then(()=>{
                        console.log(">>>>Artwork info set into DB");
                    }).catch((error)=>{
                        console.error(error);
                        this.setState({
                            currentError: error.message
                        });

                        setTimeout(() => {
                            this.setState({
                                currentError: ""
                            });
                        }, 4500);   // Clear error once it has been shown
                    });

                    //Now, add a pointer to the artwork object to the current album
                    albumRef.transaction( (node)=>{
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
     * The value can be: Views.UPLOAD, Views.ARTWORKS, and Views.PROFILE
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
     * @param  {Array} oldAlbumName - name of the albums the artwork is currently in
     */
    changeCurrentEditArtwork = (id, oldAlbumName) => {
        const thisUID = firebase.auth().currentUser.uid;
        let path = `public/onboarders/${thisUID}/artworks/${id}`;
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
     * This method is used by the editAlbum method of the ArtworksAlbumManager component
     * populate this.state.currentEditAlbumInfo with the information of the
     * album being edited.
     * @param  {String} id [the unique id of the artwork being edited]
     */
    changeCurrentEditAlbum = (id) => {
        console.log("Entered changeCurrentEditAlbum");
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
                            this.setState({
                                currentError: error.message
                            });
                            setTimeout(() => {
                                this.setState({
                                    currentError: ""
                                });
                            }, 4500);   // Clear error once it has been shown
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
                        this.setState({
                            currentError: error.message
                        });
                        setTimeout(() => {
                            this.setState({
                                currentError: ""
                            });
                        }, 4500);   // Clear error once it has been shown
                    }
                );
            });
        }

        if (data.hasOwnProperty('legal_name')) {
            firebase.database().ref(userPrivatePath).update({
                legal_name: data.legal_name
            }).then(()=>{
                //FIXME use a toggle method?
                console.log("This is data.legal_name: ", data.legal_name);
                this.setState({
                    editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
                });
            });
        }

        if (data.hasOwnProperty('dob')) {
            firebase.database().ref(userPrivatePath).update({
                dob: data.dob
            }).then(()=>{
                //FIXME use a toggle method?
                console.log("This is data.dob: ", data.dob);
                this.setState({
                    editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
                });
            });
        }

        if (data.hasOwnProperty('paypal')) {
            firebase.database().ref(userPrivatePath).update({
                paypal: data.paypal
            }).then(()=>{
                //FIXME use a toggle method?
                console.log("This is data.paypal: ", data.paypal);
                this.setState({
                    editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
                });
            });
        }

        if (data.hasOwnProperty('gender_pronoun')) {
            firebase.database().ref(userPrivatePath).update({
                gender_pronoun: data.gender_pronoun
            }).then(()=>{
                //FIXME use a toggle method?
                console.log("This is data.gender_pronoun: ", data.gender_pronoun);
                this.setState({
                    editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
                });
            });
        }

        if (data.hasOwnProperty('over_eighteen')) {
            firebase.database().ref(userPrivatePath).update({
                over_eighteen: data.over_eighteen
            }).then(()=>{
                //FIXME use a toggle method?
                console.log("This is data.over_eighteen: ", data.over_eighteen);
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
            thisPromise = firebase.database().ref(`public/onboarders/${thisUID}`)
            .set(null, function(error) {console.log(error.message);})
            .then(function() {console.log("Account has been Deleted!");});
          // Sign-out successful.
        }, function(error) {
          // An error happened.
          console.log("Error occured.");
          this.setState({
              currentError: error.message
          });

          setTimeout(() => {
              this.setState({
                  currentError: ""
              });
          }, 4500);   // Clear error once it has been shown
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
        let artworkInfo = data;

        let oldAlbumName = artworkInfo.oldAlbumName;
        artworkInfo.oldAlbumName = null;

        const thisUID = firebase.auth().currentUser.uid;
        let thisArtworkRef = firebase.database().ref(`public/onboarders/${thisUID}/artworks/${data.id}`);
        thisArtworkRef.set(artworkInfo).then( () => {
            this.toggleEditArtworkDialog();
            console.log("Set new artwork info");
        });

        if (artworkInfo.album != oldAlbumName) {
            this.changeArtworkAlbum(artworkInfo['id'], oldAlbumName, artworkInfo.album);
        }
    }

    /**
     * This method is used by the EditAlbumForm Component to:
     * -Update all attributes of this album in the albums branch
     * @param  {JSON} data - obj of {attribute:update} to be written to
     * the database.
     */
    updateAlbum = (id,data) => {
        const thisUID = firebase.auth().currentUser.uid;
        let thisAlbumRef = firebase.database().ref(`public/onboarders/${thisUID}/albums/${id}`);

        // Change the name of associated artworks if album changed
        if(data['name'] != this.state.user.albums[id]['name']) {
            // Change the name of associated artworks
            if (this.state.user.albums[id]['artworks']) {
                // change the album field for each artwork object
                let artLength = Object.keys(this.state.user.albums[id]['artworks']).length;
                for (let i = 0; i < artLength; i++) {
                    let thisArtKey = this.state.user.albums[id]['artworks'][i];
                    let artworkRef =firebase.database().ref(`public/onboarders/${thisUID}/artworks/${thisArtKey}`);
                    artworkRef.transaction((node) => {
                        node['album'] = data['name'];
                        return node;
                    });
                }
            }
        }

        // Change the artist of associated artworks if album changed
        if(data['artist'] && data['artist'] != this.state.user.albums[id]['artist']) {
            // Change the name of associated artworks
            if (this.state.user.albums[id]['artworks']) {
                // change the artist field for each artwork object
                let artLength = Object.keys(this.state.user.albums[id]['artworks']).length;
                for (let i = 0; i < artLength; i++) {
                    let thisArtKey = this.state.user.albums[id]['artworks'][i];
                    let artworkRef =firebase.database().ref(`public/onboarders/${thisUID}/artworks/${thisArtKey}`);
                    artworkRef.transaction((node) => {
                        node['artist'] = data['artist'];
                        return node;
                    });
                }
            }
        }

        // Change the year of associated artworks if album changed
        if(data['year'] && data['year'] != this.state.user.albums[id]['year']) {
            // Change the name of associated artworks
            if (this.state.user.albums[id]['artworks']) {
                // change the artist field for each artwork object
                let artLength = Object.keys(this.state.user.albums[id]['artworks']).length;
                for (let i = 0; i < artLength; i++) {
                    let thisArtKey = this.state.user.albums[id]['artworks'][i];
                    let artworkRef =firebase.database().ref(`public/onboarders/${thisUID}/artworks/${thisArtKey}`);
                    artworkRef.transaction((node) => {
                        node['year'] = data['year'];
                        return node;
                    });
                }
            }
        }

        // Change the tags of associated artworks if album changed
        if(data['tags'] && data['tags'] != this.state.user.albums[id]['tags']) {
            // Change the name of associated artworks
            if (this.state.user.albums[id]['artworks']) {
                // change the artist field for each artwork object
                let artLength = Object.keys(this.state.user.albums[id]['artworks']).length;
                for (let i = 0; i < artLength; i++) {
                    let thisArtKey = this.state.user.albums[id]['artworks'][i];
                    let artworkRef =firebase.database().ref(`public/onboarders/${thisUID}/artworks/${thisArtKey}`);
                    artworkRef.transaction((node) => {
                        let albumTagsLength = data['tags'].length;

                        let tagInArtwork = false;

                        // Loops through all album tags
                        for (let i = 0; i < albumTagsLength; i++) {
                            tagInArtwork = false;
                            let artworkTagsLength = 0

                            if (node['tags']) {
                                artworkTagsLength = Object.keys(node['tags']).length;

                                // Loops through all artwork tags
                                for (let j = 0; j < artworkTagsLength; j++) {
                                    if (data['tags'][i]['text'] == node['tags'][j]['text']) {
                                        tagInArtwork = true;
                                        break;
                                    }
                                }
                            }

                            if (!tagInArtwork && artworkTagsLength > 0) {
                                // Entered if already has tags field
                                let newTag = {
                                    id: artworkTagsLength + 1,
                                    text: data['tags'][i]['text']
                                };
                                node['tags'][artworkTagsLength] = newTag;
                            } else if (!tagInArtwork) {
                                // Entered if doesn't have tags field
                                let newTag = {
                                    id: 1,
                                    text: data['tags'][i]['text']
                                };
                                node['tags'] = {0 : newTag};
                            }
                        }

                        console.log("Here is the modified artwork: ", node);

                        return node;
                    });
                }
            }
        }

        // Change the description of associated artworks if album changed
        if(data['description'] && data['description'] != this.state.user.albums[id]['description']) {
            // Change the name of associated artworks
            if (this.state.user.albums[id]['artworks']) {
                // change the artist field for each artwork object
                let artLength = Object.keys(this.state.user.albums[id]['artworks']).length;
                for (let i = 0; i < artLength; i++) {
                    let thisArtKey = this.state.user.albums[id]['artworks'][i];
                    let artworkRef =firebase.database().ref(`public/onboarders/${thisUID}/artworks/${thisArtKey}`);
                    artworkRef.transaction((node) => {
                        node['description'] = data['description'];
                        return node;
                    });
                }
            }
        }

        // If current album was this album, change its name
        if (this.state.currentAlbum == this.state.user.albums[id]['name']) {
            this.changeAlbum(data.name);
        }

        // Update Album
        thisAlbumRef.update(data).then( () => {
            if (id == 0){
                this.toggleEditMiscAlbumDialog();
            } else {
                this.toggleEditAlbumDialog();
            }
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

        albumsRef.transaction((node) => {
            let albumsCount = Object.keys(node).length;

            for (let i = 0; i < albumsCount; i++) {
                if (node[i]['name'] == oldName) {
                    let artworksCount = Object.keys(node[i]['artworks']).length;
                    let artworksNode = node[i]['artworks'];
                    let artworkIndex;

                    for (let j = 0; j < artworksCount; j++) {
                        if (artworksNode[j] == artworkUID) {
                            artworkIndex = j;
                        }
                    }

                    let artworks = update(artworksNode, {
                        $splice: [[artworkIndex, 1]]
                    });

                    node[i]['artworks'] = artworks;
                } else if (node[i]['name'] == newName) {
                    // just add the ID at the end of the 'array'
                    if (node[i]['artworks']) {
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
        let artwork;
        // Remove the artwork pointer from the album via transaction, then
        // shift indexes bc firebase uses de-abstracted arrays
        userRef.child('albums').transaction( (node)=>{
            let albumCount = Object.keys(node).length;
            let albumIndex;
            let artworkIndex;
            let found = false;

            // Find albumIndex and artworkIndex
            for (let i = 0; i < albumCount; i++) {
                if (found) {
                    break;
                }

                if (node[i]['name'] == this.state.currentAlbum) {
                    if (node[i]['artworks']) {
                        let artworksCount = Object.keys(node[i]['artworks']).length;
                        for (let j = 0; j < artworksCount; j++) {
                            if (node[i]['artworks'][j]) {
                                if (node[i]['artworks'][j] == id) {
                                    console.log("FOUND IN ALBUMS ");
                                    artwork = node[i]['artworks'][j];
                                    albumIndex = i;
                                    artworkIndex = j;
                                    found = true;
                                    break;
                                }
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
