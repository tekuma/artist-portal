// Libs
import React             from 'react';

//Files
import PostAuthHeader    from '../headers/PostAuthHeader';
import AlbumManager      from '../album_manager/AlbumManager';
import ArtworkManager    from './ArtworkManager';
import EditProfile from '../edit-profile/EditProfile';
import Views             from '../../constants/Views';

export default class PortalMain extends React.Component {
    state = {

    };

    constructor(props) {
        super(props);
    }

    // rerender = () => {
    //     this.setState({});
    // }

    componentDidMount() {
        console.log("++++PortalMain");
        console.log(this.props.user);
        // window.addEventListener("resize", this.rerender);
    }

    componentWillMount() {
        console.log("----PortalMain");

    }

    // componentWillUnmount() {
    //     window.removeEventListener("resize", this.rerender);
    // }

    render() {
        switch (this.props.currentAppLayout) {
            case Views.ARTWORKS:
                return this.renderArtworkManager();

            case Views.EDIT:
                return this.renderEditProfile();
        }
    }

    // ---------------- VIEWS ---------------- //

    renderArtworkManager = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <PostAuthHeader
                    setUploadedFiles={this.props.setUploadedFiles}
                    changeAppLayout={this.props.changeAppLayout}/>
                <AlbumManager
                    user={this.props.user}
                    userprivate={this.props.userprivate}

                    managerIsOpen={this.props.managerIsOpen}
                    toggleManager={this.props.toggleManager}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum}
                    setAlbumNames={this.props.setAlbumNames}
                    albums={this.props.albums}
                    changeArtworkAlbum={this.props.changeArtworkAlbum} />
                <ArtworkManager
                    deleteArtwork={this.props.deleteArtwork}
                    user={this.props.user}
                    currentAlbum={this.props.currentAlbum}
                    toggleEditArtworkDialog={this.props.toggleEditArtworkDialog}
                    changeCurrentEditArtwork={this.props.changeCurrentEditArtwork}
                    changeAppLayout={this.props.changeAppLayout}
                    managerIsOpen={this.props.managerIsOpen}
                    setUploadedFiles={this.props.setUploadedFiles} />
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
            </div>
        );
    }

    renderEditProfile = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <PostAuthHeader
                    setUploadedFiles={this.props.setUploadedFiles}
                    changeAppLayout={this.props.changeAppLayout} />
                <div className="layout-centered">
                    <EditProfile
                        user={this.props.user}
                        editPublicUserInfo={this.props.editPublicUserInfo}
                        editPrivateUserInfo={this.props.editPrivateUserInfo}
                        toggleDeleteAccountDialog={this.props.toggleDeleteAccountDialog} />
                </div>
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
            </div>
        );
    }
}


PortalMain.propTypes = {
    navIsOpen: React.PropTypes.bool.isRequired,
    managerIsOpen: React.PropTypes.bool.isRequired,
    toggleManager: React.PropTypes.func.isRequired,
    currentAlbum: React.PropTypes.string.isRequired,
    changeAlbum: React.PropTypes.func.isRequired,
    changeAppLayout: React.PropTypes.func.isRequired,
    toggleEditArtworkDialog: React.PropTypes.func.isRequired,
    changeCurrentEditArtwork: React.PropTypes.func.isRequired
};
