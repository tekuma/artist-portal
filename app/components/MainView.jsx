import React from 'react';
import AlbumManager from './album_manager/AlbumManager.jsx';
import ArtworkDashboard from './ArtworkDashboard.jsx';

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="view">
                <AlbumManager />
                <ArtworkDashboard />
                <div className={this.props.navOpen ? "site-overlay open" : "site-overlay"}></div>
            </div>
        );
    }
}
