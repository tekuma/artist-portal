import React from 'react';
import HiddenNav from './hidden_nav/HiddenNav.jsx';
import HamburgerIcon from './hamburger_icon/HamburgerIcon.jsx';
import MainLayout from './MainLayout.jsx';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import EditArtworkView from './edit-artwork/EditArtworkView.jsx';
import ArtworkActions from '../actions/ArtworkActions';


@DragDropContext(HTML5Backend)  // Adds Drag & Drop to App
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsOpen: false,           // Used to track whether Hidden Navigation is open
            managerIsOpen: true,        // Used to track whether Album Manager is open
            currentAlbum: 'Uploads',     // Used to track the current album open
            editArtworkIsOpen: false,    // Used to track whether artwork is being edited
            currentEditArtworkInfo: {}      // Used to track the current artwork being edited
        };
    }

    render() {
        return (
            <div className="app">
                <HiddenNav
                    navIsOpen={this.state.navIsOpen} />
                <HamburgerIcon
                    toggleNav={this.toggleNav}
                    navOpen={this.state.navIsOpen} />
                <MainLayout
                    navOpen={this.state.navIsOpen}
                    toggleEditArtworkView={this.toggleEditArtworkView}
                    changeCurrentEditArtwork={this.changeCurrentEditArtwork}
                    toggleManager={this.toggleManager}
                    managerIsOpen={this.state.managerIsOpen}
                    currentAlbum={this.state.currentAlbum}
                    changeAlbum={this.changeAlbum} />
                    <EditArtworkView
                        editArtworkIsOpen={this.state.editArtworkIsOpen}
                        toggleEditArtworkView={this.toggleEditArtworkView}
                        getCurrentEditArtwork={this.state.currentEditArtworkInfo}/>
            </div>
        );
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

    changeAlbum = (album) => {
        this.setState({
            currentAlbum: album
        });
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    }

    changeCurrentEditArtwork = (id) => {
        console.log(ArtworkActions.getArtworkInfo(id));
        var info  = ArtworkActions.getArtworkInfo(id);

        this.setState({
            currentEditArtworkInfo: info
        });
        console.log(info);
    }

    toggleEditArtworkView = () => {
        this.setState({
            editArtworkIsOpen: !this.state.editArtworkIsOpen
        });
    }
}
