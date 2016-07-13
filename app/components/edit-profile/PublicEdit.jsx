import React from 'react';
import Dropzone         from 'react-dropzone';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar         from 'material-ui/Snackbar';

export default class PublicEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarUploaded: false,
            avatarPreview: "",
            avatar: [],
            accordion: {
                display_name: false,
                avatar: false,
                bio: false,
                location: false,
                portfolio: false
            },
            errorType: {},
            errors: [],
            currentError: ""
        }
    }

    render() {
        let avatar;

        if(this.props.userInfo != null &&
            this.props.userInfo != undefined &&
            this.props.userInfo.hasOwnProperty('avatar') &&
            this.props.userInfo.avatar != "") {
                avatar = this.props.userInfo.avatar;
            } else {
                avatar = 'assets/images/default-avatar.png';
            }

        var avatarStyle = {
            backgroundImage: 'url(' + avatar + ')'
        }

        return(
            <div>
                <div className="edit-profile-heading">
                    <div
                        className={this.props.currentEditLayout == "public" ? "edit-profile-public selected" : "edit-profile-public"}
                        onClick={this.props.changeEditLayout.bind({}, "public")}>
                        <h2>Public</h2>
                    </div>
                    <div
                        className={this.props.currentEditLayout == "private" ? "edit-profile-private selected" : "edit-profile-private"}
                        onClick={this.props.changeEditLayout.bind({}, "private")}>
                        <h2>Private</h2>
                    </div>
                </div>
                <div className ="scroll-edit-profile">
                    <article className="edit-accordion">
                        <div
                            className={this.state.accordion.display_name ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"display_name")}>
                            <h2 className="accordion-item-heading">Display Name</h2>
                            <h3 className="accordion-item-preview">{this.props.userInfo.display_name != "" ? this.props.userInfo.display_name : "Unset"}</h3>
                        </div>
                        <div
                            id="display-name-content"
                            className={this.state.accordion.display_name ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-displayname"
                            defaultValue={this.props.userInfo.display_name}
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
                                accept="image/*"
                                onDrop={this.onDrop}>
                                <img
                                    style={{display: (this.props.userInfo.avatar == "" || this.props.userInfo.avatar == undefined || this.props.userInfo.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                                    src="../assets/images/icons/person-beige.svg" />
                                <h3
                                    style={{display: (this.props.userInfo.avatar == "" || this.props.userInfo.avatar == undefined || this.props.userInfo.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                                    className="upload-writing big">
                                    Click to Upload your Photo
                                </h3>
                                <h3
                                    style={{display: (this.props.userInfo.avatar == "" || this.props.userInfo.avatar == undefined || this.props.userInfo.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                                    className="upload-writing small">
                                    or Simply Drag it Here
                                </h3>
                                <img
                                    id="uploaded-avatar"
                                    style={{display: (this.props.userInfo.avatar !== "" && this.props.userInfo.avatar !== undefined && this.props.userInfo.avatar !== null && !this.state.avatarUploaded)  ? "block" : "none" }}
                                    src={this.props.userInfo.avatar} />
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
                            <h3 className="accordion-item-preview">{this.props.userInfo.bio != "" ? this.props.userInfo.bio.substring(0, 44) + "..." : "Unset"}</h3>
                        </div>
                        <div
                            id="bio-content"
                            className={this.state.accordion.bio ? "accordion-content open" : "accordion-content"}>
                            <textarea
                                className="bio"
                                placeholder="Bio"
                                ref="bio"
                                defaultValue={this.props.userInfo.bio}></textarea>
                        </div>
                        <div
                            className={this.state.accordion.location ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"location")}>
                            <h2 className="accordion-item-heading">Location</h2>
                            <h3 className="accordion-item-preview">{this.props.userInfo.location != "" ? this.props.userInfo.location : "Unset"}</h3>
                        </div>
                        <div
                            id="location-content"
                            className={this.state.accordion.location ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-location"
                            ref="location"
                            placeholder="Location"
                            defaultValue={this.props.userInfo.location} />
                        </div>
                        <div
                            className={this.state.accordion.portfolio ? "accordion-item no-border-bottom open" : "accordion-item no-border-bottom"}
                            onClick={this.toggleAccordion.bind({},"portfolio")}>
                            <h2 className="accordion-item-heading">Portfolio</h2>
                            <h3 className="accordion-item-preview">{this.props.userInfo.portfolio != "" ? this.props.userInfo.portfolio : "Unset"}</h3>
                        </div>
                        <div
                            id="portfolio-content"
                            className={this.state.accordion.portfolio ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-portfolio"
                            ref="portfolio"
                            placeholder="Portfolio/Website"
                            defaultValue={this.props.userInfo.portfolio} />
                        </div>
                    </article>
                    <button
                        className="edit-profile-save-button public"
                        type="submit"
                        onClick={this.saveProfileInfo}>
                        <img src="assets/images/icons/save.svg" />
                    </button>
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

    toggleAccordion = (item) => {
        let accordion = this.state.accordion;
        accordion[item] = !accordion[item];

        this.setState({
            accordion: accordion
        });
    }

    saveProfileInfo = (e) => {
        e.preventDefault();
        console.log("entered save profile");

        // Clear errors from any previous form submission
        this.state.errors = [];
        let data = {};

        // Public
        let displayName = this.refs.displayname.value;
        let bio = this.refs.bio.value;
        let location = this.refs.location.value;
        let portfolio = this.refs.portfolio.value;

        // Public Validations
        if(displayName.length > 0) {
            data.display_name = displayName;
        }

        if(this.state.avatarUploaded) {
            data.avatar = this.state.avatar;
        }

        if(bio.length > 0) {
            data.bio = bio;
        }

        if(location.length > 0) {
            data.location = location;
        }

        if(portfolio.length > 0) {
            data.portfolio = portfolio;
        }

        // Rerender the component to show errors
        this.forceUpdate();

        // gather inputs that have been entered

        if(this.state.errors.length == 0) {
            this.props.editUserProfile(data);
            console.log("edited data: ", data);
            console.log("edited profile");

        }
        console.log(this.state.errors);

        for(let i = 0; i < this.state.errors.length; i++) {
            setTimeout(() => {
                this.setState({
                    currentError: this.state.errors[i]
                });
                console.log(this.state.errors[i]);
            }, 3000 * i);
        }
    }

    onDrop = (file) => {
        this.setState({
            avatarUploaded: true,
            avatar: file[0],
            avatarPreview: file[0].preview
        });
    }
}
