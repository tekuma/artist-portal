import React from 'react';
import HiddenNav from '../components/hidden_nav/HiddenNav';
import HamburgerIcon from '../components/hamburger_icon/HamburgerIcon';
import RootAppLayout from '../components/app-layouts/RootAppLayout';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import EditArtworkDialog from '../components/edit-artwork/EditArtworkDialog';
import ArtworkStore from '../stores/ArtworkStore';


@DragDropContext(HTML5Backend)  // Adds Drag & Drop to App
export default class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsOpen: false,               // Used to track whether Hidden Navigation is open
            managerIsOpen: true,            // Used to track whether Album Manager is open
            currentAlbum: 'Uploads',        // Used to track the current album open
            editArtworkIsOpen: false,       // Used to track whether artwork is being edited
            currentEditArtworkInfo: {},     // Used to track the current artwork being edited
            currentAppLayout: 'Artworks',   // Used to track the current layout being displayed
            userInfo: {}                    // Used to store User Profile Information
        };
    }

    render() {
        return (
            <div className="app">
                <HiddenNav
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
                    userInfo={this.state.userInfo} />
                <EditArtworkDialog
                    editArtworkIsOpen={this.state.editArtworkIsOpen}
                    toggleEditArtworkDialog={this.toggleEditArtworkDialog}
                    getCurrentEditArtwork={this.state.currentEditArtworkInfo} />
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