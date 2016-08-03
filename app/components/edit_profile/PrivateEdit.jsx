// Libs
import React            from 'react';
import firebase         from 'firebase';
import Dropzone         from 'react-dropzone';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar         from 'material-ui/Snackbar';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';

export default class PrivateEdit extends React.Component {
    state = {
        gender          : "",
        accordion: {
            legal_name: false,
            email: false,
            emailVerified: false,
            password: false,
            paypal: false,
            age         : false,
            pronoun     : false
        },
        allAccordion    : false,
        errorType: {},
        errors: [],
        currentError: ""
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //pass
    }

    render() {

        let errorStylePasswordAuth = {
            border: '1px solid #ec167c'
        };

        let errorStyle = {
            border: '1px solid #ec167c'
        };

        let hideStyle = {
            display: 'none'
        };

        let age;

        if (this.props.userPrivate.dob) {
            age = `${this.props.userPrivate.dob.split("-")[1]}-${this.props.userPrivate.dob.split("-")[0]}-${this.props.userPrivate.dob.split("-")[2]}`;
        }

        const saveTooltip = (
            <Tooltip
                id="delete-tooltip-regular"
                className="tooltip">
                Save Private Information
            </Tooltip>
        );

        const accordionTooltip = (
            <Tooltip
                id="delete-tooltip-regular"
                className="tooltip">
                Open All Private Fields
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
                            className={this.state.accordion.legal_name ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"legal_name")}>
                            <h2 className="accordion-item-heading">Legal Name</h2>
                            <h3 className="accordion-item-preview">{this.props.userPrivate.legal_name != "" ? this.props.userPrivate.legal_name : "Unset"}</h3>
                        </div>
                        <div
                            id="legal-name-content"
                            className={this.state.accordion.legal_name ? "accordion-content open" : "accordion-content"}>
                                <input
                                type="text"
                                id="edit-legalname"
                                defaultValue={this.props.userPrivate.legal_name}
                                ref="legalname"
                                style={this.state.errorType.legalName ? errorStyle : null}
                                onKeyPress={this.setUnsaved}
                                placeholder="Legal Name"
                                required=""
                                maxLength="50"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off" />
                        </div>
                        <div
                            className={this.state.accordion.email ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"email")}
                            style={this.props.user.auth_provider == "password" ? (this.state.errorType.email ? errorStylePasswordAuth : null) : (this.state.errorType.email ? errorStyle : hideStyle)}>
                            <h2 className="accordion-item-heading">Email</h2>
                            <h3 className="accordion-item-preview">{this.props.userPrivate.email != "" ? this.props.userPrivate.email : "Unset"}</h3>
                        </div>
                        <div
                            id="email-content"
                            className={this.state.accordion.email ? "accordion-content open" : "accordion-content"}
                            style={this.props.user.auth_provider == "password" ? (this.state.errorType.email ? errorStylePasswordAuth : null) : (this.state.errorType.email ? errorStyle : hideStyle)}>
                            <ul>
                                <li>
                                    <input
                                        type="email"
                                        id="edit-email"
                                        defaultValue={this.props.userPrivate.email}
                                        ref="email"
                                        style={this.state.errorType.email ? errorStyle : null}
                                        onKeyPress={this.setUnsaved}
                                        placeholder="Email"
                                        required="true"
                                        maxLength="100" />
                                </li>
                                <li>
                                    <input
                                        type="password"
                                        id="edit-password"
                                        ref="emailPassword"
                                        placeholder="Current Password"
                                        required="true"
                                        maxLength="100"
                                        autoComplete="off" />
                                </li>
                            </ul>
                        </div>
                        <div
                            className={this.state.accordion.emailVerified ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"emailVerified")}
                            style={this.props.user.auth_provider == "password" ? null : hideStyle}>
                            <h2 className="accordion-item-heading">Email Verification</h2>
                            <h3 className="accordion-item-preview">{(firebase.auth().currentUser.emailVerified) ? "Verified" : "Unverified"}</h3>
                        </div>
                        <div
                            id="email-verified-content"
                            className={this.state.accordion.emailVerified ? "accordion-content open" : "accordion-content"}
                            style={this.props.user.auth_provider == "password" ? null : hideStyle}>
                            {firebase.auth().currentUser.emailVerified ?
                                <h3 className="email-verified-writing">
                                    Email Verified
                                </h3> :
                                <button
                                    className="verify-button"
                                    type="submit"
                                    onClick={this.verifyEmail}>
                                    <h3>Verify Email</h3>
                                </button>}
                        </div>
                        <div
                            className={this.state.accordion.password ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"password")}
                            style={this.props.user.auth_provider == "password" ? (this.state.errorType.email ? errorStylePasswordAuth : null) : (this.state.errorType.email ? errorStyle : hideStyle)}>
                            <h2 className="accordion-item-heading">Password</h2>
                            <h3 className="accordion-item-preview">&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</h3>
                        </div>
                        <div
                            id="password-content"
                            className={this.state.accordion.password ? "accordion-content open" : "accordion-content"}
                            style={this.props.user.auth_provider == "password" ? (this.state.errorType.email ? errorStylePasswordAuth : null) : (this.state.errorType.email ? errorStyle : hideStyle)}>
                            <ul>
                                <li>
                                    <input
                                        type="password"
                                        id="edit-password"
                                        ref="currentPassword"
                                        style={this.state.errorType.currentPassword ? errorStyle : null}
                                        onKeyPress={this.setUnsaved}
                                        placeholder="Current Password"
                                        required="true"
                                        maxLength="100"
                                        autoComplete="off" />
                                </li>
                                <li>
                                    <input
                                        type="password"
                                        id="edit-password"
                                        ref="password"
                                        style={this.state.errorType.password ? errorStyle : null}
                                        onKeyPress={this.setUnsaved}
                                        placeholder="New Password"
                                        required="true"
                                        maxLength="100"
                                        autoComplete="off" />
                                </li>
                                <li>
                                    <input
                                        type="password"
                                        id="edit-confirm-password"
                                        ref="confirmPassword"
                                        style={this.state.errorType.confirmPassword ? errorStyle : null}
                                        onKeyPress={this.setUnsaved}
                                        placeholder="Confirm Password"
                                        required="true"
                                        maxLength="100" />
                                </li>
                            </ul>
                        </div>
                        <div
                            className={this.state.accordion.paypal ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"paypal")}>
                            <h2 className="accordion-item-heading">PayPal Email</h2>
                            <h3 className="accordion-item-preview">{this.props.userPrivate.paypal != "" ? this.props.userPrivate.paypal : "Unset"}</h3>
                        </div>
                        <div
                            id="paypal-content"
                            className={this.state.accordion.paypal ? "accordion-content open" : "accordion-content"}>
                            <input
                                type="email"
                                id="edit-paypal"
                                defaultValue={this.props.userPrivate.paypal}
                                ref="paypal"
                                style={this.state.errorType.paypal ? errorStyle : null}
                                onKeyPress={this.setUnsaved}
                                placeholder="PayPal Email"
                                required="true"
                                maxLength="100" />
                        </div>
                        <div
                            className={this.state.accordion.age ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"age")}>
                            <h2 className="accordion-item-heading">Age</h2>
                            <h3 className="accordion-item-preview">{this.props.userPrivate.dob != "" ? age : "Unset"}</h3>
                        </div>
                        <div
                            id="age-content"
                            className={this.state.accordion.age ? "accordion-content open" : "accordion-content"}>
                            <div>
                                <label htmlFor="edit-age">Date of Birth: </label>
                                <div id="accordion-dob" className="accordion-dob">
                                    <div className="controls controls-month">
                                        <select
                                            id="accordion-dob-month"
                                            className="dob"
                                            defaultValue={this.props.userPrivate.dob ? this.props.userPrivate.dob.split("-")[1] : null}
                                            onChange={this.setUnsaved}
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
                                            defaultValue={this.props.userPrivate.dob ? this.props.userPrivate.dob.split("-")[0] : null}
                                            className="dob"
                                            ref="dobDay"
                                            style={this.state.errorType.day ? errorStyle : null}
                                            onChange={this.setUnsaved}
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
                                            defaultValue={this.props.userPrivate.dob ? this.props.userPrivate.dob.split("-")[2] : null}
                                            className="dob"
                                            ref="dobYear"
                                            style={this.state.errorType.year ? errorStyle : null}
                                            onChange={this.setUnsaved}
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
                                        defaultChecked={this.props.userPrivate.over_eighteen}
                                        onChange={this.setUnsaved} />
                                        I confirm that I am 18+
                                </label>
                            </div>
                        </div>
                        <div
                            className={this.state.accordion.pronoun ? "accordion-item no-border-bottom open" : "accordion-item no-border-bottom"}
                            onClick={this.toggleAccordion.bind({},"pronoun")}>
                            <h2 className="accordion-item-heading">Preferred Gender Pronoun</h2>
                            <h3 className="accordion-item-preview">{this.props.userPrivate.gender_pronoun != "" ? this.props.userPrivate.gender_pronoun : "Unset"}</h3>
                        </div>
                        <div
                            id="pronoun-content"
                            className={this.state.accordion.pronoun ? "accordion-content open" : "accordion-content"}>
                            <label
                                htmlFor="edit-she"
                                className="gender-radio control-inline">
                                <input
                                    type="radio"
                                    id="edit-she"
                                    name="gender"
                                    className="reg-radio"
                                    defaultValue="She"
                                    defaultChecked={this.props.userPrivate.gender_pronoun == "She"}
                                    onChange={this.setGender}
                                    required="" />
                                She
                          </label>
                          <label
                              htmlFor="edit-he"
                              className="gender-radio control-inline">
                              <input
                                  type="radio"
                                  id="edit-he"
                                  name="gender"
                                  className="reg-radio"
                                  defaultValue="He"
                                  defaultChecked={this.props.userPrivate.gender_pronoun == "He"}
                                  onChange={this.setGender}
                                  required="" />
                              He
                        </label>
                        <label
                            htmlFor="edit-they"
                            className="gender-radio control-inline">
                                <input
                                    type="radio"
                                    id="edit-they"
                                    name="gender"
                                    className="reg-radio"
                                    defaultValue="They"
                                    defaultChecked={this.props.userPrivate.gender_pronoun == "They"}
                                    onChange={this.setGender}
                                    required="" />
                                They
                            </label>
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

    // ----------- METHODS --------------

    /**
     * TODO
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    toggleAccordion = (item) => {
        let accordion = this.state.accordion;
        accordion[item] = !accordion[item];

        this.setState({
            accordion: accordion
        });
    }

    toggleAllAccordion = () => {
        let allAccordion = this.state.allAccordion;

        let accordion   = {
            legal_name      : !allAccordion,
            email           : !allAccordion,
            emailVerified   : !allAccordion,
            password        : !allAccordion,
            paypal          : !allAccordion,
            age             : !allAccordion,
            pronoun         : !allAccordion
        };

        this.setState({
            accordion: accordion,
            allAccordion: !allAccordion
        });
    }

    /**
     * TODO
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    setGender = (e) => {
        this.setState({
            gender: e.target.value
        });
        this.props.setUnsaved();
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
        let data = {};

        // Private
        let legalName = this.refs.legalname.value;

        let email = this.refs.email.value;
        let emailPassword = this.refs.emailPassword.value;

        let currentPassword = this.refs.currentPassword.value;
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;

        let paypal = this.refs.paypal.value;

        let day          = this.refs.dobDay.value;
        let month        = this.refs.dobMonth.value;
        let year         = this.refs.dobYear.value;
        let overEighteen = this.refs.overEighteen.checked;

        let gender       = this.state.gender;

        data.over_eighteen = overEighteen;

        // ====== Private Validations ======

        // Legal Name
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

        // Email

        // Only test regex if user has typed in an email and has password
        if(email.length > 0 &&
            email != this.props.userPrivate.email &&
            !/.+@.+\..+/.test(email) &&
            this.props.user.auth_provider == "password") {
            this.state.errors.push("The email address you supplied is invalid.");

            let errorType = this.state.errorType;
            errorType.email = true;
            this.setState({
                errorType: errorType
            });
        } else if (email != this.props.userPrivate.email &&
            emailPassword.length == 0 &&
            this.props.user.auth_provider == "password") {
            this.state.errors.push("To change your email, you must enter your current password.");

            let errorType = this.state.errorType;
            errorType.emailPassword = true;
            this.setState({
                errorType: errorType
            });
        } else if (email != this.props.userPrivate.email &&
                email.length > 0 &&
                emailPassword.length > 0 &&
                this.props.user.auth_provider == "password") {
            data.email = email;
            data.email_password = emailPassword;
        }

        // Password

        // Only test password length if typed in
        if(password.length > 0 && password.length < 6 && this.props.user.auth_provider == "password") {
            this.state.errors.push("Your password must be at least 6 characters long.");

            let errorType = this.state.errorType;
            errorType.password = true;
            this.setState({
                errorType: errorType
            });
        }

        // Only test confirm password length if password typed in
        if(password.length > 0 && confirmPassword.length == 0 && this.props.user.auth_provider == "password") {
            this.state.errors.push("Please confirm your password.");

            let errorType = this.state.errorType;
            errorType.confirmPassword = true;
            this.setState({
                errorType: errorType
            });
        }

        // Only test passwords equal if typed in
        if(
            currentPassword.length > 0
            && password.length > 0
            && confirmPassword.length > 0
            && password != confirmPassword
            && this.props.user.auth_provider == "password") {
            this.state.errors.push("Passwords do not match.");

            let errorType = this.state.errorType;
            errorType.password = true;
            errorType.confirmPassword = true;
            this.setState({
                errorType: errorType
            });
        } else if (password.length >= 6
        && confirmPassword.length >= 6
        && currentPassword.length == 0
        && this.props.user.auth_provider == "password") {
                this.state.errors.push("To change your password, you must enter your current password.");

                let errorType = this.state.errorType;
                errorType.currentPassword = true;
                this.setState({
                    errorType: errorType
                });
        } else if (currentPassword.length >= 6
                    && password.length >= 6
                    && confirmPassword.length >= 6
                    && password == confirmPassword
                    && this.props.user.auth_provider == "password") {
                        data.current_password = currentPassword;
                        data.password = password;
                    }

        // PayPal Email
        if (paypal.length > 0) {
            data.paypal = paypal;
        }

        // Date of Birth
        if (day.length > 0 && day.length > 2) {
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
        }

        // Gender
        if(gender.length > 0) {
            data.gender_pronoun =  gender;
        }

        // Rerender the component to show errors
        this.forceUpdate();

        // gather inputs that have been entered

        if(this.state.errors.length == 0) {
            this.props.editPrivateUserInfo(data);
            this.refs.currentPassword.value = "";
            this.refs.password.value = "";
            this.refs.confirmPassword.value = "";

            this.setState({
                accordion: {
                    legal_name: false,
                    email: false,
                    password: false,
                    paypal: false,
                    age: false,
                    pronoun: false
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
     * [description]
     * @return {[type]} [description]
     */
    verifyEmail = () => {
        firebase.auth().currentUser.sendEmailVerification().then(()=>{
            this.props.toggleVerifyEmailDialog();
        });

    }

}
