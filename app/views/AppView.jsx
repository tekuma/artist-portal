import React from 'react';
import HiddenNav from '../components/hidden_nav/HiddenNav';
import HamburgerIcon from '../components/hamburger_icon/HamburgerIcon';
import RootAppLayout from '../components/app-layouts/RootAppLayout';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import EditArtworkDialog from '../components/edit-artwork/EditArtworkDialog';
import UploadDialog from '../components/app-layouts/UploadDialog';
import ArtworkStore from '../stores/ArtworkStore';

import Firebase from 'firebase';


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
            userInfo: {display_name: "Afika Nyati",
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




// -------------- FUNCTIONS -------------- //

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

    editUserProfile = (data) => {
        console.log("entered edit user profile");
        this.setState({
            userInfo: data
        });
        console.log("User info should be updated");
    }
}
