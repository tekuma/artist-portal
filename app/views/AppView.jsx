'use strict';
// Libs
import React          from 'react';
import firebase       from 'firebase';
import HTML5Backend   from 'react-dnd-html5-backend';

// Views and Files    NOTE: Do not include '.jsx'
import Views               from '../constants/Views';
import DeleteAccountDialog from '../components/DeleteAccountDialog';
import HiddenNav           from '../components/hidden_nav/HiddenNav';
import HamburgerIcon       from '../components/hamburger_icon/HamburgerIcon';
import RootAppLayout       from '../components/app-layouts/RootAppLayout';
import EditArtworkDialog   from '../components/edit-artwork/EditArtworkDialog';
import EditProfileDialog   from '../components/edit-profile/EditProfileDialog';
import UploadDialog        from '../components/app-layouts/UploadDialog';
import ArtworkStore        from '../stores/ArtworkStore';
import {DragDropContext}   from 'react-dnd';


// #Global Variables
const pathToPublicOnboarder = "public/onboarders/";
const pathToArtUploads      = "artworks/";

@DragDropContext(HTML5Backend)  // Adds Drag & Drop to App
export default class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsOpen: false,                           // Used to track whether Hidden Navigation is open
            managerIsOpen: true,                        // Used to track whether Album Manager is open
            editArtworkIsOpen: false,                   // Used to track whether Artwork Dialog is open
            deleteAccountIsOpen: false,                 // Used to track whether Delete Account Dialog is open
            uploadDialogIsOpen: false,                  // Used to track whether Upload Dialog is open
            editProfileDialogIsOpen: false,             // Used to track whether Edit Profile is open
            currentAlbum: 'Uploads',                    // Used to track the current album open
            currentAppLayout: Views.ARTWORKS,           // Used to track the current layout being displayed in RootAppLayout
            userInfo: {},                               // Used to store User Profile Information
            currentEditArtworkInfo: {},                 // Used to store information of artwork being edit momentarily
            uploadedFiles: [],                          // Used to store files uploaded momentarily, to be sent to Firebase
            uploadPreviews: [],                         // Used to store files uploaded momentarily, to be previewed once uploaded
            albums: ["Uploads"]                         // Used to store the JSON objects to be used by  Edit Artwork Form
        };
    }

    /**
     *
     * [componentWillMount description]
     * @return {[type]} [description]
     */
    componentWillMount() {
        //TODO
    }

    /**
     * [componentDidMount description]
     * @return {[type]} [description]
     */
    componentDidMount() {
        const thisUID = firebase.auth().currentUser.uid;
        firebase.database().ref(pathToPublicOnboarder + thisUID).on('value', function(snapshot) {
            this.setState({userInfo: snapshot.val()});
            // console.log("Hello world, this is the user", this.state.userInfo);
        }, function(errorStuff){
            console.log(errorStuff);
        }, this);
    }

    render() {
        return (
            <div className="app">
                <HiddenNav
                    userInfo={this.state.userInfo}
                    navIsOpen={this.state.navIsOpen}
                    changeAppLayout={this.changeAppLayout}
                    signOutUser={this.props.signOutUser} />
                <HamburgerIcon
                    toggleNav={this.toggleNav}
                    navIsOpen={this.state.navIsOpen} />
                <RootAppLayout
                    albums={this.state.albums}
                    navIsOpen={this.state.navIsOpen}
                    deleteArtwork={this.deleteArtwork}
                    toggleEditArtworkDialog={this.toggleEditArtworkDialog}
                    changeCurrentEditArtwork={this.changeCurrentEditArtwork}
                    toggleManager={this.toggleManager}
                    managerIsOpen={this.state.managerIsOpen}
                    currentAppLayout={this.state.currentAppLayout}
                    changeAppLayout={this.changeAppLayout}
                    currentAlbum={this.state.currentAlbum}
                    changeAlbum={this.changeAlbum}
                    userInfo={this.state.userInfo}
                    setUploadedFiles={this.setUploadedFiles}
                    setAlbums={this.setAlbums}
                    editUserProfile={this.editUserProfile}
                    toggleDeleteAccountDialog={this.toggleDeleteAccountDialog} />
                <EditArtworkDialog
                    albums={this.state.albums}
                    editArtworkIsOpen={this.state.editArtworkIsOpen}
                    toggleEditArtworkDialog={this.toggleEditArtworkDialog}
                    updateArtwork={this.updateArtwork}
                    currentEditArtworkInfo={this.state.currentEditArtworkInfo} />
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
            </div>
        );
    }


// -------------- METHODS -------------- //

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

    /**
     * This method will take in an array of blobs, then for each
     * blob, upload into the firebase-storage bucket, then create a
     * artwork object in the database with a pointer to the uploaded
     * file.
     * @param  {[Array]} files [Array of Image blobs from the uploader]
     */
    setUploadedFiles = (files) => {

        let thisUID = firebase.auth().currentUser.uid;
        let bucket  = firebase.storage().ref(pathToArtUploads+thisUID);
        let uploadPreviews = [];

        /**
         * TODO
         * @param {[type]}  that       [description]
         * @param {[type]}  uploadTask [description]
         * @param {Boolean} thisFile   [description]
         */
        function setUploads(uploadTask, thisFile) {
            console.log("*>> Upload successful", uploadTask.snapshot.downloadURL);
            let artRef = firebase.database().ref(pathToPublicOnboarder+thisUID).child('artworks');

            let artObjRef = artRef.push();
            let path      = artObjRef.toString().split('/');
            let thisID    = path[path.length -1];

            let artObject = {
                id    : thisID,
                image : uploadTask.snapshot.downloadURL,
                filename: thisFile.name,
                title : "Default Title",
                artist: "Default Artist",
                album : "Uploads",
                year  : 2018,
                description: "default desciprtion stuff stuff",
                colors: {
                    red   : false,
                    yellow: false,
                    blue  : false,
                    green : false,
                    orange: false,
                    purple: false,
                    brown : false,
                    black : false,
                    gray  : false,
                    white : false
                },
                tags  : "art cool tekuma"
            };
            artObjRef.set(artObject);
            thisFile.image = uploadTask.snapshot.downloadURL;
            uploadPreviews.push(thisFile);
            console.log("Revised file: ",thisFile);
            console.log("Upload Previews: ", uploadPreviews);
            console.log("this is this: ", this.state);
            ////////////

            let uploadAlbumRef = firebase.database().ref(pathToPublicOnboarder+thisUID+'/albums/0/artworks');
            let thisPromise = uploadAlbumRef.transaction(function(data){
                if (data == null) {
                    data = {0:thisID}
                } else {
                    let currentLength   = Object.keys(data).length;
                    data[currentLength] = thisID;
                }
                return data;

            }, function() {
                console.log("album setting complete");
            });

            this.setState({
                uploadDialogIsOpen: true,    // When we set files, we want to open Uplaod Dialog
                uploadPreviews     : uploadPreviews
            });
        }


        for (var i = 0; i < files.length; i++) {
            let thisFile = files[i];
            //FIXME use a For-Of loop , maybe?
            //FIXME make unique identifier for files so that if a user
            //uploads 2 files with same name, we don't shit the bed.
            let uploadTask = bucket.child(thisFile.name).put(thisFile);
            //just listen for completion
            //NOTE: 'on' args::on(event, nextOrObserver, error, complete)
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                null,
                null,
                setUploads.bind(this, uploadTask, thisFile)
            );
        }
        console.log("All upload previews: ", uploadPreviews);
    }


    /**
     * [description]
     * @param  {[type]} albums [description]
     * @return {[type]}        [description]
     */
    setAlbums = (albums) => {
        console.log("Albums: ", albums);
        this.setState({albums});
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
            uploadedFiles: []
        });
    }

    /**
     * This method is used by the Hidden Navigation component and LoggedOnHeader component
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
     * @param  {[String]} album [The album to be displayed]
     */
    changeAlbum = (album) => {
        this.setState({
            currentAlbum: album
        });
    }

    /**
     * This method is used by the editArtwork method of the ArtworksLayout component
     * populate this.state.currentEditArtworkInfo with the information of the
     * artwork being edited.
     * @param  {[String]} id [the unique id of the artwork being edited]
     */
    changeCurrentEditArtwork = (id) => {
        let artworkInfo;

        let artworks = this.state.userInfo.artworks;
        for (var artworkID in artworks) {
            if (artworks.hasOwnProperty(artworkID)) {
                let artwork = artworks[artworkID];
                if (artwork.id == id) {
                    artworkInfo = artwork;
                }
            }
        }

        this.setState({
            currentEditArtworkInfo: artworkInfo
        });
    }

    /**
     * This method is used by the Edit Profile Layout component
     * to change data between the edit user profile UI and profile information
     * in the Firebase DB. If the Avatar is also changed, the image must be
     * uploaded first, then the URL set to the avatar attribute, else the
     * DB is just updated with 'data'
     * @param  {[JSON} data [edited user profile information fields]
     */
    editUserProfile = (data) => {
        console.log(">>begin edit profile");
        const thisUID     = firebase.auth().currentUser.uid;
        let dataHasAvatar = data.hasOwnProperty('avatar');


        function updateText() {
            console.log(">>user info set!!",this);
            this.setState({
                editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
            });
        }

        function updateAvatar(data,uploadTask) {
            console.log(">>avatar upload successful");
            data.avatar = uploadTask.snapshot.downloadURL;
            firebase.database().ref(pathToPublicOnboarder + thisUID)
            .update(data)
            .then( updateText.bind(this) );
        };

        if (dataHasAvatar) {
            console.log(">>has avatar");
            let uploadTask = firebase.storage().ref('profile/' + thisUID).put(data.avatar);
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                null,
                null,
                updateAvatar.bind(this,data,uploadTask)
            );
        } else {
            console.log(">>No Avatar, updating text");
            let thisRef = firebase.database().ref(pathToPublicOnboarder + thisUID);
            thisRef.update(data).then( updateText.bind(this) );
        }



    }

    /** TODO Remove this method, depreciated.
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
     * This method is used by the EditArtworkForm  Component to reactively
     * update an artwork's attributes in Firebase.
     * @param  {String} id - the ID of the artwork to change.
     * @param  {JSON} data - obj of {attribute:update} to be written to
     * the database.
     */
    updateArtwork = (data) => {
        const thisUID = firebase.auth().currentUser.uid;
        let thisArtworkReference = firebase.database().ref(pathToPublicOnboarder+thisUID+'/artworks/' + data.id);
        console.log("this id:::",data.id);
        function toggleDiaglog() {
            this.toggleEditArtworkDialog();
            console.log("successful set in DB");
        }
        let thisPromise = thisArtworkReference.set(data);
        console.log("artwork data set with:", data);
        thisPromise.then(toggleDiaglog.bind(this));
    }

    /**
     * Delete artwork object from /artworks and
     * delete pointer from albums/##/artworks/
     * @param  {String} id [UID of artwork to be deleted]
     */
    deleteArtwork = (id) => {
        //delete from artworks branch
        const thisUID = firebase.auth().currentUser.uid;
        let thisArtworkReference = firebase.database().ref(pathToPublicOnboarder+thisUID+'/artworks/' + id);
        let thisPromise = thisArtworkReference.set(null);
        thisPromise.then(function() {console.log("deletion success");});
        //remove from albums
        let allAlbumRef = firebase.database().ref(pathToPublicOnboarder+thisUID+'/albums');
        allAlbumRef.transaction(function(data) {
            let albumLength = Object.keys(data).length
            console.log(albumLength, "albumLength");
            for (var i = 0; i < albumLength; i++) {
                let artworkLength = Object.keys(data[i]['artworks']).length;
                console.log(artworkLength, "artworkLength");
                let found = false;
                for (var j = 0; j < artworkLength; j++) {
                    if (found) {
                        let aheadObject = data[i]['artworks'][j];
                        data[i]['artworks'][j-1] = aheadObject;
                    }
                    if (data[i]['artworks'][j] == id) {
                        console.log("MATCH", id);
                        delete data[i]['artworks'][j];
                        found = true;
                    }
                }
                delete data[i]['artworks'][artworkLength-1];
                return data;
            }
        });

    }
}
