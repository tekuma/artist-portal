// Libs
import React           from 'react';
import firebase        from 'firebase';

// Files
import PreAuthHeader from '../components/headers/PreAuthHeader';


export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="main-wrapper">
                <PreAuthHeader />
                <div className="layout-centered">
                    <article className="signup-wrapper">
                        <div className="forgot-heading-wrapper pink">
                            <h3>FORGOT PASSWORD</h3>
                        </div>
                        <form className="signup-form">
                            <div className="top-form">
                                <ul>
                                    <li id="email-landing">
                                        <input
                                            type="email"
                                            id="email"
                                            ref="email"
                                            placeholder="Email"
                                            required="true"
                                            maxLength="100" />
                                    </li>
                                    <button
                                        className="signup-button"
                                        type="submit"
                                        onClick={this.sendResetEmail}>
                                        <h3>Reset</h3>
                                    </button>
                                </ul>
                            </div>
                            <div className="bottom-form">
                                <ul>
                                    <li id="email-landing">
                                        <input
                                            type="text"
                                            id="reset-code"
                                            ref="code"
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
                                            id="password"
                                            ref="password"
                                            placeholder="Password"
                                            required="true"
                                            maxLength="100"
                                            autoComplete="off" />
                                    </li>

                                    <li>
                                        <input
                                            type="password"
                                            id="confirm-password"
                                            ref="confirmPassword"
                                            placeholder="Confirm Password"
                                            required="true"
                                            maxLength="100" />
                                    </li>
                                </ul>
                                <button
                                    className="signup-button"
                                    type="submit"
                                    onClick={this.confirmPasswordReset}>
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
    sendResetEmail = () =>{
        let emailAddress = this.refs.email.value;

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
    confirmPasswordReset = () => {

        let code = this.refs.code.value;
        let newPassword = this.refs.password.value;



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
