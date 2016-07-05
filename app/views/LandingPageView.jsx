'use strict';
import LandingPageLayout from '../components/landing-layouts/LandingPageLayout';
import SignUpLayoutOne     from '../components/landing-layouts/SignUpLayoutOne';
import SignUpLayoutTwo     from '../components/landing-layouts/SignUpLayoutTwo';
import {Popover} from 'react-bootstrap';
import React               from 'react';
import uuid from 'node-uuid';


/**
 * TODO
 */
export default class LandingPageView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step       : 1,
            popoverIsOpen: false,
            errors: []
            };
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
              <LandingPageLayout
                  popoverIsOpen={this.state.popoverIsOpen}
                  togglePopover={this.togglePopover}
                  errors={this.props.errors}
                  saveRegistration = {this.props.saveRegistration}
                  nextStep   = {this.nextStep}
                  authenticateWithGoogle = {this.props.authenticateWithGoogle}
                  authenticateWithFB    ={this.props.authenticateWithFB}
                />
                <Popover
                    className="login-popover"
                    style={{opacity: this.state.popoverIsOpen ? 1 : 0 }}
                    placement="bottom"
                    id = {uuid.v4()}
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
                                        id={uuid.v4()}
                                        className="registration-error">
                                        <h2>{error}</h2>
                                    </div>
                                );
                            })}
                        <li
                            className="solo-links left"
                            onClick={this.props.nextStep}>
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
            <SignUpLayoutOne
                popoverIsOpen={this.state.popoverIsOpen}
                togglePopover={this.togglePopover}
                errors={this.props.errors}
                saveRegistration = {this.props.saveRegistration}
                nextStep   = {this.nextStep}
                returnToLandingPage={this.returnToLandingPage}
              />
              <Popover
                  className="login-popover"
                  style={{opacity: this.state.popoverIsOpen ? 1 : 0 }}
                  placement="bottom"
                  id = {uuid.v4()}
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
                                      className="registration-error">
                                      <h2>{error}</h2>
                                  </div>
                              );
                          })}
                      <li
                          className="solo-links left"
                          onClick={this.props.nextStep}>
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
            <SignUpLayoutTwo
                popoverIsOpen={this.state.popoverIsOpen}
                togglePopover={this.togglePopover}
                errors={this.props.errors}
                saveRegistration          = {this.props.saveRegistration}
                submitRegistration  = {this.props.submitRegistration}
                returnToLandingPage={this.returnToLandingPage}
              />
              <Popover
                  className="login-popover"
                  style={{opacity: this.state.popoverIsOpen ? 1 : 0 }}
                  placement="bottom"
                  id = {uuid.v4()}
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
                                      className="registration-error">
                                      <h2>{error}</h2>
                                  </div>
                              );
                          })}
                      <li
                          className="solo-links left"
                          onClick={this.props.nextStep}>
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
        }

        if(!/.+@.+\..+/.test(email)) {
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
    }

    returnToLandingPage = () => {
        this.setState({step: 1});
        this.props.clearRegistration();
        console.log("Returned to Landing Page");
    }
}
