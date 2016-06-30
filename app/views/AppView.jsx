'use strict';
// Libs
import React          from 'react';
import Firebase       from 'firebase';
// import Rebase         from 're-base'

// Views and Files
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
            currentAlbum: 'Uploads',        // Used to track the current album open
            editArtworkIsOpen: false,       // Used to track whether artwork is being edited
            uploadDialogIsOpen: false,      // Used to track whether artwork have been uploaded
            currentEditArtworkInfo: {},     // Used to track the current artwork being edited
            currentAppLayout: 'Artworks',   // Used to track the current layout being displayed
            userInfo: {
                display_name: "_def"
            },                              // Used to store User Profile Information
            uploadedFiles: []               // Used to store User Profile Information
        };
    }


    componentWillMount() {
        const thisUID = firebase.auth().currentUser.uid;


        firebase.database().ref('onboarders/' + thisUID).on('value', function(snapshot) {

            this.setState({userInfo: snapshot.val()})
            console.log("Hello world, this is this", this);
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
                    setUploadedFiles={this.setUploadedFiles} />
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


    toggleNav = () => {
        this.setState({
            navIsOpen: !this.state.navIsOpen
        });
    };

    toggleManager = () => {

        this.setState({
            managerIsOpen: !this.state.managerIsOpen
        });
    };

    toggleEditArtworkDialog = () => {
        this.setState({
            editArtworkIsOpen: !this.state.editArtworkIsOpen
        });
    }

    closeUploadDialog = () => {
        this.setState({
            uploadDialogIsOpen: !this.state.uploadDialogIsOpen
        });
    }

    setUploadedFiles = (files) => {
        this.setState({
            uploadedFiles: files,
            uploadDialogIsOpen: true    // When we set files, we want to open Uplaod Dialog
        });
    }

    clearUploadedFiles = () => {
        this.setState({
            uploadedFiles: {}
        });
    }

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

    changeAlbum = (album) => {
        this.setState({
            currentAlbum: album
        });
    }

    changeCurrentEditArtwork = (id) => {
        var info  = ArtworkStore.getState().artworks.filter(artwork => artwork.id === id)[0]

        this.setState({
            currentEditArtworkInfo: info
        });
    }

}
