import React from 'react';
import HiddenNav from './hidden_nav/HiddenNav.jsx';
import HamburgerIcon from './hamburger_icon/HamburgerIcon.jsx';
import MainLayout from './MainLayout.jsx';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)  // Adds Drag & Drop to App
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsOpen: false,           // Used to track whether Hidden Navigation is open
            managerIsOpen: true,        // Used to track whether Album Manager is open
            currentAlbum: 'Uploads'     // Used to track the current album open
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
                    toggleManager={this.toggleManager}
                    managerIsOpen={this.state.managerIsOpen}
                    currentAlbum={this.state.currentAlbum}
                    changeAlbum={this.changeAlbum} />
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

    changeAlbum = (newAlbum) => {
        var album = newAlbum;

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
}
