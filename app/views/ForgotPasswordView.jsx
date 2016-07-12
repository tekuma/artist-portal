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
