// Libs
import React         from 'react';

// Files
import PreAuthHeader from '../headers/PreAuthHeader';

/**
 * TODO
 */
export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('-----ResetPassword');
    }

    render() {
        return (
            <div className="main-wrapper">
                <PreAuthHeader />
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
                                            type="text"
                                            id="reset-code"
                                            ref="code"
                                            placeholder="Enter Code"
                                            required=""
                                            autoCapitalize="off"
                                            autoComplete="off"
                                            autoCorrect="off" />
                                    </li>
                                    <li>
                                        <input
                                            type="password"
                                            id="register-password"
                                            ref="password"
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
                                            placeholder="Confirm Password"
                                            required="true"
                                            maxLength="100" />
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

    componentDidMount() {
        console.log('+++++ResetPassword');
    }
}
