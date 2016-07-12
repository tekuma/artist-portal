import React from 'react';
import Dropzone from 'react-dropzone';
import confirm from '../confirm-dialog/ConfirmFunction';
import Snackbar from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class EditProfileLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarUploaded: false,
            avatarPreview: "",
            errorType: {},
            errors: [],
            currentError: "",
            gender: "",
            avatar: [],
            currentEditLayout: "public"
        }
    }

    render() {
        if(this.state.currentEditLayout == "public") {
            return this.publicInfo();
        } else {
            return this.privateInfo();
        }
    }

    // VIEWS ===============

    publicInfo = () => {
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
                        className={this.state.currentEditLayout == "public" ? "edit-profile-public selected" : "edit-profile-public"}
                        onClick={this.changeEditLayout.bind({}, "public")}>
                        <h2>Public</h2>
                    </div>
                    <div
                        className={this.state.currentEditLayout == "private" ? "edit-profile-private selected" : "edit-profile-private"}
                        onClick={this.changeEditLayout.bind({}, "private")}>
                        <h2>Private</h2>
                    </div>
                </div>
                <div className ="scroll-edit-profile">
                    <article className="public-edit">
                        <ul className="accordion">
                            <li>
                                <input id="ac-1" type="checkbox" />
                                <label htmlFor="ac-1">
                                    <h2 className="accordion-item-heading">Display Name</h2>
                                    <h3 className="accordion-item-preview">{this.props.userInfo.display_name}</h3>
                                </label>
                                <div id="display-name-content" className="ac-content">
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
                            </li>
                            <li>
                                <input id="ac-2" type="checkbox" />
                                <label htmlFor="ac-2">
                                    <h2 className="accordion-item-heading">Avatar</h2>
                                    <div className="accordion-item-avatar-wrapper">
                                        <div
                                        className="accordion-item-avatar"
                                        style={avatarStyle}></div>
                                    </div>
                                </label>
                                <div id="avatar-content" className="ac-content">
                                    <Dropzone
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
                            </li>
                            <li>
                                <input id="ac-3" type="checkbox" />
                                <label htmlFor="ac-3">
                                    <h2 className="accordion-item-heading">Bio</h2>
                                    <h3 className="accordion-item-preview">{this.props.userInfo.bio.substring(0, 44) + "..."}</h3>
                                </label>
                                <div id="bio-content" className="ac-content">
                                    <textarea
                                        className="bio"
                                        placeholder="Bio"
                                        ref="bio"
                                        defaultValue={this.props.userInfo.bio}></textarea>
                                </div>
                            </li>
                            <li>
                                <input id="ac-4" type="checkbox" />
                                <label htmlFor="ac-4">
                                    <h2 className="accordion-item-heading">Location</h2>
                                    <h3 className="accordion-item-preview">Boston, MA</h3>
                                </label>
                                <div id="location-content" className="ac-content">
                                    <input
                                    type="text"
                                    id="edit-location"
                                    ref="location"
                                    placeholder="Location"
                                    defaultValue={this.props.userInfo.location} />
                                </div>
                            </li>
                            <li>
                                <input id="ac-5" type="checkbox" />
                                <label htmlFor="ac-5">
                                    <h2 className="accordion-item-heading">Portfolio</h2>
                                    <h3 className="accordion-item-preview">http://afikanyati.com</h3>
                                </label>
                                <div id="portfolio-content" className="ac-content">
                                    <input
                                    type="text"
                                    id="edit-portfolio"
                                    ref="portfolio"
                                    placeholder="Portfolio/Website"
                                    defaultValue={this.props.userInfo.portfolio} />
                                </div>
                            </li>
                        </ul>
                    </article>
                    <button
                        className="edit-profile-save-button"
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

    privateInfo = () => {
        let passwordAuth = {
            display: 'block'
        };

        let errorStylePasswordAuth = {
            border: '1px solid #ec167c',
            display: 'block'
        };

        let errorStyle = {
            border: '1px solid #ec167c'
        };

        let hideStyle = {
            display: 'none'
        };

        return(
            <div>
                <div className="edit-profile-heading">
                    <div
                        className={this.state.currentEditLayout == "public" ? "edit-profile-public selected" : "edit-profile-public"}
                        onClick={this.changeEditLayout.bind({}, "public")}>
                        <h2>Public</h2>
                    </div>
                    <div
                        className={this.state.currentEditLayout == "private" ? "edit-profile-private selected" : "edit-profile-private"}
                        onClick={this.changeEditLayout.bind({}, "private")}>
                        <h2>Private</h2>
                    </div>
                </div>
                <div className ="scroll-edit-profile">
                    <article className="private-edit">
                        <ul className="accordion">
                            <li>
                                <input id="ac-1" type="checkbox" />
                                <label htmlFor="ac-1">
                                    <h2 className="accordion-item-heading">Legal Name</h2>
                                    <h3 className="accordion-item-preview">{this.props.userInfo.legal_name}</h3>
                                </label>
                                <div id="legal-name-content" className="ac-content">
                                    <input
                                        type="text"
                                        id="edit-legalname"
                                        defaultValue={this.props.userInfo.legal_name}
                                        ref="legalname"
                                        style={this.state.errorType.legalName ? errorStyle : null}
                                        placeholder="Legal Name (required)"
                                        required="true"
                                        maxLength="50"
                                        autoCapitalize="off"
                                        autoComplete="off"
                                        autoCorrect="off" />
                                </div>
                            </li>
                            <li style={this.props.userInfo.auth_provider == "password" ? (this.state.errorType.email ? errorStylePasswordAuth : passwordAuth) : (this.state.errorType.email ? errorStyle : hideStyle)}>
                                <input id="ac-4" type="checkbox" />
                                <label htmlFor="ac-4">
                                    <h2 className="accordion-item-heading">Email</h2>
                                    <h3 className="accordion-item-preview">this.props.userInfo.email</h3>
                                </label>
                                <div id="email-content" className="ac-content">
                                    <input
                                        type="email"
                                        id="edit-email"
                                        defaultValue={this.props.userInfo.email}
                                        ref="email"
                                        placeholder="Email"
                                        required="true"
                                        maxLength="100" />
                                        <input
                                            type="password"
                                            id="edit-password"
                                            ref="emailPassword"
                                            placeholder="Current Password"
                                            required="true"
                                            maxLength="100"
                                            autoComplete="off" />
                                </div>
                            </li>
                            <li style={this.props.userInfo.auth_provider == "password" ? (this.state.errorType.email ? errorStylePasswordAuth : passwordAuth) : (this.state.errorType.email ? errorStyle : hideStyle)}>
                                <input id="ac-5" type="checkbox" />
                                <label htmlFor="ac-5">
                                    <h2 className="accordion-item-heading">Password</h2>
                                    <h3 className="accordion-item-preview">&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</h3>
                                </label>
                                <div id="password-content" className="ac-content">
                                    <input
                                        type="password"
                                        id="edit-password"
                                        ref="currentPassword"
                                        placeholder="Current Password"
                                        required="true"
                                        maxLength="100"
                                        autoComplete="off" />
                                    <input
                                        type="password"
                                        id="edit-password"
                                        ref="password"
                                        placeholder="New Password"
                                        required="true"
                                        maxLength="100"
                                        autoComplete="off" />
                                    <input
                                        type="password"
                                        id="edit-confirm-password"
                                        ref="confirmPassword"
                                        placeholder="Confirm Password"
                                        required="true"
                                        maxLength="100" />
                                </div>
                            </li>
                            <li>
                                <input id="ac-2" type="checkbox" />
                                <label htmlFor="ac-2">
                                    <h2 className="accordion-item-heading">Age</h2>
                                    <div className="accordion-item-avatar-wrapper">
                                        <h3 className="accordion-item-preview">{this.props.userInfo.dob}</h3>
                                    </div>
                                </label>
                                <div id="age-content" className="ac-content">
                                    <label for="edit-age">Date of Birth: </label>
                                    <div id="accordion-dob" className="accordion-dob">
                                        <div className="controls controls-month">
                                            <select
                                                id="accordion-dob-month"
                                                className="dob"
                                                defaultValue={this.props.userInfo.dob != "" ? this.props.userInfo.dob.split("-")[1] : null}
                                                ref="dobMonth"
                                                style={this.state.errorType.month? errorStyle : null}>
                                                <option value="" disabled="">Month</option>
                                                <option value="01">January</option>
                                                <option value="02">February</option>
                                                <option value="03">March</option>
                                                <option value="04">April</option>
                                                <option value="05">May</option>
                                                <option value="06">June</option>
                                                <option value="07">July</option>
                                                <option value="08">August</option>
                                                <option value="09">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </select>
                                        </div>
                                        <div className="controls controls-day">
                                            <input
                                                type="number"
                                                id="accordion-dob-day"
                                                defaultValue={this.props.userInfo.dob != "" ? this.props.userInfo.dob.split("-")[0] : null}
                                                className="dob"
                                                ref="dobDay"
                                                style={this.state.errorType.day ? errorStyle : null}
                                                placeholder="Day"
                                                pattern="[0-9]*"
                                                maxLength="2"
                                                min="1"
                                                max="31" />
                                        </div>
                                        <div className="controls controls-year">
                                            <input
                                                type="number"
                                                id="accordion-dob-year"
                                                defaultValue={this.props.userInfo.dob != "" ? this.props.userInfo.dob.split("-")[2] : null}
                                                className="dob"
                                                ref="dobYear"
                                                style={this.state.errorType.year ? errorStyle : null}
                                                placeholder="Year"
                                                pattern="[0-9]*"
                                                maxLength="4" />
                                        </div>
                                    </div>
                                    <label className="age-confirm-label">
                                        <input
                                            type="checkbox"
                                            id="over-eighteen-checkbox"
                                            ref="overEighteen"
                                            defaultChecked={this.props.userInfo.over_eighteen} />
                                            I confirm that I am 18+
                                    </label>
                                </div>
                            </li>
                            <li>
                                <input id="ac-3" type="checkbox" />
                                <label htmlFor="ac-3">
                                    <h2 className="accordion-item-heading">Preferred Gender Pronoun</h2>
                                    <h3 className="accordion-item-preview">He</h3>
                                </label>
                                <div id="pronoun-content" className="ac-content">
                                    <label
                                        for="edit-she"
                                        className="gender-radio control-inline">
                                        <input
                                            type="radio"
                                            id="edit-she"
                                            name="gender"
                                            className="reg-radio"
                                            defaultValue="she"
                                            defaultChecked={this.props.userInfo.gender_pronoun == "she"}
                                            onChange={this.setGender}
                                            required="" />
                                        She
                                  </label>
                                  <label
                                      for="edit-he"
                                      className="gender-radio control-inline">
                                      <input
                                          type="radio"
                                          id="edit-he"
                                          name="gender"
                                          className="reg-radio"
                                          defaultValue="he"
                                          defaultChecked={this.props.userInfo.gender_pronoun == "he"}
                                          onChange={this.setGender}
                                          required="" />
                                      He
                                </label>
                                <label
                                    for="edit-they"
                                    className="gender-radio control-inline">
                                        <input
                                            type="radio"
                                            id="edit-they"
                                            name="gender"
                                            className="reg-radio"
                                            defaultValue="they"
                                            defaultChecked={this.props.userInfo.gender_pronoun == "they"}
                                            onChange={this.setGender}
                                            required="" />
                                        They
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </article>
                    <button
                        className="edit-profile-save-button"
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


    // METHODS ======================

    changeEditLayout = (layout) => {
        this.setState({
            currentEditLayout: layout
        });
    }

    saveProfileInfo = (e) => {
        e.preventDefault();
        console.log("entered save profile");

        // Clear errors from any previous form submission
        this.state.errors = [];
        let data = {};
        let displayName = this.refs.displayname.value;
        let legalName = this.refs.legalname.value;
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;

        let day = this.refs.dobDay.value;
        let month = this.refs.dobMonth.value;
        let year = this.refs.dobYear.value;

        let overEighteen = this.refs.overEighteen.checked;
        let gender = this.state.gender;
        let bio = this.refs.bio.value;
        let location = this.refs.location.value;
        let portfolio = this.refs.portfolio.value;

        data.over_eighteen = overEighteen;

        if(displayName.length > 0) {
            data.display_name = displayName;
        }

        if(legalName.length == 0) {
            this.state.errors.push("To make use of Tekuma's services, we require your legal name.");

            let errorType = this.state.errorType;
            errorType.legalName = true;
            this.setState({
                errorType: errorType
            });
        } else {
            data.legal_name = legalName;
        }

        // Only test regex if user has typed in an email
        if(email.length > 0 && !/.+@.+\..+/.test(email)) {
            this.state.errors.push("The email address you supplied is invalid.");

            let errorType = this.state.errorType;
            errorType.email = true;
            this.setState({
                errorType: errorType
            });
        } else if(email.length > 0) {
            data.email = email;
        }

        // Only test password length if typed in
        if(password.length > 0 && password.length < 6) {
            this.state.errors.push("Your password must be at least 6 characters long.");

            let errorType = this.state.errorType;
            errorType.password = true;
            this.setState({
                errorType: errorType
            });
        }

        // Only test confirm password length if password typed in
        if(password.length > 0 && confirmPassword.length == 0) {
            this.state.errors.push("Please confirm your password.");

            let errorType = this.state.errorType;
            errorType.confirmPassword = true;
            this.setState({
                errorType: errorType
            });
        }

        // Only test passwords equal if typed in
        if(password.length > 0
            && confirmPassword.length > 0
            && password != confirmPassword) {
            this.state.errors.push("Passwords do not match.");

            let errorType = this.state.errorType;
            errorType.password = true;
            errorType.confirmPassword = true;
            this.setState({
                errorType: errorType
            });
        } else if (password.length >= 6
                    && confirmPassword.length >= 6
                    && password == confirmPassword) {
                        data.password = password;
                    }

        if(day.length > 0 && day.length > 2) {
            this.state.errors.push("Please enter a valid day of the month.");

            let errorType = this.state.errorType;
            errorType.day = true;
            this.setState({
                errorType: errorType
            });
        }

        if(month.length > 0 && month.length > 2) {
            this.state.errors.push("Please enter a valid month.");

            let errorType = this.state.errorType;
            errorType.month = true;
            this.setState({
                errorType: errorType
            });
        }

        if(year.length > 0 && year.length > 4 || eval(year) > new Date().getFullYear()) {
            this.state.errors.push("Please enter a valid year.");

            let errorType = this.state.errorType;
            errorType.year = true;
            this.setState({
                errorType: errorType
            });
        }

        if((day.length == 1 || day.length == 2) &&
            (month.length == 1 || month.length == 2) &&
            year.length == 4) {
            data.dob = day + "-" + month + "-" + year;
        } else {

        }

        if(gender.length > 0) {
            data.gender_pronoun =  gender;
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

        if(this.state.avatarUploaded) {
            data.avatar = this.state.avatar;
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

    setGender = (e) => {
        this.setState({
            gender: e.target.value
        });
        console.log(e.target.value);
    }
}
