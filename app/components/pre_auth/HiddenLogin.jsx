// Libs
import React          from 'react';
import firebase       from 'firebase';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class HiddenLogin extends React.Component {
    state = {
        errors          : [],    // Used to store Auth errors from Firebase and Registration errors
        errorType       : {},                   // Used to keep track of the type of error encountered to highlight relevant input field
        currentError    : ""                    // Used to store the current error to be displayed in the snackbar
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----HiddenLogin");
    }

    render() {

        return (
            <div>
                <div
                    className="hidden-login">
                    <div className="login-header">
                        <h2>Login</h2>
                    </div>
                    <ul>
                        <li>
                            <input
                                type="email"
                                id="register-email"
                                ref="email"
                                placeholder="Email"
                                required="true"
                                maxLength="100" />
                        </li>
                        <li>
                            <input
                                type        ="password"
                                id          ="register-password"
                                ref         ="password"
                                placeholder ="Password"
                                required    ="true"
                                maxLength   ="100"
                                autoComplete="off"
                                onKeyPress  ={this.checkEnter} />
                        </li>
                        <li
                            className="solo-links center"
                            onClick={this.props.toggleForgotPassword}>
                            <h3>Forgot your Password?</h3>
                        </li>
                        <button
                            className="login-button"
                            type="submit"
                            onClick={this.onLogin}>
                            <h3>Login</h3>
                        </button>
                    </ul>
                </div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="registration-error"
                        open={this.state.currentError.length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000} />
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++HiddenLogin");
        this.setState({
            errors: [],
            currentError: ""
        });
    }

    componentWillReceiveProps(nextProps) {
        // pass
    }

// ============= Methods ===============

    checkEnter = (e) => {
        let email = this.refs.email.value;
        let password = this.refs.password.value;

        // The user hit *enter*, let's finish up.
        if(e.key === 'Enter' && email && password) {
            this.onLogin(e);
        }
    };

    /**
     * Used to log in a user
     * @param  {[HTML element]} e [The element that has been pressed]
     */
    onLogin = (e) => {
        e.preventDefault();

        this.state.errors = [];
        this.props.clearErrors();
        this.state.errorType = {};
        this.state.currentError = "";

        // Clear errors from any previous form submission
        let data = {};
        let email = this.refs.email.value;
        let password = this.refs.password.value;

        if(email.length == 0) {
            this.state.errors.push("Please enter an email address.");
        } else if(!/.+@.+\..+/.test(email)) {
            this.state.errors.push("The email address you supplied is invalid.");
        }

        if(password.length == 0) {
            this.state.errors.push("Please enter your password.");
        }

        if(this.state.errors.length == 0) {
            data.email = email;
            data.password = password;
            this.props.authenticateWithPassword(data);
        }

        this.forceUpdate();

        for(let i = 0; i < this.state.errors.length; i++) {
            setTimeout(() => {
                this.setState({
                    currentError: this.state.errors[i]
                });
            }, 3000 * i);

            setTimeout(() => {
                this.setState({
                    currentError: "",
                    errors: []
                });
            }, 3000 * i + 4000);
        }
    }

}
