// Libs
import React            from 'react';
import uuid             from 'node-uuid';
import Dropzone         from 'react-dropzone';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * TODO
 */
export default class SignUpOne extends React.Component {
    state = {
        avatarUploaded  : false,                // Used to keep track of whether an avatar has been uploaded
        avatarPreview   : "",                   // Used store a preview URL of the uploaded avatar
        gender          : "",                   // Used to store the chosen gender pronoun
        avatar          : [],                   // Used to store the uploaded avatar blob
        errors          : [],                   // Used to store Auth errors from Firebase and Registration errors
        errorType       : {},                   // Used to keep track of the type of error encountered to highlight relevant input field
        currentError    : ""                    // Used to store the current error to be displayed in the snackbar
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('-----SignUpOne');
    }

    render() {
        let errorStyle = {
            border: '1px solid #ec167c'
        };

        let avatarErrorStyle = {
            border: '2px dashed #ec167c'
        }

        let genderErrorStyle = {
            color: '#ec167c'
        }

        return (
            <div>
                <div className="main-wrapper login">
                    <div className="login-layout">
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
                                        accept="image/png, image/jpeg"
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
                                    <ul className="signup-form-one">
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
                                            <label htmlFor="register-age">Date of Birth: </label>
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
                                                  htmlFor="register-she"
                                                  className="gender-radio control-inline"
                                                  style={this.state.errorType.gender ? genderErrorStyle : null}>
                                                  <input
                                                      type="radio"
                                                      id="register-she"
                                                      name="gender"
                                                      className="reg-radio"
                                                      value="She"
                                                      onChange={this.setGender}
                                                      required="" />
                                                  She
                                            </label>
                                            <label
                                                htmlFor="register-he"
                                                className="gender-radio control-inline"
                                                style={this.state.errorType.gender ? genderErrorStyle : null}>
                                                <input
                                                    type="radio"
                                                    id="register-he"
                                                    name="gender"
                                                    className="reg-radio"
                                                    value="He"
                                                    onChange={this.setGender}
                                                    required="" />
                                                He
                                          </label>
                                            <label
                                                htmlFor="register-they"
                                                className="gender-radio control-inline"
                                                style={this.state.errorType.gender ? genderErrorStyle : null}>
                                                <input
                                                    type="radio"
                                                    id="register-they"
                                                    name="gender"
                                                    className="reg-radio"
                                                    value="They"
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

    componentDidMount() {
        console.log('+++++SignUpOne');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errors: this.state.errors.concat(nextProps.errors),
            currentError: nextProps.errors[0]
        });
    }

// ============= Methods ===============

    saveAndContinue = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
        this.state.errorType = {};

        let publicData = {};
        let privateData = {};
        let displayName = this.refs.displayname.value;
        let day = this.refs.dobDay.value;
        let month = this.refs.dobMonth.value;
        let year = this.refs.dobYear.value;
        let gender = this.state.gender;

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

            publicData.display_name = displayName;
            privateData.dob = day + "-" + month + "-" + year;
            privateData.gender_pronoun =  gender;
            publicData.avatar = this.state.avatar;
            this.props.saveRegPublic(publicData);
            this.props.saveRegPrivate(privateData);
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
