'use strict';
// Libs
import React          from 'react';
import firebase       from 'firebase';
// Views and Files    NOTE: Do not include '.jsx'
import HiddenNav         from '../components/hidden_nav/HiddenNav';
import HamburgerIcon     from '../components/hamburger_icon/HamburgerIcon';
import RootAppLayout     from '../components/app-layouts/RootAppLayout';
import EditArtworkDialog from '../components/edit-artwork/EditArtworkDialog';
import UploadDialog      from '../components/app-layouts/UploadDialog';
import ArtworkStore      from '../stores/ArtworkStore';
import HTML5Backend      from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';


@DragDropContext(HTML5Backend)  // Adds Drag & Drop to App
export default class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsOpen: false,               // Used to track whether Hidden Navigation is open
            managerIsOpen: true,            // Used to track whether Album Manager is open
            //TODO change to ENUM (prop) types
            currentAlbum: 'Uploads',        // Used to track the current album open
            editArtworkIsOpen: false,       // Used to track whether artwork is being edited
            uploadDialogIsOpen: false,      // Used to track whether artwork have been uploaded
            currentEditArtworkInfo: {},     // Used to track the current artwork being edited
            currentAppLayout: 'Artworks',   // Used to track the current layout being displayed
            userInfo: {
                display_name: "Afika Nyati",
                email: "afika.a.nyati@gmail.com",
                dob: "26-03-1995",
                gender: "male",
                bio: "hello me!",
                avatar: {},
                location: "Boston, MA",
                portfolio: "http://afikanyati.com"
                    },                   // Used to store User Profile Information
            uploadedFiles: []               // Used to store User Profile Information
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
        firebase.database().ref('onboarders/' + thisUID).on('value', function(snapshot) {

            this.setState({userInfo: snapshot.val()})
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
                    changeAppLayout={this.changeAppLayout} />
                <HamburgerIcon
                    toggleNav={this.toggleNav}
                    navIsOpen={this.state.navIsOpen} />
                <RootAppLayout
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
                    editUserProfile={this.editUserProfile} />
                <EditArtworkDialog
                    editArtworkIsOpen={this.state.editArtworkIsOpen}
                    toggleEditArtworkDialog={this.toggleEditArtworkDialog}
                    getCurrentEditArtwork={this.state.currentEditArtworkInfo} />
                <UploadDialog
                    closeUploadDialog={this.closeUploadDialog}
                    uploadedFiles={this.state.uploadedFiles}
                    uploadDialogIsOpen={this.state.uploadDialogIsOpen} />
            </div>
        );
    }


// -------------- METHODS -------------- //

    /**
     * [description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    setUserInfo = (snapshot) => {
        console.log(">>>data: ", snapshot.val());
        this.setState({userInfo:snapshot.val()});
        console.log(this.state.userInfo);
    }

    /**
     * [description]
     * @return {[type]} [description]
     */
    toggleNav = () => {
        this.setState({
            navIsOpen: !this.state.navIsOpen
        });
    };

    /**
     * [description]
     * @return {[type]} [description]
     */
    toggleManager = () => {

        this.setState({
            managerIsOpen: !this.state.managerIsOpen
        });
    };

    /**
     * [description]
     * @return {[type]} [description]
     */
    toggleEditArtworkDialog = () => {
        this.setState({
            editArtworkIsOpen: !this.state.editArtworkIsOpen
        });
    }

    /**
     * [description]
     * @return {[type]} [description]
     */
    closeUploadDialog = () => {
        this.setState({
            uploadDialogIsOpen: !this.state.uploadDialogIsOpen
        });
        this.clearUploadedFiles();
    }

    /**
     * This function will take in an array of blobs, then for each
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
                function() {
                    console.log("*>> Upload successful", uploadTask.snapshot.downloadURL);
                    let artRef = firebase.database().ref('onboarders/'+thisUID).child('artworks');
                    let artObjRef = artRef.push();
                    let path   = artObjRef.toString().split('/');
                    let thisID = path[path.length -1];

                    let artObject = {
                        id    : thisID,
                        image : uploadTask.snapshot.downloadURL,
                        title : "Default Title",
                        artist: "Default Arist",
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
                }
            );

        }
        this.setState({
            uploadDialogIsOpen: true,    // When we set files, we want to open Uplaod Dialog
            uploadedFiles     : files
        });
    }



    /**
     * [description]
     * @return {[type]} [description]
     */
    clearUploadedFiles = () => {
        this.setState({
            uploadedFiles: []
        });
    }

    /** [description] */
    changeAppLayout = (view) => {

        if(this.state.navIsOpen) {
            this.setState({
                currentAppLayout: view,
                navIsOpen: false
            });
        } else {
            this.setState({
                currentAppLayout: view
            });
        }
    }

    /**
     * [description]
     * @param  {[type]} album [description]
     * @return {[type]}       [description]
     */
    changeAlbum = (album) => {
        this.setState({
            currentAlbum: album
        });
    }

    /**
     * [description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    changeCurrentEditArtwork = (id) => {
        var info  = ArtworkStore.getState().artworks.filter(artwork => artwork.id === id)[0]

        this.setState({
            currentEditArtworkInfo: info
        });
    }

    /**
     * [description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    editUserProfile = (data) => {
        console.log("entered edit user profile");
        this.setState({
            userInfo: data
        });
        console.log("User info should be updated");
    }
}
