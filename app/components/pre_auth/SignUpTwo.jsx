// Libs
import React            from 'react';
import uuid             from 'node-uuid';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * TODO
 */
export default class SignUpTwo extends React.Component {
    state = {
        errors          : [],                   // Used to store Auth errors from Firebase and Registration errors
        errorType       : {},                   // Used to keep track of the type of error encountered to highlight relevant input field
        currentError    : ""                    // Used to store the current error to be displayed in the snackbar
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('-----SignUpTwo');
    }

    render() {
        let errorStyle = {
            border: '1px solid #ec167c'
        };

        return (
            <div>
                <div className="main-wrapper login">
                    <div className="login-layout">
                        <article className="signup-wrapper">
                            <div className="signup-heading-wrapper pink">
                                <h3>SIGN UP</h3>
                            </div>
                            <div className="signup-heading-message">
                                <h3>We want to know more about you.</h3>
                            </div>
                            <form className="signup-form page-3">
                                <fieldset>
                                    <ul className="signup-form-two">
                                        <li>
                                            <input
                                                type="text"
                                                id="register-legalname"
                                                ref="legalname"
                                                style={this.state.errorType.name ? errorStyle : null}
                                                placeholder="Legal Name"
                                                required="true"
                                                maxLength="50"
                                                autoCapitalize="off"
                                                autoComplete="off"
                                                autoCorrect="off" />
                                        </li>
                                        <li>
                                            <textarea
                                                className="bio"
                                                placeholder="Bio"
                                                ref="bio"
                                                style={this.state.errorType.bio ? errorStyle : null} />
                                        </li>
                                        <li>
                                            <input
                                                type="text"
                                                id="register-location"
                                                ref="location"
                                                placeholder="Location"
                                                style={this.state.errorType.location ? errorStyle : null} />
                                        </li>
                                        <li>
                                            <input
                                                type="text"
                                                id="register-portfolio"
                                                ref="portfolio"
                                                placeholder="Portfolio/Website"
                                                style={this.state.errorType.portfolio ? errorStyle : null} />
                                        </li>

                                        <button
                                            className="signup-button center"
                                            type="submit"
                                            onClick={this.saveAndContinue}>
                                            <h3>Done</h3>
                                        </button>
                                        <li
                                            className="solo-links center"
                                            onClick={this.props.submitRegistration}>
                                            <h3>Skip</h3>
                                        </li>
                                    </ul>
                                </fieldset>
                            </form>
                        </article>
                    </div>
                </div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="registration-error"
                        open={this.state.errors.length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000}/>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log('+++++SignUpTwo');
    }

    componentWillReceiveProps(nextProps) {
        console.log("Errors willReceive, SignUpTwo: ", nextProps.errors);
        this.setState({
            errors: this.state.errors.concat(nextProps.errors),
            currentError: nextProps.errors[0]
        });
    }

// ============= Methods ===============

    saveAndContinue = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
        this.state.errorType = {};

        let publicData = {};
        let privateData = {};
        let legalName = this.refs.legalname.value;
        let bio = this.refs.bio.value;
        let location = this.refs.location.value;
        let portfolio = this.refs.portfolio.value;

        if(legalName.length == 0) {
            this.state.errors.push("To make use of Tekuma's services, we require your legal name.");

            let errorType = this.state.errorType;
            errorType.name = true;
            this.setState({
                errorType: errorType
            });
        }

        if(bio.length == 0) {
            this.state.errors.push("Please enter a bio.");

            let errorType = this.state.errorType;
            errorType.bio = true;
            this.setState({
                errorType: errorType
            });
        }

        if(location.length < 2) {
            this.state.errors.push("Please enter your current city of residence.");

            let errorType = this.state.errorType;
            errorType.location = true;
            this.setState({
                errorType: errorType
            });
        }

        if(portfolio.length == 0) {
            this.state.errors.push("Please specify a portfolio or website URL.");

            let errorType = this.state.errorType;
            errorType.portfolio = true;
            this.setState({
                errorType: errorType
            });
        }

        // Rerender the component
        this.forceUpdate();
        this.props.clearErrors();

        if(this.state.errors.length == 0) {
            privateData.legal_name = legalName;
            publicData.bio = bio;
            publicData.location = location;
            publicData.portfolio = portfolio;
            this.props.saveRegPublic(publicData);
            this.props.saveRegPrivate(privateData);
            this.props.submitRegistration();
        }

        for(let i = 0; i < this.state.errors.length; i++) {
            setTimeout(() => {
                this.setState({
                    currentError: this.state.errors[i]
                });
                console.log(this.state.errors[i]);
            }, 3000 * i);
        }
    }
}
