'use strict';
import React           from 'react';
import LoggedOffHeader from '../headers/LoggedOffHeader';
import uuid from 'node-uuid';
import Snackbar from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class LandingPageLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors,
            errorType: {},
            currentError: ""
        };
    }

    render() {
        var errorStyle = {
            border: '1px solid #ec167c'
        };

        return (
            <div>
                <div className="main-wrapper">
                    <LoggedOffHeader
                        togglePopover={this.props.togglePopover}
                         />
                    <div className="layout-centered">
                        <article className="signup-wrapper">
                            <div className="artist-logo-wrapper">
                                <img src="../assets/images/art-illus.svg" />
                                <h3>ARTIST</h3>
                            </div>

                            <form className="signup-form page-1">
                                <div className="social-wrapper">
                                    <div className="social-buttons">
                                        <div
                                            onClick={this.props.authenticateWithFB}
                                            className="social-button facebook">
                                            <div className="social-icon">
                                                <img src="../assets/images/icons/facebook.svg" />
                                            </div>
                                            <div className="social-writing">
                                                <h3>Log In with Facebook</h3>
                                            </div>
                                        </div>
                                        <div
                                            onClick={this.props.authenticateWithGoogle}
                                            className="social-button google">
                                            <div className="social-icon">
                                                <img src="../assets/images/icons/google.svg" />
                                            </div>
                                            <div className="social-writing">
                                                <h3>Log In with Google</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="separator"><span>or</span></h2>
                                <div className="top-form">
                                    <ul>
                                        <li id="email-landing">
                                            <input
                                                type="email"
                                                id="register-email"
                                                style={this.state.errorType.email ? errorStyle : null}
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
                                                style={this.state.errorType.password ? errorStyle : null}
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
                                                style={this.state.errorType.confirmPassword ? errorStyle : null}
                                                placeholder="Confirm Password"
                                                required="true"
                                                maxLength="100" />
                                        </li>
                                    </ul>
                                </div>
                                <div className="bottom-form">
                                    <div className="optin">
                                        <span> Creating an account means you&#8217;re okay with Tekuma&#8217;s <a href="">Terms of Use</a>.</span>
                                    </div>
                                    <button
                                        className="signup-button"
                                        type="submit"
                                        onClick={this.saveAndContinue}>
                                        <h3>Sign Up</h3>
                                    </button>
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
                        autoHideDuration={4000} />
                </MuiThemeProvider>
            </div>
        );
    }

/// ----- Functions
    saveAndContinue = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
        this.state.errorType = {};

        var data = {};
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        var confirmPassword = this.refs.confirmPassword.value;

        if(email.length == 0) {
            this.state.errors.push("Please enter an email address");

            let errorType = this.state.errorType;
            errorType.email = true;
            this.setState({
                errorType: errorType
            });
        } else if(!/.+@.+\..+/.test(email)) {
            this.state.errors.push("The email address you supplied is invalid");

            let errorType = this.state.errorType;
            errorType.email = true;
            this.setState({
                errorType: errorType
            });
        }

        if(password.length == 0) {
            this.state.errors.push("Please choose a password");

            let errorType = this.state.errorType;
            errorType.password = true;
            this.setState({
                errorType: errorType
            });

        } else if (password.length < 6) {
            this.state.errors.push("Your password must be at least 6 characters long");

            let errorType = this.state.errorType;
            errorType.password = true;
            this.setState({
                errorType: errorType
            });
        }

        if(confirmPassword.length == 0) {
            this.state.errors.push("Please confirm your password");

            let errorType = this.state.errorType;
            errorType.confirmPassword = true;
            this.setState({
                errorType: errorType
            });
        }

        if(password != confirmPassword) {
            this.state.errors.push("Passwords do not match");

            let errorType = this.state.errorType;
            errorType.password = true;
            errorType.confirmPassword = true;
            this.setState({
                errorType: errorType
            });
        }

        // Rerender the component
        this.forceUpdate();
        this.props.clearErrors();

        if(this.state.errors.length == 0) {
            data.email = email;
            data.password = password;
            this.props.saveRegistration(data);
            this.props.nextStep();
        }

        for(let i = 0; i < this.state.errors.length; i++) {
            setTimeout(() => {
                this.setState({
                    currentError: this.state.errors[i]
                });
            }, 3000 * i);
        }
    }
}
