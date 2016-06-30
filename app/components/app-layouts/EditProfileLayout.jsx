import React from 'react';
import Dropzone from 'react-dropzone';

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
            <div>
            <form className="profile-form">
                <Dropzone
                    className="profile-pic-container"
                    accept="image/*"
                    onDrop={this.onDrop}>
                    <img
                        style={{display: this.state.avatarUploaded  ? "none" : "block" }}
                        src="../assets/images/icons/person-beige.svg" />
                    <h3
                        style={{display: this.state.avatarUploaded  ? "none" : "block" }}
                        className="upload-writing big">
                        Upload your Photo
                    </h3>
                    <h3
                        style={{display: this.state.avatarUploaded  ? "none" : "block" }}
                        className="upload-writing small">
                        or Simply Drage Here
                    </h3>
                    <img
                        id="uploaded-avatar"
                        style={{display: this.state.avatarUploaded  ? "block" : "none" }}
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
                                    id="register-fullname"
                                    defaultValue={this.props.userInfo.display_name}
                                    ref="fullname"
                                    placeholder="Full Name"
                                    required=""
                                    maxlength="50"
                                    autocapitalize="off"
                                    autocomplete="off"
                                    autocorrect="off" />
                            </li>
                            <li>
                                <input
                                    type="email"
                                    id="register-email"
                                    defaultValue={this.props.userInfo.email}
                                    ref="email"
                                    placeholder="Email"
                                    required="true"
                                    maxlength="100" />
                            </li>
                            <li>
                                <input
                                    type="password"
                                    id="register-password"
                                    ref="password"
                                    placeholder="Password"
                                    required="true"
                                    maxlength="100"
                                    autocomplete="off" />
                            </li>
                            <li>
                                <input
                                    type="password"
                                    id="register-confirm-password"
                                    ref="confirmPassword"
                                    placeholder="Confirm Password"
                                    required="true"
                                    maxlength="100" />
                            </li>
                            <li id="li-dob" className="controls-dob">
                                <label for="register-age">Date of Birth:</label>
                                    <div id="register-dob" class="register-dob">
                                        <div className="controls controls-month">
                                            <select
                                                id="register-dob-month"
                                                className="dob"
                                                value={this.props.userInfo.dob.split("-")[1]}
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
                                                defaultValue={this.props.userInfo.dob.split("-")[0]}
                                                className="dob"
                                                ref="dobDay"
                                                placeholder="Day"
                                                pattern="[0-9]*"
                                                maxlength="2"
                                                min="1"
                                                max="31" />
                                        </div>
                                        <div className="controls controls-year">
                                            <input
                                                type="number"
                                                id="register-dob-year"
                                                defaultValue={this.props.userInfo.dob.split("-")[2]}
                                                className="dob"
                                                ref="dobYear"
                                                placeholder="Year"
                                                pattern="[0-9]*"
                                                maxlength="4" />
                                        </div>
                                    </div>
                            </li>
                            <li id="li-gender" className="gender">
                                <label className="sr-only">Gender:</label>
                                  <label
                                      for="register-male"
                                      className="radio control-inline">
                                      <input
                                          type="radio"
                                          id="register-male"
                                          name="gender"
                                          className="reg-radio"
                                          value="male"
                                          checked={this.props.userInfo.gender == "male"}
                                          onChange={this.setGender}
                                          required="" />
                                           Male
                                </label>

                                  <label
                                      for="register-female"
                                      className="radio control-inline">
                                      <input
                                          type="radio"
                                          id="register-female"
                                          name="gender"
                                          className="reg-radio"
                                          value="female"
                                          checked={this.props.userInfo.gender == "female"}
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
                            <li className="solo-links">
                                <a href=""><h3>Delete Account</h3></a>
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
        var data = {};
        var fullName = this.refs.fullname.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        var confirmPassword = this.refs.confirmPassword.value;

        var day = this.refs.dobDay.value;
        var month = this.refs.dobMonth.value;
        var year = this.refs.dobYear.value;

        var gender = this.state.gender;
        var bio = this.refs.bio.value;
        var location = this.refs.location.value;
        var portfolio = this.refs.portfolio.value;

        if(email.length == 0) {
            this.state.errors.push("Please enter an email address.");
        }

        if(!/.+@.+\..+/.test(email)) {
            this.state.errors.push("The email address you supplied is invalid.");
        }

        if(password.length == 0) {
            this.state.errors.push("Please choose a password.");
        }

        if(password.length < 6) {
            this.state.errors.push("Your password is too short.");
        }

        if(confirmPassword.length == 0) {
            this.state.errors.push("Please confirm your password.");
        }

        if(password != confirmPassword) {
            this.state.errors.push("Passwords do not match.");
        }

        if(fullName.length == 0) {
            this.state.errors.push("Please enter your full name.");
        }

        if(day.length < 2) {
            this.state.errors.push("Please enter a valid day of the month.");
        }

        if(month.length == 0) {
            this.state.errors.push("Please enter a valid month.");
        }

        if(year.length == 0) {
            this.state.errors.push("Please enter a valid year.");
        }

        if(gender.length == 0) {
            this.state.errors.push("Please indicate your gender.");
        }

        if(!this.state.avatarUploaded) {
            this.state.errors.push("Please upload an avatar.");
        }

        if(bio.length == 0) {
            this.state.errors.push("Please enter a bio.");
        }

        if(location.length < 2) {
            this.state.errors.push("Please enter your current city of residence.");
        }

        if(portfolio.length == 0) {
            this.state.errors.push("Please specify a portfolio or website URL.");
        }


        // Rerender the component
        this.forceUpdate();

        if(this.state.errors.length == 0) {
            data.avatar = this.state.avatar;
            data.display_name = fullName;
            data.email = email;
            data.password = password;
            data.dob = day + "-" + month + "-" + year;
            data.gender =  gender;
            data.bio = bio;
            data.location = location;
            data.portfolio = portfolio;
            this.props.editUserProfile(data);
        }
        console.log("edited profile");
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
