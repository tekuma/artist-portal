// Libs
import React           from 'react';
import firebase        from 'firebase';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Files
import PreAuthHeader   from '../headers/PreAuthHeader';
import HiddenLogin     from './HiddenLogin.jsx'

/**
 * TODO
 */
export default class ForgotPassword extends React.Component {
    state = {
        errors          : [],    // Used to store Auth errors from Firebase and Registration errors
        errorType       : {},    // Used to keep track of the type of error encountered to highlight relevant input field
        currentError    : "",     // Used to store the current error to be displayed in the snackbar
        loginIsOpen     : false                   // Used to track whether Hidden login is open
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('-----ForgotPassword');
    }

    render() {
        let errorStyle = {
            border: '2px solid #ec167c'
        };

        return (
            <div>
                <div className={this.state.loginIsOpen ? "pre-auth-main-wrapper open" : "pre-auth-main-wrapper"}>
                    <div className="main-wrapper login">
                        <PreAuthHeader
                            returnToLandingPage={this.props.returnToLandingPage}
                            toggleLogin        ={this.toggleLogin} />
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
                                                    style={this.state.errorType.email ? errorStyle : null}
                                                    placeholder="Email"
                                                    required="true"
                                                    maxLength="100" />
                                            </li>
                                            <button
                                                className="signup-button forgot"
                                                type="submit"
                                                onClick={this.sendResetEmail}>
                                                <h3>Reset</h3>
                                            </button>
                                        </ul>
                                    </div>
                                </form>
                            </article>
                        </div>
                    </div>
                </div>
                <HiddenLogin
                    authenticateWithPassword={this.props.authenticateWithPassword}
                    toggleForgotPassword   ={this.toggleLogin} />
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

    componentWillMount() {
        console.log('+++++ForgotPassword');
    }

// ============= Methods ===============

    /**
     * Toggles this.state.loginIsOpen to open or close the hidden login
     */
    toggleLogin = () => {
        this.setState({
            loginIsOpen: !this.state.loginIsOpen
        });
    }

    /**
     * Sends an email to the user with instructions on how to reset their
     * password authentication
     * @param  {String} emailAddress - email address to send reset email to
     * @throws auth/invalid-email or  auth/user-not-found error
     */
    sendResetEmail = (e) =>{
        e.preventDefault();

        console.log("Entered Reset Email", this.refs.email.value);
        let emailAddress = this.refs.email.value;

        if(emailAddress.length == 0) {
            this.state.errors.push("Please enter an email address");

            let errorType = this.state.errorType;
            errorType.email = true;
            this.setState({
                errorType: errorType
            });

        } else if(!/.+@.+\..+/.test(emailAddress)) {
            this.state.errors.push("The email address you supplied is invalid");

            let errorType = this.state.errorType;
            errorType.email = true;
            this.setState({
                errorType: errorType
            });
        }

        console.log("Number of errors: ", this.state.errors);

        if(this.state.errors.length == 0) {
            console.log("Entered if statement");
            firebase.auth().sendPasswordResetEmail(emailAddress).then( ()=>{
                console.log("Password reset Email Sent to:", emailAddress);
                this.state.errors.push(`Password reset Email Sent to: ${emailAddress}`);

                for(let i = 0; i < this.state.errors.length; i++) {
                    setTimeout(() => {
                        this.setState({
                            currentError: this.state.errors[i]
                        });
                    }, 3000 * i);
                }
            }).catch( (error)=>{
                console.error(error);
                //error is either: auth/invalid-email or  auth/user-not-found
                this.state.errors.push(error.message);
            });
        }


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
