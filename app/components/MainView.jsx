import React from 'react';
import AlbumManager from './album_manager/AlbumManager.jsx';
import ArtworkDashboard from './ArtworkDashboard.jsx';

export default class MainView extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    rerender = () => {
        this.setState({});
    }

    componentDidMount() {
        window.addEventListener("resize", this.rerender);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.rerender);
    }

    componentWillReceiveProps(nextProps) {
        this.rerender();
    }

    render() {
        return (
            <div className="view">
                <AlbumManager
                    managerOpen={this.props.managerOpen}
                    toggleManager={this.props.toggleManager}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum} />
                <ArtworkDashboard
                    currentAlbum={this.props.currentAlbum}
                    managerOpen={this.props.managerOpen} />
                <div className={this.props.navOpen ? "site-overlay open" : "site-overlay"}></div>
            </div>
        );
    }
}
