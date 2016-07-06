import React from 'react';
import Dropzone from 'react-dropzone';
import confirm from '../confirm-dialog/ConfirmFunction';

export default class EditProfileLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarUploaded: false,
            avatarPreview: "",
            errors: [],
            gender: "",
            avatar: []
        }
    }

    render() {
        return(
            <div className ="scroll-edit-profile">
            <form className="profile-form">
                <Dropzone
                    className="profile-pic-container"
                    accept="image/*"
                    onDrop={this.onDrop}>
                    <img
                        style={{display: (this.props.userInfo.avatar == "" || this.props.userInfo.avatar == undefined || this.props.userInfo.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                        src="../assets/images/icons/person-beige.svg" />
                    <h3
                        style={{display: (this.props.userInfo.avatar == "" || this.props.userInfo.avatar == undefined || this.props.userInfo.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                        className="upload-writing big">
                        Upload your Photo
                    </h3>
                    <h3
                        style={{display: (this.props.userInfo.avatar == "" || this.props.userInfo.avatar == undefined || this.props.userInfo.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                        className="upload-writing small">
                        or Simply Drage Here
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
                <section className="left-info">
                    <div className="edit-heading">
                        <img src="assets/images/art-illus.svg" />
                        <h3 className="artist-edit">ARTIST</h3>
                    </div>
                    <fieldset>
                        <ul>
                            <li>
                                <input
                                    type="text"
                                    id="register-displayname"
                                    defaultValue={this.props.userInfo.display_name}
                                    ref="displayname"
                                    placeholder="Display Name"
                                    required=""
                                    maxLength="50"
                                    autoCapitalize="off"
                                    autoComplete="off"
                                    autoCorrect="off" />
                            </li>
                            <li>
                                <input
                                    type="email"
                                    id="register-email"
                                    defaultValue={this.props.userInfo.email}
                                    ref="email"
                                    placeholder="Email"
                                    required="true"
                                    maxLength="100" />
                            </li>
                            <li>
                                <input
                                    type="password"
                                    id="register-password"
                                    ref="password"
                                    placeholder="Password"
                                    required="true"
                                    maxLength="100"
                                    autoComplete="off" />
                            </li>
                            <li>
                                <input
                                    type="password"
                                    id="register-confirm-password"
                                    ref="confirmPassword"
                                    placeholder="Confirm Password"
                                    required="true"
                                    maxLength="100" />
                            </li>
                            <li id="li-dob" className="controls-dob">
                                <label for="register-age">Date of Birth: </label>
                                <div id="register-dob" className="register-dob">
                                    <div className="controls controls-month">
                                        <select
                                            id="register-dob-month"
                                            className="dob"
                                            defaultValue={this.props.userInfo.dob != "" ? this.props.userInfo.dob.split("-")[1] : null}
                                            ref="dobMonth">
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
                                            id="register-dob-day"
                                            defaultValue={this.props.userInfo.dob != "" ? this.props.userInfo.dob.split("-")[0] : null}
                                            className="dob"
                                            ref="dobDay"
                                            placeholder="Day"
                                            pattern="[0-9]*"
                                            maxLength="2"
                                            min="1"
                                            max="31" />
                                    </div>
                                    <div className="controls controls-year">
                                        <input
                                            type="number"
                                            id="register-dob-year"
                                            defaultValue={this.props.userInfo.dob != "" ? this.props.userInfo.dob.split("-")[2] : null}
                                            className="dob"
                                            ref="dobYear"
                                            placeholder="Year"
                                            pattern="[0-9]*"
                                            maxLength="4" />
                                    </div>
                                </div>
                            </li>
                            <li id="li-legal-age" className="legal-age">
                                <label className="age-confirm-label">
                                    <input
                                        type="checkbox"
                                        id="legal-age-checkbox"
                                        ref="legalAge"
                                        defaultChecked={this.props.userInfo.legal_age}/>
                                        I confirm that I am 18+
                                </label>
                            </li>
                            <li id="li-gender" className="gender">
                                <label className="gender-label">Gender:</label>
                                  <label
                                      for="register-male"
                                      className="gender-radio control-inline">
                                      <input
                                          type="radio"
                                          id="register-male"
                                          name="gender"
                                          className="reg-radio"
                                          defaultValue="male"
                                          defaultChecked={this.props.userInfo.gender == "male"}
                                          onChange={this.setGender}
                                          required="" />
                                           Male
                                </label>

                                  <label
                                      for="register-female"
                                      className="gender-radio female control-inline">
                                      <input
                                          type="radio"
                                          id="register-female"
                                          name="gender"
                                          className="reg-radio"
                                          defaultValue="female"
                                          defaultChecked={this.props.userInfo.gender == "female"}
                                          onChange={this.setGender}
                                          required="" />
                                           Female
                                </label>
                            </li>
                        </ul>
                    </fieldset>
                </section>
                <section className="right-info">
                    <fieldset>
                        <ul>
                            <li>
                                <textarea
                                    className="bio"
                                    placeholder="Bio"
                                    ref="bio"
                                    defaultValue={this.props.userInfo.bio}/>
                            </li>
                            <li>
                                <input
                                    type="text"
                                    id="register-location"
                                    ref="location"
                                    placeholder="Location"
                                    defaultValue={this.props.userInfo.location} />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    id="register-portfolio"
                                    ref="portfolio"
                                    placeholder="Portfolio/Website"
                                    defaultValue={this.props.userInfo.portfolio} />
                            </li>
                            <button
                                className="edit-button"
                                type="submit"
                                onClick={this.saveProfileInfo}>
                                <h3>Update</h3>
                            </button>
                        </ul>
                    </fieldset>
                </section>
            </form>
            {this.state.errors.map(error => {
                    return (
                        <div
                            className="edit-user-error">
                            <h3>{error}</h3>
                        </div>
                    );
                })}
            </div>
        );
    }

    saveProfileInfo = (e) => {
        e.preventDefault();
        console.log("entered save profile");

        // Clear errors from any previous form submission
        this.state.errors = [];
        let data = {};
        let displayName = this.refs.displayname.value;
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;

        let day = this.refs.dobDay.value;
        let month = this.refs.dobMonth.value;
        let year = this.refs.dobYear.value;

        let gender = this.state.gender;
        let bio = this.refs.bio.value;
        let location = this.refs.location.value;
        let portfolio = this.refs.portfolio.value;


        if(displayName.length > 0) {
            data.display_name = displayName;
        }

        // Only test regex if user has typed in an email
        if(email.length > 0 && !/.+@.+\..+/.test(email)) {
            this.state.errors.push("The email address you supplied is invalid.");
        } else if(email.length > 0) {
            data.email = email;
        }

        // Only test password length if typed in
        if(password.length > 0 && password.length < 6) {
            this.state.errors.push("Your password is too short.");
        }

        // Only test confirm password length if password typed in
        if(password.length > 0 && confirmPassword.length == 0) {
            this.state.errors.push("Please confirm your password.");
        }

        // Only test passwords equal if typed in
        if(password.length > 0
            && confirmPassword.length > 0
            && password != confirmPassword) {
            this.state.errors.push("Passwords do not match.");
        } else if (password.length >= 6
                    && confirmPassword.length >= 6
                    && password == confirmPassword) {
                        data.password = password;
                    }

        if(day.length > 0 &&
            month.length > 0 &&
            year.length > 0) {
            data.dob = day + "-" + month + "-" + year;
        } else {
            data.dob = "";
        }

        if(gender.length > 0) {
            data.gender =  gender;
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
            console.log("edited profile");
        }
        console.log(this.state.errors);
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
