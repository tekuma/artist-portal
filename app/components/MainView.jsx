import React from 'react';
import AlbumManager from './album_manager/AlbumManager.jsx';
import ArtworkDashboard from './ArtworkDashboard.jsx';

export default ({navOpen, managerOpen, toggleManager}) => {
    return (
        <div className="view">
            <AlbumManager
                managerOpen={managerOpen}
                toggleManager={toggleManager} />
            <ArtworkDashboard
                managerOpen={managerOpen} />
            <div className={navOpen ? "site-overlay open" : "site-overlay"}></div>
        </div>
    );
}
