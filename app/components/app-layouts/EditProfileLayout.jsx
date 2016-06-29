import React from 'react';
import Dropzone from 'react-dropzone';

export default class EditProfileLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarUploaded: false,
            avatarPreview: "",
            userInfo: this.props.userInfo
        }
    }

    render() {
        return(
            <form className="profile-form">
                <section className="profile-pic-container">
                    <img src="assets/images/afika.jpg" />
                </section>
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
                                    defaultValue={this.state.userInfo.name}
                                    name="fullname"
                                    placeholder="Full Name"
                                    required=""
                                    data-msg-required="Please enter your full name."
                                    data-rule-minlength="4"
                                    data-msg-minlength="Your username is too short."
                                    maxlength="50"
                                    autocapitalize="off"
                                    autocomplete="off"
                                    autocorrect="off" />
                            </li>
                            <li>
                                <input
                                    type="email"
                                    id="register-email"
                                    defaultValue={this.state.userInfo.email}
                                    name="email"
                                    placeholder="Email"
                                    required=""
                                    data-msg-required="Please enter your email."
                                    data-msg-email="The email address you supplied is invalid."
                                    maxlength="100" />
                            </li>
                            <li>
                                <input
                                    type="password"
                                    id="register-password"
                                    defaultValue=""
                                    name="password"
                                    placeholder="Password"
                                    required=""
                                    data-msg-required="Please choose a password."
                                    data-rule-minlength="4"
                                    data-msg-minlength="Your password is too short."
                                    maxlength="100"
                                    autocomplete="off" />
                            </li>
                            <li>
                                <input
                                    type="password"
                                    id="register-confirm-password"
                                    defaultValue=""
                                    name="confirm-password"
                                    placeholder="Confirm Password"
                                    required=""
                                    data-msg-required="Please confirm your password."
                                    data-rule-equalto="#register-password"
                                    data-msg-equalto="Password doesn't match."
                                    maxlength="100" />
                            </li>
                            <li id="li-dob" className="controls-dob">
                                <label for="register-age">Date of Birth:</label>
                                <div id="register-dob" className="register-dob">
                                    <div className="controls controls-month">
                                        <select
                                            id="register-dob-month"
                                            defaultValue=""
                                            className="dob"
                                            name="dob-month">
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
                                            className="dob"
                                            name="dob-day"
                                            placeholder="Day"
                                            pattern="[0-9]*"
                                            maxlength="2"
                                            min="1"
                                            max="31"
                                            data-msg-required="When were you born?"
                                            data-msg-number="Please enter a valid day of the month."
                                            data-msg-min="Please enter a valid day of the month."
                                            data-msg-max="Please enter a valid day of the month." />
                                    </div>
                                    <div className="controls controls-year">
                                        <input
                                            type="number"
                                            id="register-dob-year"
                                            className="dob"
                                            name="dob-year"
                                            placeholder="Year"
                                            pattern="[0-9]*"
                                            maxlength="4"
                                            min="1900"
                                            max="2006"
                                            data-msg-required="When were you born?"
                                            data-msg-number="Please enter a valid year."
                                            data-msg-min="Please enter a valid year."
                                            data-msg-max="Sorry, but you don't meet Spotify's age requirements." />
                                    </div>
                                </div>
                            </li>
                            <li id="li-gender" className="gender">
                                <label className="sr-only">Gender:</label>
                                  <label for="register-male" className="radio control-inline">
                                    <input
                                        type="radio"
                                        id="register-male"
                                        className="gender"
                                        name="gender"
                                        value="male"
                                        required=""
                                        data-msg-required="Please indicate your gender." />
                                        Male
                                    </label>

                                <label for="register-female" className="radio control-inline">
                                    <input
                                        type="radio"
                                        id="register-female"
                                        className="gender"
                                        name="gender"
                                        value="female"
                                        required=""
                                        data-msg-required="Please indicate your gender." />
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
                                <textarea className="bio" placeholder="Bio" />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    id="register-location"
                                    name="location"
                                    placeholder="Location" />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    id="register-portfolio"
                                    name="portfolio"
                                    placeholder="Portfolio/Website" />
                            </li>
                            <li className="solo-links">
                                <a href=""><h3>Delete Account</h3></a>
                            </li>
                            <button className="edit-button" type="submit">
                                <h3>Update</h3>
                            </button>
                        </ul>
                    </fieldset>
                </section>
            </form>
        );
    }
}
