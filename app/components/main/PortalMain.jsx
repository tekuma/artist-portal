// Libs
import React             from 'react';
import firebase          from 'firebase';

//Files
import PostAuthHeader    from '../headers/PostAuthHeader';
import AlbumManager      from '../album_manager/AlbumManager';
import ArtworkManager    from '../artwork_manager/ArtworkManager';
import EditProfile       from '../edit_profile/EditProfile';
import Views             from '../../constants/Views';


export default class PortalMain extends React.Component {
    state = {
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----PortalMain");
    }

    render() {
        switch (this.props.currentAppLayout) {
            case Views.ARTWORKS:
                return this.goToArtworkManager();

            case Views.EDIT:
                return this.goToEditProfile();
        }
    }

    componentDidMount() {
        console.log("+++++PortalMain");
        window.addEventListener("resize", this.rerender);
    }

    componentWillReceiveProps(nextProps) {
        //TODO
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.rerender);
    }

// ============= Flow Control ===============

    goToArtworkManager = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <PostAuthHeader
                    setUploadedFiles ={this.props.setUploadedFiles}
                    changeAppLayout  ={this.props.changeAppLayout}
                    />
                <AlbumManager
                    user                        ={this.props.user}
                    userPrivate                 ={this.props.userPrivate}
                    managerIsOpen               ={this.props.managerIsOpen}
                    toggleManager               ={this.props.toggleManager}
                    currentAlbum                ={this.props.currentAlbum}
                    changeAlbum                 ={this.props.changeAlbum}
                    toggleEditAlbumDialog       ={this.props.toggleEditAlbumDialog}
                    changeCurrentEditAlbum      ={this.props.changeCurrentEditAlbum}
                    setAlbumNames               ={this.props.setAlbumNames}
                    albums                      ={this.props.albums}
                    changeArtworkAlbum          ={this.props.changeArtworkAlbum}
                    />
                <ArtworkManager
                    deleteArtwork            ={this.props.deleteArtwork}
                    user                     ={this.props.user}
                    currentAlbum             ={this.props.currentAlbum}
                    toggleEditArtworkDialog  ={this.props.toggleEditArtworkDialog}
                    changeCurrentEditArtwork ={this.props.changeCurrentEditArtwork}
                    changeAppLayout          ={this.props.changeAppLayout}
                    managerIsOpen            ={this.props.managerIsOpen}
                    setUploadedFiles         ={this.props.setUploadedFiles}
                    />
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
            </div>
        );
    }

    goToEditProfile = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <PostAuthHeader
                    setUploadedFiles={this.props.setUploadedFiles}
                    changeAppLayout={this.props.changeAppLayout} />
                <div className="edit-profile-layout">
                    <EditProfile
                        user                      ={this.props.user}
                        userPrivate               ={this.props.userPrivate}
                        editPublicUserInfo        ={this.props.editPublicUserInfo}
                        editPrivateUserInfo       ={this.props.editPrivateUserInfo}
                        toggleDeleteAccountDialog ={this.props.toggleDeleteAccountDialog}
                        toggleVerifyEmailDialog   ={this.props.toggleVerifyEmailDialog}
                        />
                </div>
                <div className={this.props.navIsOpen ? "site-overlay open" : "site-overlay"}></div>
            </div>
        );
    }

    // ============= Methods ===============

    rerender = () => {
        this.setState({});
    }
}

// ============= PropTypes ==============

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
