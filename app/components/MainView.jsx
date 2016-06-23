import React from 'react';
import AlbumManager from './album_manager/AlbumManager.jsx';
import ArtworkDashboard from './ArtworkDashboard.jsx';

export default class MainView extends React.Component {
    render() {
        return (
            <div className="view">
                <AlbumManager />
                <ArtworkDashboard />
                <div className="site-overlay"></div>
            </div>
        );
    }
}
