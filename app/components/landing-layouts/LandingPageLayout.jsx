import React    from 'react';
import LoggedOffHeader from '../headers/LoggedOffHeader';
import Link     from 'react-router';

export default class LandingPageLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };
    }

    render() {
        return (
            <div className="main-wrapper">
                <LoggedOffHeader />
                <div className="layout-centered">
                    <article className="signup-wrapper">
                        <div className="artist-logo-wrapper">
                            <img src="../assets/images/art-illus.svg" />
                            <h3>ARTIST</h3>
                        </div>

                        <form className="signup-form page-1">
                            <div className="social-wrapper">
                                <div className="social-button facebook">
                                    <div className="social-icon">
                                        <img src="../assets/images/icons/facebook.svg" />
                                    </div>
                                    <div className="social-writing">
                                        <h3>Log In with Facebook</h3>
                                    </div>
                                </div>
                                <div onClick={this.props.googleAuth} className="social-button google">
                                    <div className="social-icon">
                                        <img src="../assets/images/icons/google.svg" />
                                    </div>
                                    <div className="social-writing">
                                        <h3>Log In with Google</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="top-form">
                                <ul>
                                    <li id="email-landing">
                                        <input
                                            type="email"
                                            id="register-email"
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
                                </ul>
                                {this.state.errors.map(error => {
                                        return (
                                            <div
                                                className="registration-error">
                                                <h2>{error}</h2>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="bottom-form">
                                <div className="optin">
                                    <input
                                        type="checkbox"
                                        className="reg-radio"
                                        ref="acceptTerms" />
                                    <span> I agree to Tekuma's <a src="/">Terms of Service</a>.</span>
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
        );
    }

/// ----- Functions
    saveAndContinue = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
        var data = {};
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        var confirmPassword = this.refs.confirmPassword.value;
        var termsAccepted = this.refs.acceptTerms.checked;
        console.log(termsAccepted);

        if(email.length == 0) {
            this.state.errors.push("Please enter an email address.");
        }

        if(!/.+@.+\..+/.test(email)) {
            this.state.errors.push("The email address you supplied is invalid.");
        }

        if(password.length == 0) {
            this.state.errors.push("Please choose a password.");
        }

        if(password.length < 5) {
            this.state.errors.push("Your password is too short.");
        }

        if(confirmPassword.length == 0) {
            this.state.errors.push("Please confirm your password.");
        }

        if(password != confirmPassword) {
            this.state.errors.push("Passwords do not match.");
        }

        if(!termsAccepted) {
            this.state.errors.push("Please accept Tekuma's Terms of Service.");
        }

        // Rerender the component
        this.forceUpdate();

        if(this.state.errors.length == 0) {
            data.email = email;
            data.password = password;
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }
}
