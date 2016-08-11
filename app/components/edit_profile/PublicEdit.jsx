// Libs
import React            from 'react';
import Dropzone         from 'react-dropzone';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar         from 'material-ui/Snackbar';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';


export default class PublicEdit extends React.Component {
    state = {
        avatarUploaded  : false,
        avatarPreview   : "",
        avatar          : [],
        accordion       : {
            display_name: false,
            avatar      : false,
            bio         : false,
            location    : false,
            portfolio   : false,
            social_media: false
        },
        allAccordion    : false,
        errorType       : {},
        errors          : [],
        currentError    : ""
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //Pass
    }

    render() {
        let avatar;

        if (this.props.user &&
            this.props.user.hasOwnProperty('avatar') &&
            this.props.user.avatar != "") {
                avatar = this.props.thumbnail(this.props.user.avatar, 250);
            } else {
                avatar = 'assets/images/default-avatar.png';
            }

        let avatarStyle = {
            backgroundImage: 'url(' + avatar + ')'
        }

        let showSocialIconPreview = {
            facebook : false,
            twitter : false,
            instagram : false,
            pinterest : false,
            behance : false
        };

        let socialSet = false;

        for (let social_media in this.props.user.social_media) {
            if (this.props.user.social_media[social_media].length > 0) {
                showSocialIconPreview[social_media] = true;
                socialSet = true;
            }
        }

        let facebookStyle = {
            backgroundImage: 'url(assets/images/icons/social-icons/facebook-gray.svg)'
        }

        let instagramStyle = {
            backgroundImage: 'url(assets/images/icons/social-icons/instagram-gray.svg)'
        }

        let twitterStyle = {
            backgroundImage: 'url(assets/images/icons/social-icons/twitter-gray.svg)'
        }

        let pinterestStyle = {
            backgroundImage: 'url(assets/images/icons/social-icons/pinterest-gray.svg)'
        }

        let behanceStyle = {
            backgroundImage: 'url(assets/images/icons/social-icons/behance-gray.svg)'
        }

        const saveTooltip = (
            <Tooltip
                id="delete-tooltip-regular"
                className="tooltip">
                Save Public Information
            </Tooltip>
        );

        const accordionTooltip = (
            <Tooltip
                id="delete-tooltip-regular"
                className="tooltip">
                Open All Public Fields
            </Tooltip>
        );

        return(
            <div>
                <div className="edit-profile-heading">
                    <div
                        className={this.props.editingPublic ? "edit-profile-public selected" : "edit-profile-public"}
                        onClick={this.props.editPublic}>
                        <h2>Public</h2>
                    </div>
                    <div
                        className={!this.props.editingPublic ? "edit-profile-private selected" : "edit-profile-private"}
                        onClick={this.props.editPrivate}>
                        <h2>Private</h2>
                    </div>
                </div>
                <div className ="scroll-edit-profile">
                    <article className="edit-accordion">
                        <div
                            className={this.state.accordion.display_name ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"display_name")}>
                            <h2 className="accordion-item-heading">Display Name</h2>
                            <h3 className="accordion-item-preview">{this.props.user.display_name != "" ? this.props.user.display_name : "Unset"}</h3>
                        </div>
                        <div
                            id="display-name-content"
                            className={this.state.accordion.display_name ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-displayname"
                            defaultValue={this.props.user.display_name}
                            onChange={this.setUnsaved}
                            ref="displayname"
                            placeholder="Display Name"
                            required=""
                            maxLength="50"
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off" />
                        </div>
                        <div
                            className={this.state.accordion.avatar ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"avatar")}>
                            <h2 className="accordion-item-heading">Avatar</h2>
                            <div className="accordion-item-avatar-wrapper">
                                <div
                                className="accordion-item-avatar"
                                style={avatarStyle}></div>
                            </div>
                        </div>
                        <div
                            id="avatar-content"
                            className={this.state.accordion.avatar ? "accordion-content open" : "accordion-content"}>
                            <Dropzone
                                style={{display: this.state.accordion.avatar ? "flex" : "none" }}
                                className="edit-profile-avatar-wrapper"
                                accept="image/png, image/jpeg"
                                onDrop={this.onDrop}>
                                <img
                                    className="edit-avatar-no-avatar-icon"
                                    style={{display: (this.props.user.avatar == "" || this.props.user.avatar == undefined || this.props.user.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                                    src="../assets/images/icons/person-beige.svg" />
                                <img
                                    id="uploaded-avatar"
                                    style={{display: (this.props.user.avatar !== "" && this.props.user.avatar !== undefined && this.props.user.avatar !== null && !this.state.avatarUploaded)  ? "block" : "none" }}
                                    src={this.props.user.avatar} />
                                <img
                                    id="uploaded-avatar"
                                    style={{display: this.state.avatarUploaded ? "block" : "none" }}
                                    src={this.state.avatarPreview} />
                            </Dropzone>
                        </div>
                        <div
                            className={this.state.accordion.bio ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"bio")}>
                            <h2 className="accordion-item-heading">Bio</h2>
                            <h3 className="accordion-item-preview">{this.props.user.bio ? this.props.user.bio.substring(0, 44).length > this.props.user.bio ?  this.props.user.bio.substring(0, 44) + "..." : this.props.user.bio.substring(0, 44) : "Unset"}</h3>
                        </div>
                        <div
                            id="bio-content"
                            className={this.state.accordion.bio ? "accordion-content open" : "accordion-content"}>
                            <textarea
                                className="bio"
                                placeholder="Bio"
                                ref="bio"
                                defaultValue={this.props.user.bio}
                                maxLength="1500"
                                onChange={this.setUnsaved}></textarea>
                        </div>
                        <div
                            className={this.state.accordion.location ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"location")}>
                            <h2 className="accordion-item-heading">Location</h2>
                            <h3 className="accordion-item-preview">{this.props.user.location != "" ? this.props.user.location : "Unset"}</h3>
                        </div>
                        <div
                            id="location-content"
                            className={this.state.accordion.location ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-location"
                            ref="location"
                            placeholder="Location"
                            defaultValue={this.props.user.location}
                            maxLength="50"
                            onChange={this.setUnsaved} />
                        </div>
                        <div
                            className={this.state.accordion.portfolio ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"portfolio")}>
                            <h2 className="accordion-item-heading">Portfolio</h2>
                            <h3 className="accordion-item-preview">{this.props.user.portfolio != "" ? this.props.user.portfolio : "Unset"}</h3>
                        </div>
                        <div
                            id="portfolio-content"
                            className={this.state.accordion.portfolio ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-portfolio"
                            ref="portfolio"
                            placeholder="Portfolio/Website"
                            defaultValue={this.props.user.portfolio}
                            maxLength="200"
                            onChange={this.setUnsaved} />
                        </div>
                        <div
                            className={this.state.accordion.social_media ? "accordion-item open no-border-bottom" : "accordion-item no-border-bottom"}
                            onClick={this.toggleAccordion.bind({},"social_media")}>
                            <h2 className="accordion-item-heading">Social Media</h2>
                            {socialSet ?
                                <div className="accordion-item-social-icon-wrapper">
                                    { showSocialIconPreview["facebook"] ?
                                        <div
                                        className="accordion-item-social-icon"
                                        style={facebookStyle}></div> : null
                                    }

                                    { showSocialIconPreview["instagram"] ?
                                        <div
                                        className="accordion-item-social-icon"
                                        style={instagramStyle}></div> : null
                                    }

                                    { showSocialIconPreview["twitter"] ?
                                        <div
                                        className="accordion-item-social-icon"
                                        style={twitterStyle}></div> : null
                                    }

                                    { showSocialIconPreview["pinterest"] ?
                                        <div
                                        className="accordion-item-social-icon"
                                        style={pinterestStyle}></div> : null
                                    }

                                    { showSocialIconPreview["behance"] ?
                                        <div
                                        className="accordion-item-social-icon"
                                        style={behanceStyle}></div> : null
                                    }
                                </div>
                                :
                                <h3 className="accordion-item-preview">Unset</h3>
                                }
                        </div>
                        <div
                            id="social-media-content"
                            className={this.state.accordion.social_media ? "accordion-content open" : "accordion-content"}>
                            <ul>
                                <li>
                                    <div className="edit-social-icon facebook">
                                        <img src="assets/images/icons/social-icons/facebook-black.svg" />
                                    </div>
                                    <p className="edit-social-url">
                                        facebook.com/
                                    </p>
                                    <input
                                    type="text"
                                    id="edit-facebook"
                                    className="edit-social-input"
                                    ref="facebook"
                                    placeholder="tekuma.world"
                                    defaultValue={this.props.user.social_media.facebook}
                                    maxLength="50"
                                    onChange={this.setUnsaved} />
                                </li>
                                <li>
                                    <div className="edit-social-icon instagram">
                                        <img src="assets/images/icons/social-icons/instagram-black.svg" />
                                    </div>
                                    <p className="edit-social-url">
                                        instagram.com/
                                    </p>
                                    <input
                                    type="text"
                                    id="edit-instagram"
                                    className="edit-social-input"
                                    ref="instagram"
                                    placeholder="tekuma.io"
                                    defaultValue={this.props.user.social_media.instagram}
                                    maxLength="50"
                                    onChange={this.setUnsaved} />
                                </li>
                                <li>
                                    <div className="edit-social-icon twitter">
                                        <img src="assets/images/icons/social-icons/twitter-black.svg" />
                                    </div>
                                    <p className="edit-social-url">
                                        twitter.com/
                                    </p>
                                    <input
                                    type="text"
                                    id="edit-twitter"
                                    className="edit-social-input"
                                    ref="twitter"
                                    placeholder="tekuma_"
                                    defaultValue={this.props.user.social_media.twitter}
                                    maxLength="50"
                                    onChange={this.setUnsaved} />
                                </li>
                                <li>
                                    <div className="edit-social-icon pinterest">
                                        <img src="assets/images/icons/social-icons/pinterest-black.svg" />
                                    </div>
                                    <p className="edit-social-url">
                                        pinterest.com/
                                    </p>
                                    <input
                                    type="text"
                                    id="edit-pinterest"
                                    className="edit-social-input"
                                    ref="pinterest"
                                    placeholder="Tekumaio"
                                    defaultValue={this.props.user.social_media.pinterest}
                                    maxLength="50"
                                    onChange={this.setUnsaved} />
                                </li>
                                <li>
                                    <div className="edit-social-icon behance">
                                        <img src="assets/images/icons/social-icons/behance-black.svg" />
                                    </div>
                                    <p className="edit-social-url">
                                        behance.net/
                                    </p>
                                    <input
                                    type="text"
                                    id="edit-behance"
                                    className="edit-social-input"
                                    ref="behance"
                                    placeholder="tekuma.io"
                                    defaultValue={this.props.user.social_media.behance}
                                    maxLength="50"
                                    onChange={this.setUnsaved} />
                                </li>
                            </ul>
                        </div>
                    </article>
                    <OverlayTrigger
                        placement="right"
                        overlay={saveTooltip}>
                        <button
                            className="edit-profile-save-button"
                            type="submit"
                            onClick={this.saveProfileInfo}>
                            <img src="assets/images/icons/save.svg" />
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="left"
                        overlay={accordionTooltip}>
                        <button
                            className="edit-profile-open-accordion-button"
                            type="submit"
                            onClick={this.toggleAllAccordion}>
                            <svg
                                version="1.1"
                                id="open-accordion"
                                x="0px"
                                y="0px"
                                width="25px"
                                height="25px"
                                viewBox="12.5 12.5 25 25"
                                enableBackground="new 12.5 12.5 25 25">
                               <polygon
                                   id="up-arrow"
                                   fill="#FFFFFF"
                                   points="12.489,21.449 21.063,12.886 21.063,12.886 23.703,12.886 23.703,12.886 23.703,37.114 21.063,37.114 21.063,29.147 21.063,16.408 12.489,24.982 	"/>
                              <polygon
                                  id="down-arrow"
                                  fill="#FFFFFF"
                                  points="37.511,28.551 28.937,37.114 28.937,37.114 26.297,37.114 26.297,37.114 26.297,12.886 28.937,12.886 28.937,20.853 28.937,33.592 37.511,25.018 	"/>
                            </svg>
                        </button>
                    </OverlayTrigger>
                </div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="registration-error"
                        open={this.state.errors.length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000} />
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        //pass
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

    // -------- METHODS ------------

    /**
     * TODO
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    toggleAccordion = (item) => {
        let accordion   = this.state.accordion;
        accordion[item] = !accordion[item];
        this.setState({
            accordion: accordion
        });
    }

    toggleAllAccordion = () => {
        let allAccordion = this.state.allAccordion;

        let accordion   = {
            display_name: !allAccordion,
            avatar      : !allAccordion,
            bio         : !allAccordion,
            location    : !allAccordion,
            portfolio   : !allAccordion,
            social_media: !allAccordion
        };

        this.setState({
            accordion: accordion,
            allAccordion: !allAccordion
        });
    }

    setUnsaved = () => {
        this.props.setUnsaved();
    }

    /**
     * TODO
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    saveProfileInfo = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
        let data = {
            social_media: {
                facebook: "",
                instagram: "",
                twitter: "",
                pinterest: "",
                behance: ""
            }
        };

        // Public
        let bio          = this.refs.bio.value;
        let location     = this.refs.location.value;
        let portfolio    = this.refs.portfolio.value;
        let displayName  = this.refs.displayname.value;
        let facebook     = this.refs.facebook.value;
        let instagram    = this.refs.instagram.value;
        let twitter      = this.refs.twitter.value;
        let pinterest    = this.refs.pinterest.value;
        let behance      = this.refs.behance.value;


        // ====== Public Validations ======

        // Display Name
        if (displayName.length > 0) {
            data.display_name = displayName;
        }

        // Avatar
        if (this.state.avatarUploaded) {
            data.avatar = this.state.avatar;
        }

        // Bio
        if (bio.length > 0) {
            data.bio = bio;
        }

        // Location
        if (location.length > 0) {
            data.location = location;
        }

        // Portfolio
        if (portfolio.length > 0) {
            data.portfolio = portfolio;
        }

        // Social Media
        if (facebook.length > 0) {
            data.social_media.facebook = facebook;
        }

        if (instagram.length > 0) {
            data.social_media.instagram = instagram;
        }

        if (twitter.length > 0) {
            data.social_media.twitter = twitter;
        }

        if (pinterest.length > 0) {
            data.social_media.pinterest = pinterest;
        }

        if (behance.length > 0) {
            data.social_media.behance = behance;
        }

        // Rerender the component to show errors
        this.forceUpdate();

        // gather inputs that have been entered
        if (this.state.errors.length == 0) {
            this.props.editPublicUserInfo(data);

            this.setState({
                accordion: {
                    display_name: false,
                    avatar: false,
                    bio: false,
                    location: false,
                    portfolio: false,
                    social_media: false
                }
            });

            this.props.setSaved(); // Used to track whether user has save info to show confirm dialog or not
        }

        for(let i = 0; i < this.state.errors.length; i++) {
            setTimeout(() => {
                this.setState({
                    currentError: this.state.errors[i]
                });
                console.log(this.state.errors[i]);
            }, 3000 * i);
        }
    }

    /**
     * TODO
     * @param  {[type]} file [description]
     * @return {[type]}      [description]
     */
    onDrop = (file) => {
        this.setState({
            avatarUploaded: true,
            avatar: file[0],
            avatarPreview: file[0].preview
        });

        this.props.setUnsaved();
    }
}
