import React from 'react';
import LoggedOffHeader from '../components/headers/LoggedOffHeader';

export default class ResetPasswordView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="main-wrapper">
                <LoggedOffHeader />
                <div className="layout-centered">
                    <article className="login-wrapper">
                        <div className="forgot-heading-wrapper pink">
                            <h3>RESET PASSWORD</h3>
                            <img src="../assets/images/tekuma-infinity.svg" />
                        </div>
                        <form className="login-form">
                            <fieldset>
                                <ul>
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
                                    <button className="signup-button center" type="submit">
                                        <h3>Update</h3>
                                    </button>
                                </ul>
                            </fieldset>
                        </form>
                    </article>
                </div>
            </div>
        );
    }
}
