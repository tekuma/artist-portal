import React from 'react';
import AlbumManager from './album_manager/AlbumManager.jsx';
import ArtworkDashboard from './ArtworkDashboard.jsx';

export default ({navOpen, managerOpen, toggleManager, currentAlbum, changeAlbum}) => {
    return (
        <div className="view">
            <AlbumManager
                managerOpen={managerOpen}
                toggleManager={toggleManager}
                currentAlbum={currentAlbum}
                changeAlbum={changeAlbum} />
            <ArtworkDashboard
                currentAlbum={currentAlbum}
                managerOpen={managerOpen} />
            <div className={navOpen ? "site-overlay open" : "site-overlay"}></div>
        </div>
    );
}
