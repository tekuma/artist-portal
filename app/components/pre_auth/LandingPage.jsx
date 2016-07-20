// Libs
import React            from 'react';
import uuid             from 'node-uuid';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * TODO
 */
export default class LandingPage extends React.Component {
    state = {
        errors          : [],    // Used to store Auth errors from Firebase and Registration errors
        errorType       : {},                   // Used to keep track of the type of error encountered to highlight relevant input field
        currentError    : ""                    // Used to store the current error to be displayed in the snackbar
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('-----LandingPage');
    }

    render() {
        let errorStyle = {
            border: '2px solid #ec167c'
        };

        return (
            <div>
                <div className="main-wrapper login">
                    <div className="login-layout">
                        <article className="signup-wrapper">
                            <div className="artist-logo-wrapper">
                              <svg version="1.0" id="Group_copy_8_xA0_Image_1_" x="0px" y="0px" viewBox="0 0 1000 1000" style={{"enableBackground":"new 0 0 1000 1000"}}>
                              <g className="drawing">
                                <g>
                                  <line id="top-3" className="st0" x1="10" y1="10" x2="990" y2="10"/>
                                  <line id="right-3" className="st0" x1="990" y1="10" x2="990" y2="990"/>
                                  <line id="bottom-3" className="st0" x1="990" y1="990" x2="10" y2="990"/>
                                  <line id="left-3" className="st0" x1="10" y1="990" x2="10" y2="10"/>

                                  <g className="inner-3">
                                    <line className="st0" x1="500" y1="500" x2="990" y2="10"/>
                                    <line className="st0" x1="500" y1="500" x2="10" y2="10"/>
                                    <line className="st0" x1="500" y1="500" x2="10" y2="990"/>
                                    <line className="st0" x1="500" y1="500" x2="990" y2="990"/>
                                  </g>
                                    <rect className="smallbox3" x="323" y="323" width="354" height="354"/>
                                </g>
                              </g>
                              </svg>

                            </div>
                            <form className="signup-form page-1">
                                <div className="social-buttons-wrapper">
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
                                        <span> Creating an account means you&#8217;re okay with Tekuma&#8217;s <a href="http://tekuma.io/artist/artist-tous/" target="_blank">Terms of Use</a>.</span>
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

    componentDidMount() {
        console.log('+++++LandingPage');
        this.setState({
            errors: [],
            currentError: ""
        });

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errors: this.state.errors.concat(nextProps.errors),
            currentError: nextProps.errors[0]
        });
    }

// ============= Methods ===============

    saveAndContinue = (e) => {
        e.preventDefault();
        console.log("errors: ", this.state.errors);
        // Clear errors from any previous form submission
        this.state.errors = [];
        this.state.errorType = {};
        this.state.currentError = "";

        let privateData = {};
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;

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
            privateData.email = email;
            privateData.password = password;
            this.props.saveRegPrivate(privateData);
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
