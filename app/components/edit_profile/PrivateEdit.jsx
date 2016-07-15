import React from 'react';
import Dropzone         from 'react-dropzone';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar         from 'material-ui/Snackbar';

export default class PrivateEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accordion: {
                legal_name: false,
                email: false,
                password: false
            },
            errorType: {},
            errors: [],
            currentError: ""
        }

    }

    render() {
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
                            className={this.state.accordion.legal ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"legal_name")}>
                            <h2 className="accordion-item-heading">Legal Name</h2>
                            <h3 className="accordion-item-preview">{this.props.user.legal_name != "" ? this.props.user.legal_name : "Unset"}</h3>
                        </div>
                        <div
                            id="legal-name-content"
                            className={this.state.accordion.legal_name ? "accordion-content open" : "accordion-content"}>
                                <input
                                type="text"
                                id="edit-legalname"
                                defaultValue={this.props.user.legal}
                                ref="legalname"
                                style={this.state.errorType.legalName ? errorStyle : null}
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
                            style={this.props.user.auth_provider == "password" ? (this.state.errorType.email ? errorStylePasswordAuth : passwordAuth) : (this.state.errorType.email ? errorStyle : hideStyle)}>
                            <h2 className="accordion-item-heading">Email</h2>
                            <h3 className="accordion-item-preview">{this.props.user.email != "" ? this.props.user.email : "Unset"}</h3>
                        </div>
                        <div
                            id="email-content"
                            className={this.state.accordion.email ? "accordion-content open" : "accordion-content"}
                            style={this.props.user.auth_provider == "password" ? (this.state.errorType.email ? errorStylePasswordAuth : passwordAuth) : (this.state.errorType.email ? errorStyle : hideStyle)}>
                            <input
                                type="email"
                                id="edit-email"
                                defaultValue={this.props.user.email}
                                ref="email"
                                style={this.state.errorType.email ? errorStyle : null}
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
                        <div
                            className={this.state.accordion.password ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"password")}
                            style={this.props.user.auth_provider == "password" ? (this.state.errorType.email ? errorStylePasswordAuth : passwordAuth) : (this.state.errorType.email ? errorStyle : hideStyle)}>
                            <h2 className="accordion-item-heading">Password</h2>
                            <h3 className="accordion-item-preview">&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</h3>
                        </div>
                        <div
                            id="password-content"
                            className={this.state.accordion.password ? "accordion-content open" : "accordion-content"}
                            style={this.props.user.auth_provider == "password" ? (this.state.errorType.email ? errorStylePasswordAuth : passwordAuth) : (this.state.errorType.email ? errorStyle : hideStyle)}>
                            <input
                                type="password"
                                id="edit-password"
                                ref="currentPassword"
                                style={this.state.errorType.currentPassword ? errorStyle : null}
                                placeholder="Current Password"
                                required="true"
                                maxLength="100"
                                autoComplete="off" />
                            <input
                                type="password"
                                id="edit-password"
                                ref="password"
                                style={this.state.errorType.password ? errorStyle : null}
                                placeholder="New Password"
                                required="true"
                                maxLength="100"
                                autoComplete="off" />
                            <input
                                type="password"
                                id="edit-confirm-password"
                                ref="confirmPassword"
                                style={this.state.errorType.confirmPassword ? errorStyle : null}
                                placeholder="Confirm Password"
                                required="true"
                                maxLength="100" />
                        </div>
                    </article>
                    <button
                        className="edit-profile-save-button private"
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

        // Private
        let legalName = this.refs.legalname.value;

        let email = this.refs.email.value;
        let emailPassword = this.refs.emailPassword.value;

        let currentPassword = this.refs.currentPassword.value;
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;

        // Private Validations
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

        // Only test regex if user has typed in an email and has password
        if(email.length > 0 && email != this.props.user.email && !/.+@.+\..+/.test(email)) {
            this.state.errors.push("The email address you supplied is invalid.");

            let errorType = this.state.errorType;
            errorType.email = true;
            this.setState({
                errorType: errorType
            });
        } else if (email != this.props.user.email && emailPassword.length == 0) {
            this.state.errors.push("To change your email, you must enter your current password.");

            let errorType = this.state.errorType;
            errorType.emailPassword = true;
            this.setState({
                errorType: errorType
            });
        } else if (email != this.props.user.email && email.length > 0 && emailPassword.length > 0) {
            data.email = email;
            data.email_password = emailPassword;
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
        if(
            currentPassword.length > 0
            && password.length > 0
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
        && currentPassword.length == 0) {
                this.state.errors.push("To change your password, you must enter your current password.");

                let errorType = this.state.errorType;
                errorType.currentPassword = true;
                this.setState({
                    errorType: errorType
                });
        } else if (currentPassword.length >= 6
                    && password.length >= 6
                    && confirmPassword.length >= 6
                    && password == confirmPassword) {
                        data.current_password = currentPassword;
                        data.password = password;
                    }

        // Rerender the component to show errors
        this.forceUpdate();

        // gather inputs that have been entered

        if(this.state.errors.length == 0) {
            this.props.editPrivateUserInfo(data);
            console.log("edited data: ", data);
            console.log("edited profile");

            this.setState({
                accordion: {
                    legal_name: false,
                    email: false,
                    password: false
                }
            });
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
}
