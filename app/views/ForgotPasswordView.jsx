import React from 'react';
import LoggedOffHeader from '../components/headers/LoggedOffHeader';

export default class ForgotPasswordView extends React.Component {
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
                            <h3>FORGOT PASSWORD</h3>
                            <img src="../assets/images/tekuma-infinity.svg" />
                        </div>
                        <form className="login-form">
                            <fieldset>
                                <ul>
                                    <li>
                                        <input
                                            type="email"
                                            id="register-email"
                                            name="email"
                                            placeholder="Email"
                                            required=""
                                            data-msg-required="Please enter your email."
                                            data-msg-email="The email address you supplied is invalid."
                                            maxlength="100" />
                                    </li>
                                    <button className="signup-button center" type="submit">
                                        <h3>Reset</h3>
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
