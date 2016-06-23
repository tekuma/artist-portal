import React from 'react';
import HiddenNav from './hidden_nav/HiddenNav.jsx';
import HamburgerIcon from './hamburger_icon/HamburgerIcon.jsx';
import MainLayout from './MainLayout.jsx';
import AlbumManager from './album_manager/AlbumManager.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <AlbumManager />
            </div>
        );
    }
}
