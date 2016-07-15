import LandingPage   from '../components/pre_auth/LandingPage';
import SignUpOne     from '../components/pre_auth/SignUpOne';
import SignUpTwo     from '../components/pre_auth/SignUpTwo';
import {Popover} from 'react-bootstrap';
import React               from 'react';
import uuid from 'node-uuid';


/**
 * TODO
 */
export default class PreAuth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step       : 1,
            popoverIsOpen: false,
            errors: this.props.errors,
            };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errors: nextProps.errors
        });
    }

    render() {
        switch(this.state.step) {
            case 1:
                return this.landingPageLayout();
            case 2:
                return this.signUpLayoutOne();
            case 3:
                return this.signUpLayoutTwo();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return true;
    }


    ////  --------   #Methods ----------------------------

    /**
     * [description]
     * @return {[type]} [description]
     */
    landingPageLayout = () => {
        return(
          <div>
              <LandingPage
                  popoverIsOpen={this.state.popoverIsOpen}
                  togglePopover={this.togglePopover}
                  errors={this.props.errors}
                  clearErrors={this.props.clearErrors}
                  saveRegPrivate = {this.props.saveRegPrivate}
                  nextStep   = {this.nextStep}
                  authenticateWithGoogle = {this.props.authenticateWithGoogle}
                  authenticateWithFB    ={this.props.authenticateWithFB}
                />
                <Popover
                    className="login-popover"
                    style={{display: this.state.popoverIsOpen ? "block" : "none" }}
                    placement="bottom"
                    key = {uuid.v4()}
                    title="Have an account?">
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
                                type="password"
                                id="register-password"
                                ref="password"
                                placeholder="Password"
                                required="true"
                                maxLength="100"
                                autoComplete="off" />
                        </li>
                        {this.state.errors.map(error => {
                                return (
                                    <div
                                        key={uuid.v4()}
                                        className="login-error">
                                        <h2>{error}</h2>
                                    </div>
                                );
                            })}
                        <li
                            className="solo-links left"
                            onClick={this.props.toggleForgotPassword}>
                            <h3>Forgot your Password?</h3>
                        </li>
                        <button
                            className="login-button left"
                            type="submit"
                            onClick={this.onLogin}>
                            <h3>Login</h3>
                        </button>
                    </ul>
                </Popover>
          </div>
        );
    }

    /**
     * [description]
     * @return {[type]} [description]
     */
    signUpLayoutOne = () => {
        return(
          <div>
            <SignUpOne
                popoverIsOpen={this.state.popoverIsOpen}
                togglePopover={this.togglePopover}
                errors={this.props.errors}
                clearErrors={this.props.clearErrors}
                saveRegPublic = {this.props.saveRegPublic}
                nextStep   = {this.nextStep}
                returnToLandingPage={this.returnToLandingPage}
              />
              <Popover
                  className="login-popover"
                  style={{display: this.state.popoverIsOpen ? "block" : "none" }}
                  placement="bottom"
                  key = {uuid.v4()}
                  title="Have an account?">
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
                              type="password"
                              id="register-password"
                              ref="password"
                              placeholder="Password"
                              required="true"
                              maxLength="100"
                              autoComplete="off" />
                      </li>
                      {this.state.errors.map(error => {
                              return (
                                  <div
                                      key = {uuid.v4()}
                                      className="login-error">
                                      <h2>{error}</h2>
                                  </div>
                              );
                          })}
                      <li
                          className="solo-links left"
                          onClick={this.props.toggleForgotPassword}>
                          <h3>Forgot your Password?</h3>
                      </li>
                      <button
                          className="login-button left"
                          type="submit"
                          onClick={this.onLogin}>
                          <h3>Login</h3>
                      </button>
                  </ul>
              </Popover>
          </div>
        );
    }


    /**
     * [description]
     * @return {[type]} [description]
     */
    signUpLayoutTwo = () => {
        return(
          <div>
            <SignUpTwo
                popoverIsOpen={this.state.popoverIsOpen}
                togglePopover={this.togglePopover}
                errors={this.props.errors}
                clearErrors={this.props.clearErrors}
                saveRegPublic = {this.props.saveRegPublic}
                saveRegPrivate = {this.props.saveRegPrivate}
                submitRegistration  = {this.props.submitRegistration}
                returnToLandingPage={this.returnToLandingPage}
              />
              <Popover
                  className="login-popover"
                  style={{display: this.state.popoverIsOpen ? "block" : "none"}}
                  placement="bottom"
                  key = {uuid.v4()}
                  title="Have an account?">
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
                              type="password"
                              id="register-password"
                              ref="password"
                              placeholder="Password"
                              required="true"
                              maxLength="100"
                              autoComplete="off" />
                      </li>
                      {this.state.errors.map(error => {
                              return (
                                  <div
                                      className="login-error">
                                      <h2>{error}</h2>
                                  </div>
                              );
                          })}
                      <li
                          className="solo-links left"
                          onClick={this.props.toggleForgotPassword}>
                          <h3>Forgot your Password?</h3>
                      </li>
                      <button
                          className="login-button left"
                          type="submit"
                          onClick={this.onLogin}>
                          <h3>Login</h3>
                      </button>
                  </ul>
              </Popover>
          </div>
        );
    }

    /**
     * [description]
     * @return {[type]} [description]
     */
    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    /**
     * [description]
     * @return {[type]} [description]
     */
    togglePopover = () => {
        this.setState({
            popoverIsOpen: !this.state.popoverIsOpen
        });
    }

    /**
     * [TODO]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    onLogin = (e) => {
        e.preventDefault();

        this.state.errors = [];

        // Clear errors from any previous form submission
        var data = {};
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        if(email.length == 0) {
            this.state.errors.push("Please enter an email address.");
        } else if(!/.+@.+\..+/.test(email)) {
            this.state.errors.push("The email address you supplied is invalid.");
        }

        if(password.length == 0) {
            this.state.errors.push("Please enter your password.");
        }

        if(this.props.errors.length == 0) {
            data.email = email;
            data.password = password;
            this.props.authenticateWithPassword(data);
        }

        this.forceUpdate();
        this.props.clearErrors();
    }

    returnToLandingPage = () => {
        this.setState({step: 1});
        this.props.clearRegistration();
        console.log("Returned to Landing Page");
    }
}
