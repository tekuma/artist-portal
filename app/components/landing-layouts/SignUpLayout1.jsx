import React from 'react';
import LoggedOffHeader from '../headers/LoggedOffHeader';

export default class SignUpLayout1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="main-wrapper">
                <LoggedOffHeader />
                <div className="layout-centered">
                    <article className="signup-wrapper">
                        <div className="signup-heading-wrapper pink">
                            <h3>SIGN UP</h3>
                        </div>
                        <div className="signup-heading-wrapper">
                            <h3>Help us build your artist profile.</h3>
                        </div>
                        <form className="signup-form page-2">
                            <div className="left-form">
                                <div className="image-upload-box">
                                    <img src="../assets/images/icons/person-beige.svg" />
                                    <h3 className="upload-writing big">Upload your Photo</h3>
                                    <h3 className="upload-writing small">or Simply Drage Here</h3>
                                </div>
                            </div>
                            <div className="right-form">
                                <ul>
                                    <li>
                                        <input
                                            type="text"
                                            id="register-fullname"
                                            name="fullname"
                                            placeholder="Full Name"
                                            required=""
                                            data-msg-required="Please enter your full name."
                                            maxlength="50"
                                            autocapitalize="off"
                                            autocomplete="off"
                                            autocorrect="off" />
                                    </li>
                                    <li id="li-dob" className="controls-dob">
                                        <label for="register-age">Date of Birth: </label>
                                        <div id="register-dob" class="register-dob">
                                            <div className="controls controls-month">
                                                <select id="register-dob-month" className="dob" name="dob-month">
                                                    <option value="" selected="" disabled="">Month</option>
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
                                        <label className="sr-only">Gender: </label>
                                          <label for="register-male" class="radio control-inline">
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

                                          <label
                                              for="register-female"
                                              className="radio control-inline">
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
                                    <button className="signup-button left" type="submit">
                                        <h3>Next</h3>
                                    </button>
                                    <li className="solo-links left">
                                        <a href=""><h3>Skip</h3></a>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        );
    }
}
