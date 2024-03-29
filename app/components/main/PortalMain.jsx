// Libs
import React                from 'react';
import firebase             from 'firebase';
//Files
import PostAuthHeader       from '../headers/PostAuthHeader';
import ArtworksAlbumManager from '../album_manager/ArtworksAlbumManager';
import SubmitArtworkManager from '../review/SubmitArtworkManager';
import SubmitArtworkInfo    from '../review/SubmitArtworkInfo';
import ArtworkManager       from '../artwork_manager/ArtworkManager';
import EditProfile          from '../edit_profile/EditProfile';
import Views                from '../../constants/Views';


let config = {
    apiKey       : "AIzaSyDPLbeNTIctAEKu14VFeQuun8wz6ZbdTWU",
    authDomain   : "curator-tekuma.firebaseapp.com",
    databaseURL  : "https://curator-tekuma.firebaseio.com",
    storageBucket: "curator-tekuma.appspot.com",
};
const curator = firebase.initializeApp(config,"curator");

export default class PortalMain extends React.Component {
    state = {
        submits: {},
        submitArtwork:{},
    }

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

            case Views.PROFILE:
                return this.goToEditProfile();

            case Views.REVIEW:
                return this.goToSubmissions();
        }
    }

    componentDidMount() {
        console.log("+++++PortalMain");
        this.gatherSubmissions();
        window.addEventListener("resize", this.rerender);
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEXT->",nextProps);
        if (nextProps.user.submits != this.props.user.submits) {
            this.gatherSubmissions();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.rerender);
    }

// ============= Render Control ===============

    //NOTE: PostAuthHeader has 3 declarations
    goToArtworkManager = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <PostAuthHeader
                    setActingUID={this.props.setActingUID}
                    setActingUser={this.props.setActingUser}
                    actingUID={this.props.actingUID}
                    paths={this.props.paths}
                    user={this.props.user}
                    setUploadedFiles ={this.props.setUploadedFiles}
                    changeAppLayout  ={this.props.changeAppLayout}
                    />
                <ArtworksAlbumManager
                    paths                  ={this.props.paths}
                    user                   ={this.props.user}
                    userPrivate            ={this.props.userPrivate}
                    managerIsOpen          ={this.props.managerIsOpen}
                    toggleManager          ={this.props.toggleManager}
                    currentAlbum           ={this.props.currentAlbum}
                    changeAlbum            ={this.props.changeAlbum}
                    toggleEditAlbumDialog  ={this.props.toggleEditAlbumDialog}
                    toggleEditMiscAlbumDialog  ={this.props.toggleEditMiscAlbumDialog}
                    changeCurrentEditAlbum ={this.props.changeCurrentEditAlbum}
                    setAlbumNames          ={this.props.setAlbumNames}
                    albums                 ={this.props.albums}
                    changeArtworkAlbum     ={this.props.changeArtworkAlbum}
                    />
                <ArtworkManager
                    actingUID={this.props.actingUID}
                    paths={this.props.paths}
                    onSubmit={this.props.onSubmit}
                    deleteArtwork            ={this.props.deleteArtwork}
                    user                     ={this.props.user}
                    currentAlbum             ={this.props.currentAlbum}
                    changeAlbum              ={this.props.changeAlbum}
                    toggleEditArtworkDialog  ={this.props.toggleEditArtworkDialog}
                    changeCurrentEditArtwork ={this.props.changeCurrentEditArtwork}
                    changeAppLayout          ={this.props.changeAppLayout}
                    managerIsOpen            ={this.props.managerIsOpen}
                    setUploadedFiles         ={this.props.setUploadedFiles}
                    toggleArtworkDetailDialog={this.props.toggleArtworkDetailDialog}
                    sendToSnackbar           ={this.props.sendToSnackbar}
                    />
                <div
                    onClick     ={this.props.toggleNav}
                    onTouchTap  ={this.props.toggleNav}
                    className   ={this.props.navIsOpen ? "site-overlay open" : "site-overlay"} />
            </div>
        );
    }

    goToEditProfile = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <PostAuthHeader
                    setActingUID={this.props.setActingUID}
                    setActingUser={this.props.setActingUser}
                    actingUID={this.props.actingUID}
                    paths={this.props.paths}
                    setUploadedFiles={this.props.setUploadedFiles}
                    user={this.props.user}
                    changeAppLayout={this.props.changeAppLayout} />
                <div className="edit-profile-layout">
                    <EditProfile
                        paths                     ={this.props.paths}
                        user                      ={this.props.user}
                        userPrivate               ={this.props.userPrivate}
                        editPublicUserInfo        ={this.props.editPublicUserInfo}
                        editPrivateUserInfo       ={this.props.editPrivateUserInfo}
                        toggleDeleteAccountDialog ={this.props.toggleDeleteAccountDialog}
                        toggleVerifyEmailDialog   ={this.props.toggleVerifyEmailDialog}
                        />
                </div>
                <div
                    onClick     ={this.props.toggleNav}
                    onTouchTap  ={this.props.toggleNav}
                    className   ={this.props.navIsOpen ? "site-overlay open" : "site-overlay"} />
            </div>
        );
    }

    goToSubmissions = () => {
        return (
            <div className={this.props.navIsOpen ? "main-wrapper open" : "main-wrapper"}>
                <PostAuthHeader
                    setActingUID     ={this.props.setActingUID}
                    actingUID        ={this.props.actingUID}
                    setActingUser    ={this.props.setActingUser}
                    paths            ={this.props.paths}
                    user             ={this.props.user}
                    setUploadedFiles ={this.props.setUploadedFiles}
                    changeAppLayout  ={this.props.changeAppLayout}
                    />
                <SubmitArtworkManager
                    paths={this.props.paths}
                    submits={this.state.submits}
                    submitArtwork={this.state.submitArtwork}
                    changeSubmitArtwork={this.changeSubmitArtwork}
                    currentAppLayout={this.props.currentAppLayout}
                    managerIsOpen   ={this.props.managerIsOpen}
                    toggleManager   ={this.props.toggleManager} />
                <SubmitArtworkInfo
                    paths={this.props.paths}
                    currentAppLayout={this.props.currentAppLayout}
                    submits={this.state.submits}
                    managerIsOpen   ={this.props.managerIsOpen}
                    submitArtwork={this.state.submitArtwork}/>
                <div
                    onClick    ={this.props.toggleNav}
                    onTouchTap ={this.props.toggleNav}
                    className  ={this.props.navIsOpen ? "site-overlay open" : "site-overlay"} />
            </div>
        );
    }

    // ============= Methods ===============

    rerender = () => {
        this.setState({});
    }

    changeSubmitArtwork = (artwork) => {
        this.setState({submitArtwork:artwork});

        // TODO: Turn new_message attribute of submitted artwork off
        console.log(`The opened submitted artwork is: ${artwork}. If this artwork had a new_message, it should be turned off.`);
    }

    /**
     * FIXME
     * This method reads this.props.user.submits list, and gathers the information
     * from the curator database for each of the submissions, then stores this
     * in state.
     *  -NOTE: This method uses the curator app.
     *  -NOTE: There is sometimes an error of reading user.submits before
     * this info returns from firebase. To prevent this, a timeout is used. As it
     * would take the user at least 1 second to navigate to the Gallery interface,
     * this timeout would not interfere with the UX.
     */
    gatherSubmissions = () => {
        setTimeout(()=>{
            let submits =  this.props.user.submits; // list of submitted UIDs
            if (submits) {
                for (let i = 0; i < submits.length; i++) { // use let not var
                    console.log("->",submits[i]);
                    let sub_path = `submissions/${submits[i]}`;
                    let apr_path = `approved/${submits[i]}`;
                    let dec_path = `declined/${submits[i]}`;
                    let hld_path = `held/${submits[i]}`;
                    curator.database().ref(sub_path).on("value",(sub_snapshot)=>{
                        curator.database().ref(apr_path).on("value",(apr_snapshot)=>{
                            curator.database().ref(dec_path).on("value", (dec_snapshot)=>{
                                curator.database().ref(hld_path).on("value", (hld_snapshot)=>{
                                    let sub_data = sub_snapshot.val();
                                    let apr_data = apr_snapshot.val();
                                    let dec_data = dec_snapshot.val();
                                    let hld_data = hld_snapshot.val();

                                    if (sub_data) {
                                        console.log(">> Submission");
                                        let statesubmits = Object.assign({},this.state.submits); //deepcopy
                                        statesubmits[submits[i]] = sub_data;
                                        this.setState({
                                            submits: statesubmits
                                        });
                                    }  else if (apr_data) {
                                        console.log(">> Approved");
                                        let statesubmits = Object.assign({},this.state.submits); //deepcopy
                                        statesubmits[submits[i]] = apr_data;
                                        this.setState({
                                            submits: statesubmits
                                        });
                                    } else if (dec_data) {
                                        console.log(">>> Declined.");
                                        let statesubmits = Object.assign({},this.state.submits); //deepcopy
                                        statesubmits[submits[i]] = dec_data;
                                        this.setState({
                                            submits: statesubmits
                                        });
                                    } else if (hld_data) {
                                        console.log(">> Held");
                                        let statesubmits = Object.assign({},this.state.submits); //deepcopy
                                        statesubmits[submits[i]] = hld_data;
                                        this.setState({
                                            submits: statesubmits
                                        });
                                    } else {
                                        //TODO If we reach here, the submit is not in the submissions
                                        //FIXME or the approved branch. Therefore, it must have been
                                        // deleted by a curator. Therefore, remove it from this artist's
                                        // list of submits, AND change the status of this artwork in the
                                        // studio interface so that can re-upload.
                                        console.log(submits[i], "Does not exist");
                                    }
                                },(err)=>{
                                    console.log(err);
                                });
                            });
                        });
                        console.log(" :()");
                    });
                }
            }
        }, 1000);
    }
}

// ============= PropTypes ==============

PortalMain.propTypes = {
    navIsOpen               : React.PropTypes.bool.isRequired,
    managerIsOpen           : React.PropTypes.bool.isRequired,
    toggleManager           : React.PropTypes.func.isRequired,
    currentAlbum            : React.PropTypes.string.isRequired,
    changeAlbum             : React.PropTypes.func.isRequired,
    changeAppLayout         : React.PropTypes.func.isRequired,
    toggleEditArtworkDialog : React.PropTypes.func.isRequired,
    changeCurrentEditArtwork: React.PropTypes.func.isRequired
};
