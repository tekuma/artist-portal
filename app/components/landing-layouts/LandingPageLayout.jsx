import React from 'react';
import LoggedOffHeader from '../headers/LoggedOffHeader';
import Link from 'react-router';

export default class LandingPageLayout extends React.Component {
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
                                <div className="social-button google">
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
                                    <li>
                                        <input
                                            type="text"
                                            id="register-username"
                                            name="username"
                                            placeholder="Username"
                                            required=""
                                            data-msg-required="Please choose a username."
                                            data-rule-minlength="4"
                                            data-msg-minlength="Your username is too short."
                                            maxlength="50"
                                            autocapitalize="off"
                                            autocomplete="off"
                                            autocorrect="off" />
                                    </li>
                                    <li>
                                        <input
                                            type="password"
                                            id="register-password"
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
                                            type="email"
                                            id="register-email"
                                            name="email"
                                            value=""
                                            placeholder="Email"
                                            required=""
                                            data-msg-required="Please enter your email."
                                            data-msg-email="The email address you supplied is invalid."
                                            maxlength="100" />
                                    </li>
                                    <li>
                                        <input
                                            type="password"
                                            id="register-confirm-password"
                                            name="confirm-password"
                                            placeholder="Confirm Password"
                                            required=""
                                            data-msg-required="Please confirm your password."
                                            data-rule-equalto="#register-password"
                                            data-msg-equalto="Password doesn't match."
                                            maxlength="100" />
                                    </li>
                                </ul>
                            </div>
                            <div className="bottom-form">
                                <div className="optin">
                                    <input
                                        type="checkbox" />
                                    <span> I agree to Tekuma's <a src="/">Terms of Service</a>.</span>
                                </div>
                                <button className="signup-button" type="submit">
                                    <h3>Sign Up</h3>
                                </button>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        );
    }
}
