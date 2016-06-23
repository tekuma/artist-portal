import React from 'react';
import Header from './header/Header.jsx';
import MainView from './MainView.jsx';

export default ({navOpen, managerOpen, toggleManager, currentAlbum, changeAlbum}) => {
    return (
        <div className={navOpen ? "main-wrapper open" : "main-wrapper"}>
            <Header />
            <MainView
                navOpen={navOpen}
                managerOpen={managerOpen}
                toggleManager={toggleManager}
                currentAlbum={currentAlbum}
                changeAlbum={changeAlbum} />
        </div>
    );
}
