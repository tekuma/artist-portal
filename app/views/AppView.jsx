'use strict';
// Libs
import React          from 'react';
import firebase       from 'firebase';
// Views and Files    NOTE: Do not include '.jsx'
import HiddenNav         from '../components/hidden_nav/HiddenNav';
import HamburgerIcon     from '../components/hamburger_icon/HamburgerIcon';
import RootAppLayout     from '../components/app-layouts/RootAppLayout';
import EditArtworkDialog from '../components/edit-artwork/EditArtworkDialog';
import EditProfileDialog from '../components/edit-profile/EditProfileDialog';
import UploadDialog      from '../components/app-layouts/UploadDialog';
import DeleteAccountDialog from '../components/DeleteAccountDialog';
import ArtworkStore      from '../stores/ArtworkStore';
import HTML5Backend      from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import Views from '../constants/Views';


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
     * NOTE: WillMount vs DidMount
     *
     * [componentWillMount description]
     * @return {[type]} [description]
     */
    componentWillMount() {
        const thisUID = firebase.auth().currentUser.uid;

        //TODO #RFC change strings to global vars at begining of file.
        firebase.database().ref('public/onboarders/' + thisUID).on('value', function(snapshot) {

            this.setState({userInfo: snapshot.val()});
            console.log("Hello world, this is the user", this.state.userInfo);
        }, function(errorStuff){
            console.log(errorStuff);
        }, this);
    }


    componentDidMount() {
        //TODO
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
        //Upload to firebase,
        //TODO get pointers
        console.log("USER :::::::::::");
        let thisUID = firebase.auth().currentUser.uid;
        let bucket  = firebase.storage().ref("artworks/"+thisUID);
        let uploadPreviews = [];

        function setUploads(that, uploadTask, thisFile) {
            console.log("*>> Upload successful", uploadTask.snapshot.downloadURL);
            let artRef = firebase.database().ref('public/onboarders/'+thisUID).child('artworks');
            let artObjRef = artRef.push();
            let path   = artObjRef.toString().split('/');
            let thisID = path[path.length -1];

            let artObject = {
                id    : thisID,
                image : uploadTask.snapshot.downloadURL,
                fileName: thisFile.name,
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
            console.log("this is this: ", that.state);

            that.setState({
                uploadDialogIsOpen: true,    // When we set files, we want to open Uplaod Dialog
                uploadPreviews     : uploadPreviews
            });
        }

        for (var i = 0; i < files.length; i++) {
            let thisFile = files[i];
            //FIXME make unique identifier for files so that if a user
            //uploads 2 files with same name, we don't shit the bed.
            let uploadTask = bucket.child(thisFile.name).put(thisFile);
            //just listen for completion
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                null,
                null,
                setUploads.bind(null, this, uploadTask, thisFile)
            );
        }
        console.log("All upload previews: ", uploadPreviews);
    }

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
     * to populate this.state.userInfo with newly edited user profile information
     * and to open the Edit Profile Dialog component to inform the user of the
     * chnages
     * @param  {[JSON object} data [edited user profile information]
     */
    editUserProfile = (data) => {
        console.log("entered edit user profile method");

        let artworks = {}
        artworks.artworks = this.state.userInfo.artworks;
        console.log("Artworks: ",artworks);
        let userInfo = Object.assign({}, data, artworks);
        console.log("Data: ", userInfo);

        this.setState({
            userInfo: userInfo,
            editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
        });
        console.log("User info should be updated");
    }

    /**
     * This method is used by the Delete Account Dialog component
     * to delete a user's information and artworks from the Firebase Database
     */
    deleteAccount = () => {
        // TODO enter in firebase commands to delete account
        console.log("Account is deleted.");
        this.toggleDeleteAccountDialog();
    }
}
