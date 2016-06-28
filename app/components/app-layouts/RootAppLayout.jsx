import React from 'react';
import Header from '../header/Header.jsx';
import AlbumManager from '../album_manager/AlbumManager';
import ArtworksLayout from './ArtworksLayout';
import UploadLayout from './UploadLayout';
import EditProfileLayout from './EditProfileLayout';
import ReactTooltip from "react-tooltip";

export default class RootAppLayout extends React.Component {
    constructor(props) {
        super(props);
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
        switch (this.props.currentAppLayout) {
            case 'Artworks':
                return this.renderArtworksLayout();

            case 'Upload':
                return this.renderUploadLayout();

            case 'Edit Profile':
                return this.renderEditProfileLayout();
        }
    }

    // ---------------- VIEWS ---------------- //

    renderArtworksLayout = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <Header changeAppLayout={this.props.changeAppLayout}/>
                <AlbumManager
                    managerIsOpen={this.props.managerIsOpen}
                    toggleManager={this.props.toggleManager}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum} />
                <ArtworksLayout
                    currentAlbum={this.props.currentAlbum}
                    toggleEditArtworkDialog={this.props.toggleEditArtworkDialog}
                    changeCurrentEditArtwork={this.props.changeCurrentEditArtwork}
                    changeAppLayout={this.props.changeAppLayout}
                    managerIsOpen={this.props.managerIsOpen} />
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
                <ReactTooltip
                    place="bottom"
                    class="tooltip"
                    delayShow={700}
                    eventOff="click" />
            </div>
        );
    }

    renderUploadLayout = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <Header changeAppLayout={this.props.changeAppLayout} />
                <div className="layout-centered">
                    <UploadLayout />
                </div>
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
                <ReactTooltip
                    place="bottom"
                    class="tooltip"
                    delayShow={700}
                    eventOff="click" />
            </div>
        );
    }

    renderEditProfileLayout = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <Header changeAppLayout={this.props.changeAppLayout} />
                <div className="layout-centered">
                    <EditProfileLayout userInfo={this.props.userInfo}/>
                </div>
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
                <ReactTooltip
                    place="bottom"
                    class="tooltip"
                    delayShow={700}
                    eventOff="click" />
            </div>
        );
    }
}


RootAppLayout.propTypes = {
    navIsOpen: React.PropTypes.bool.isRequired,
    managerIsOpen: React.PropTypes.bool.isRequired,
    toggleManager: React.PropTypes.func.isRequired,
    currentAlbum: React.PropTypes.string.isRequired,
    changeAlbum: React.PropTypes.func.isRequired,
    changeAppLayout: React.PropTypes.func.isRequired,
    toggleEditArtworkDialog: React.PropTypes.func.isRequired,
    changeCurrentEditArtwork: React.PropTypes.func.isRequired
};
