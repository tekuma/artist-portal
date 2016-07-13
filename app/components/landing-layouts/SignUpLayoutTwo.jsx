// Libs
import React            from 'react';
import uuid             from 'node-uuid';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Files
import LoggedOffHeader  from '../headers/LoggedOffHeader';

export default class SignUpLayoutTwo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors,
            errorType: {},
            currentError: ""
        };
    }

    render() {
        var errorStyle = {
            border: '1px solid #ec167c'
        };

        return (
            <div>
                <div className="main-wrapper">
                    <LoggedOffHeader
                        togglePopover={this.props.togglePopover}
                        returnToLandingPage={this.props.returnToLandingPage} />
                    <div className="layout-centered">
                        <article className="signup-wrapper">
                            <div className="signup-heading-wrapper pink">
                                <h3>SIGN UP</h3>
                            </div>
                            <div className="signup-heading-message">
                                <h3>We want to know more about you.</h3>
                            </div>
                            <form className="signup-form page-3">
                                <fieldset>
                                    <ul>
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

    saveAndContinue = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
        this.state.errorType = {};

        var data = {};
        var legalName = this.refs.legalname.value;
        var bio = this.refs.bio.value;
        var location = this.refs.location.value;
        var portfolio = this.refs.portfolio.value;

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
            data.legal_name = legalName;
            data.bio = bio;
            data.location = location;
            data.portfolio = portfolio;
            this.props.saveRegistration(data);
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
