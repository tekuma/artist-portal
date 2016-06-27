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
                    managerIsOpen={this.props.managerIsOpen}
                    toggleManager={this.props.toggleManager}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum} />
                <ArtworkDashboard
                    currentAlbum={this.props.currentAlbum}
                    toggleEditArtworkView={this.props.toggleEditArtworkView}
                    changeCurrentEditArtwork={this.props.changeCurrentEditArtwork}
                    managerIsOpen={this.props.managerIsOpen} />
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
            </div>
        );
    }
}
