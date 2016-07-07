import React from 'react';
import LoggedOnHeader from '../headers/LoggedOnHeader';
import AlbumManager from '../album_manager/AlbumManager';
import ArtworksLayout from './ArtworksLayout';
import UploadLayout from './UploadLayout';
import EditProfileLayout from '../edit-profile/EditProfileLayout';
import Views from '../../constants/Views';

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

    render() {
        switch (this.props.currentAppLayout) {
            case Views.ARTWORKS:
                return this.renderArtworksLayout();

            case Views.UPLOAD:
                return this.renderUploadLayout();

            case Views.EDIT:
                return this.renderEditProfileLayout();
        }
    }

    // ---------------- VIEWS ---------------- //

    renderArtworksLayout = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <LoggedOnHeader changeAppLayout={this.props.changeAppLayout}/>
                <AlbumManager
                    managerIsOpen={this.props.managerIsOpen}
                    toggleManager={this.props.toggleManager}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum}
                    setAlbumNames={this.props.setAlbumNames}
                    albums={this.props.albums}
                    userInfo={this.props.userInfo}
                    changeArtworkAlbum={this.props.changeArtworkAlbum} />
                <ArtworksLayout
                    deleteArtwork={this.props.deleteArtwork}
                    userInfo={this.props.userInfo}
                    currentAlbum={this.props.currentAlbum}
                    toggleEditArtworkDialog={this.props.toggleEditArtworkDialog}
                    changeCurrentEditArtwork={this.props.changeCurrentEditArtwork}
                    changeAppLayout={this.props.changeAppLayout}
                    managerIsOpen={this.props.managerIsOpen} />
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
            </div>
        );
    }

    renderUploadLayout = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <LoggedOnHeader changeAppLayout={this.props.changeAppLayout} />
                <div className="layout-centered">
                    <UploadLayout
                        setUploadedFiles={this.props.setUploadedFiles} />
                </div>
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
            </div>
        );
    }

    renderEditProfileLayout = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <LoggedOnHeader changeAppLayout={this.props.changeAppLayout} />
                <div className="layout-centered">
                    <EditProfileLayout
                        userInfo={this.props.userInfo}
                        editUserProfile={this.props.editUserProfile}
                        toggleDeleteAccountDialog={this.props.toggleDeleteAccountDialog} />
                </div>
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
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
