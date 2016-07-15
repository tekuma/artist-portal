// Libs
import React             from 'react';

//Files
import LoggedOnHeader    from '../headers/LoggedOnHeader';
import AlbumManager      from '../album_manager/AlbumManager';
import ArtworksLayout    from './ArtworksLayout';
import EditProfileLayout from '../edit-profile/EditProfileLayout';
import Views             from '../../constants/Views';

export default class RootAppLayout extends React.Component {
    state = {

    };

    constructor(props) {
        super(props);
    }

    // rerender = () => {
    //     this.setState({});
    // }

    componentDidMount() {
        console.log("++++RootAppLayout");
        console.log(this.props.user);
        // window.addEventListener("resize", this.rerender);
    }

    componentWillMount() {
        console.log("----RootAppLayout");

    }

    // componentWillUnmount() {
    //     window.removeEventListener("resize", this.rerender);
    // }

    render() {
        switch (this.props.currentAppLayout) {
            case Views.ARTWORKS:
                return this.renderArtworksLayout();

            case Views.EDIT:
                return this.renderEditProfileLayout();
        }
    }

    // ---------------- VIEWS ---------------- //

    renderArtworksLayout = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <LoggedOnHeader
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
                <ArtworksLayout
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

    renderEditProfileLayout = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <LoggedOnHeader
                    setUploadedFiles={this.props.setUploadedFiles}
                    changeAppLayout={this.props.changeAppLayout} />
                <div className="layout-centered">
                    <EditProfileLayout
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
