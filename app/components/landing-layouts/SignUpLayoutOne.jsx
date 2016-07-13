// Libs
import React            from 'react';
import Dropzone         from 'react-dropzone';
import uuid             from 'node-uuid';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Files
import LoggedOffHeader  from '../headers/LoggedOffHeader';

export default class SignUpLayoutOne extends React.Component {
    constructor(props) {
        super(props);
        console.log("Error props: ", this.props.errors);
        this.state = {
            avatarUploaded: false,
            avatarPreview: "",
            gender: "",
            avatar: [],
            errors: this.props.errors,
            errorType: {},
            currentError: ""
        };
    }

    render() {
        var errorStyle = {
            border: '1px solid #ec167c'
        };

        var avatarErrorStyle = {
            border: '2px dashed #ec167c'
        }

        var genderErrorStyle = {
            color: '#ec167c'
        }

        console.log(this.state.errors);
        return (
            <div>
                <div className="main-wrapper">
                    <LoggedOffHeader
                        togglePopover={this.props.togglePopover}
                        returnToLandingPage={this.props.returnToLandingPage} />
                    <div className="layout-centered">
                        <article className="signup-wrapper">
                            <div className="signup-heading-wrapper pink">
                                <h3>SIGN UP</h3>
                            </div>
                            <div className="signup-heading-message">
                                <h3>Help us build your artist profile.</h3>
                            </div>
                            <form className="signup-form page-2">
                                <div className="left-form">
                                    <Dropzone
                                        className="image-upload-box"
                                        style={this.state.errorType.avatar ? avatarErrorStyle : null}
                                        accept="image/*"
                                        onDrop={this.onDrop}>
                                        <img
                                            style={{display: this.state.avatarUploaded  ? "none" : "block" }}
                                            src="../assets/images/icons/person-beige.svg" />
                                        <h3
                                            style={{display: this.state.avatarUploaded  ? "none" : "block" }}
                                            className="upload-writing medium">
                                            Click to Upload your Photo
                                        </h3>
                                        <h3
                                            style={{display: this.state.avatarUploaded  ? "none" : "block" }}
                                            className="upload-writing small">
                                            or Simply it Drag Here
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
                                                id="register-displayname"
                                                ref="displayname"
                                                style={this.state.errorType.name ? errorStyle : null}
                                                placeholder="Display Name"
                                                required=""
                                                maxLength="50"
                                                autoCapitalize="off"
                                                autoComplete="off"
                                                autoCorrect="off" />
                                        </li>
                                        <li id="li-dob" className="controls-dob">
                                            <label for="register-age">Date of Birth: </label>
                                            <div id="register-dob" className="register-dob">
                                                <div className="controls controls-month">
                                                    <select
                                                        id="register-dob-month"
                                                        className="dob"
                                                        ref="dobMonth"
                                                        style={this.state.errorType.month ? errorStyle : null}>
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
                                                        id="register-dob-year"
                                                        className="dob"
                                                        ref="dobYear"
                                                        style={this.state.errorType.year ? errorStyle : null}
                                                        placeholder="Year"
                                                        pattern="[0-9]*"
                                                        maxLength="4" />
                                                </div>
                                            </div>
                                        </li>
                                        <li id="li-gender" className="gender">
                                            <label className="gender-label">Preferred Gender Pronoun:</label>
                                              <label
                                                  for="register-she"
                                                  className="gender-radio control-inline"
                                                  style={this.state.errorType.gender ? genderErrorStyle : null}>
                                                  <input
                                                      type="radio"
                                                      id="register-she"
                                                      name="gender"
                                                      className="reg-radio"
                                                      value="she"
                                                      onChange={this.setGender}
                                                      required="" />
                                                  She
                                            </label>
                                            <label
                                                for="register-he"
                                                className="gender-radio control-inline"
                                                style={this.state.errorType.gender ? genderErrorStyle : null}>
                                                <input
                                                    type="radio"
                                                    id="register-he"
                                                    name="gender"
                                                    className="reg-radio"
                                                    value="he"
                                                    onChange={this.setGender}
                                                    required="" />
                                                He
                                          </label>
                                            <label
                                                for="register-they"
                                                className="gender-radio control-inline"
                                                style={this.state.errorType.gender ? genderErrorStyle : null}>
                                                <input
                                                    type="radio"
                                                    id="register-they"
                                                    name="gender"
                                                    className="reg-radio"
                                                    value="they"
                                                    onChange={this.setGender}
                                                    required="" />
                                                They
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
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="registration-error"
                        open={this.state.errors.length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000}/>
                </MuiThemeProvider>
            </div>
        );
    }

    saveAndContinue = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
        this.state.errorType = {};

        var data = {};
        var displayName = this.refs.displayname.value;
        var day = this.refs.dobDay.value;
        var month = this.refs.dobMonth.value;
        var year = this.refs.dobYear.value;
        var gender = this.state.gender;

        if(displayName.length == 0) {
            this.state.errors.push("Please enter a display name.");

            let errorType = this.state.errorType;
            errorType.name = true;
            this.setState({
                errorType: errorType
            });
        }

        if(day.length == 0 || day.length > 2) {
            this.state.errors.push("Please enter a valid day of the month.");

            let errorType = this.state.errorType;
            errorType.day = true;
            this.setState({
                errorType: errorType
            });
        }

        if(month.length == 0 || month.length > 2) {
            this.state.errors.push("Please enter a valid month.");

            let errorType = this.state.errorType;
            errorType.month = true;
            this.setState({
                errorType: errorType
            });
        }

        if(year.length != 4 || eval(year) > new Date().getFullYear()) {
            this.state.errors.push("Please enter a valid year.");

            let errorType = this.state.errorType;
            errorType.year = true;
            this.setState({
                errorType: errorType
            });
        }

        if(gender.length == 0) {
            this.state.errors.push("Please indicate your preferred gender pronoun.");

            let errorType = this.state.errorType;
            errorType.gender = true;
            this.setState({
                errorType: errorType
            });
        }

        if(!this.state.avatarUploaded) {
            this.state.errors.push("Please upload an avatar.");

            let errorType = this.state.errorType;
            errorType.avatar = true;
            this.setState({
                errorType: errorType
            });
        }

        // Rerender the component
        this.forceUpdate();
        this.props.clearErrors();

        if(this.state.errors.length == 0) {

            data.display_name = displayName;
            data.dob = day + "-" + month + "-" + year;
            data.gender_pronoun =  gender;
            data.avatar = this.state.avatar;
            this.props.saveRegistration(data);
            this.props.nextStep();
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
