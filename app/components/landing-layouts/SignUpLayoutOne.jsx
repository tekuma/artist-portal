import React from 'react';
import Dropzone from 'react-dropzone';
import LoggedOffHeader from '../headers/LoggedOffHeader';

export default class SignUpLayoutOne extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarUploaded: false,
            avatarPreview: "",
            gender: "",
            avatar: [],
            errors: []
        };
    }

    render() {
        return (
            <div className="main-wrapper">
                <LoggedOffHeader
                    togglePopover={this.props.togglePopover} />
                <div className="layout-centered">
                    <article className="signup-wrapper">
                        <div className="signup-heading-wrapper pink">
                            <h3>SIGN UP</h3>
                        </div>
                        <div className="signup-heading-message">
                            <h3>Help us build your artist profile.</h3>
                            {this.state.errors.map(error => {
                                    return (
                                        <div
                                            className="registration-error">
                                            <h3>{error}</h3>
                                        </div>
                                    );
                                })}
                        </div>
                        <form className="signup-form page-2">
                            <div className="left-form">
                                <Dropzone
                                    className="image-upload-box"
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
                            </div>
                            <div className="right-form">
                                <ul>
                                    <li>
                                        <input
                                            type="text"
                                            id="register-fullname"
                                            ref="fullname"
                                            placeholder="Full Name"
                                            required=""
                                            maxlength="50"
                                            autocapitalize="off"
                                            autocomplete="off"
                                            autocorrect="off" />
                                    </li>
                                    <li id="li-dob" className="controls-dob">
                                        <label for="register-age">Date of Birth: </label>
                                        <div id="register-dob" class="register-dob">
                                            <div className="controls controls-month">
                                                <select
                                                    id="register-dob-month"
                                                    className="dob"
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
                                                  onChange={this.setGender}
                                                  required="" />
                                                   Female
                                        </label>
                                    </li>
                                    <button
                                        className="signup-button left"
                                        type="submit"
                                        onClick={this.saveAndContinue}>
                                        <h3>Next</h3>
                                    </button>
                                    <li
                                        className="solo-links left"
                                        onClick={this.props.nextStep}>
                                        <h3>Skip</h3>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        );
    }

    saveAndContinue = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
        var data = {};

        var fullName = this.refs.fullname.value;
        var day = this.refs.dobDay.value;
        var month = this.refs.dobMonth.value;
        var year = this.refs.dobYear.value;
        var gender = this.state.gender;


        console.log(day);
        console.log(month);
        console.log(year);
        console.log(this.state.avatar);

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

        // Rerender the component
        this.forceUpdate();

        if(this.state.errors.length == 0) {

            data.name = fullName;
            data.dob = day + "-" + month + "-" + year;
            data.gender =  gender;
            data.avatar = this.state.avatar;
            this.props.saveValues(data);
            this.props.nextStep();
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
