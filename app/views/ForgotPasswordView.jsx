// Libs
import React           from 'react';
import firebase        from 'firebase';

// Files
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
                    <article class="signup-wrapper">
                        <div class="forgot-heading-wrapper pink">
                            <h3>FORGOT PASSWORD</h3>
                        </div>
                        <form class="signup-form">
                            <div class="top-form">
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
                                    <button
                                        class="signup-button"
                                        type="submit"
                                        onClick={this.saveAndContinue}>
                                        <h3>Reset</h3>
                                    </button>
                                </ul>
                            </div>
                            <div class="bottom-form">
                                <ul>
                                    <li id="email-landing">
                                        <input
                                            type="text"
                                            id="register-displayname"
                                            ref="displayname"
                                            style={this.state.errorType.name ? errorStyle : null}
                                            placeholder="Reset Code"
                                            required=""
                                            maxLength="50"
                                            autoCapitalize="off"
                                            autoComplete="off"
                                            autoCorrect="off" />
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
                                <button
                                    class="signup-button"
                                    type="submit"
                                    onClick={this.saveAndContinue}>
                                    <h3>Update</h3>
                                </button>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        );
    }

    /// --------------- #METHODS -------------

    /**
     * Sends an email to the user with instructions on how to reset their
     * password authentication
     * @param  {String} emailAddress - email address to send reset email to
     * @throws auth/invalid-email or  auth/user-not-found error
     */
    sendResetEmail = (emailAddress) =>{
        firebase.auth().sendPasswordResetEmail(emailAddress).then( ()=>{
            console.log("Password reset Email Sent to:", emailAddress);
            //TODO: Display this message in a snackbar popup in UX
        }).catch( (error)=>{
            console.error(error);
            //error is either: auth/invalid-email or  auth/user-not-found
            //TODO Display these errors to UX
        });
    }

    /**
     * after the user requested a password reset email, this method completes
     * the reset and sets the new password.
     * NOTE: User must have verified their email address to be able to reset
     *       a password.
     * @param  {String} code  - ActionCode sent to the user via email
     * @param  {String} newPassword - new desired password
     * @throws auth/expired-action-code , auth/invalid-action-code
     *         auth/user-disabled, auth/user-not-found, auth/weak-password
     */
    confirmPasswordReset = (code, newPassword) => {
        firebase.auth().verifyPasswordResetCode(code).then((userEmail)=>{
            firebase.auth().confirmPasswordReset(code, newPassword).then(()=>{
                console.log("Resetting Password");
                //Code accepted, password is reset, now log the user
                // in with new credentials
                firebase.auth().signInWithEmailAndPassword(userEmail, newPassword)
                .then( (thisUser) => {
                    console.log(">Password Auth successful for:", thisUser.displayName);
                }).catch( (error) => {
                    console.error(error);
                });
            }).catch((error)=>{
                console.error(error);
                //TODO Dispaly all possible @throws to UX
            });
        });

    }


}
