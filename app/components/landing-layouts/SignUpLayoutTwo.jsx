import React from 'react';
import LoggedOffHeader from '../headers/LoggedOffHeader';
import uuid from 'node-uuid';

export default class SignUpLayoutTwo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errors: nextProps.errors
        });
    }

    render() {
        return (
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
                            {this.state.errors.map(error => {
                                return (
                                    <div
                                        key={uuid.v4()}
                                        className="registration-error page-3">
                                        <h2>{error}</h2>
                                    </div>
                                );
                                })}
                        </div>
                        <form className="signup-form page-3">
                            <fieldset>
                                <ul>
                                    <li>
                                        <input
                                            type="text"
                                            id="register-legalname"
                                            ref="legalname"
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
                                            ref="bio" />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            id="register-location"
                                            ref="location"
                                            placeholder="Location" />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            id="register-portfolio"
                                            ref="portfolio"
                                            placeholder="Portfolio/Website" />
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
        );
    }

    saveAndContinue = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
        var data = {};

        var legalName = this.refs.legalname.value;
        var bio = this.refs.bio.value;
        var location = this.refs.location.value;
        var portfolio = this.refs.portfolio.value;

        if(legalName.length == 0) {
            this.state.errors.push("To make use of Tekuma's services, we require your legal name.");
        }

        if(bio.length == 0) {
            this.state.errors.push("Please enter a bio.");
        }

        if(location.length < 2) {
            this.state.errors.push("Please enter your current city of residence.");
        }

        if(portfolio.length == 0) {
            this.state.errors.push("Please specify a portfolio or website URL.");
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
    }
}
