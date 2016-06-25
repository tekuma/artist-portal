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
            navOpen: false, // Used to track whether Hidden Navigation is open
            managerOpen: true,   // Used to track whether Album Manager is open
            currentAlbum: 'uploads' // Used to track the current album open
        };
    }

    render() {
        return (
            <div className="app">
                <HiddenNav
                    navOpen={this.state.navOpen} />
                <HamburgerIcon
                    toggleNav={this.toggleNav}
                    navOpen={this.state.navOpen} />
                <MainLayout
                    navOpen={this.state.navOpen}
                    toggleManager={this.toggleManager}
                    managerOpen={this.state.managerOpen}
                    currentAlbum={this.state.currentAlbum}
                    changeAlbum={this.changeAlbum} />
            </div>
        );
    }

    toggleNav = () => {
        this.setState({
            navOpen: !this.state.navOpen
        });
    };

    toggleManager = () => {
        this.setState({
            managerOpen: !this.state.managerOpen
        });
    };

    changeAlbum = (newAlbum) => {
        var album = newAlbum.toLowerCase();

        this.setState({
            currentAlbum: album
        });
    }
}
