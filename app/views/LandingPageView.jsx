'use strict';
import LandingPageLayout from '../components/landing-layouts/LandingPageLayout';
import SignUpLayoutOne     from '../components/landing-layouts/SignUpLayoutOne';
import SignUpLayoutTwo     from '../components/landing-layouts/SignUpLayoutTwo';
import {Popover} from 'react-bootstrap';
import React             from 'react';


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


    ////  --------   #Methods ----------------------------

    landingPageLayout = () => {
        return(
          <div>
              <LandingPageLayout
                  popoverIsOpen={this.state.popoverIsOpen}
                  togglePopover={this.togglePopover}
                  saveValues = {this.props.saveValues}
                  nextStep   = {this.nextStep}
                  authenticateWithGoogle = {this.props.authenticateWithGoogle}
                />
                <Popover
                    className="login-popover"
                    style={{opacity: this.props.popoverIsOpen ? 1 : 0 }}
                    placement="bottom"
                    title="Have an account?">
                    <ul>
                        <li>
                            <input
                                type="email"
                                id="register-email"
                                ref="email"
                                placeholder="Email"
                                required="true"
                                maxlength="100" />
                        </li>
                        <li>
                            <input
                                type="password"
                                id="register-password"
                                ref="password"
                                placeholder="Password"
                                required="true"
                                maxlength="100"
                                autocomplete="off" />
                        </li>
                        <li
                            className="solo-links left"
                            onClick={this.props.nextStep}>
                            <h3>Forgot your Password?</h3>
                        </li>
                        <button
                            className="login-button left"
                            type="submit"
                            onClick={this.saveAndContinue}>
                            <h3>Login</h3>
                        </button>
                    </ul>
                </Popover>
          </div>
        );
    }

    signUpLayoutOne = () => {
        return(
          <div>
            <SignUpLayoutOne
                popoverIsOpen={this.state.popoverIsOpen}
                togglePopover={this.togglePopover}
                saveValues = {this.props.saveValues}
                nextStep   = {this.nextStep}
              />
              <Popover
                  className="login-popover"
                  style={{opacity: this.props.popoverIsOpen ? 1 : 0 }}
                  placement="bottom"
                  title="Have an account?">
                  <ul>
                      <li>
                          <input
                              type="email"
                              id="register-email"
                              ref="email"
                              placeholder="Email"
                              required="true"
                              maxlength="100" />
                      </li>
                      <li>
                          <input
                              type="password"
                              id="register-password"
                              ref="password"
                              placeholder="Password"
                              required="true"
                              maxlength="100"
                              autocomplete="off" />
                      </li>
                      <li
                          className="solo-links left"
                          onClick={this.props.nextStep}>
                          <h3>Forgot your Password?</h3>
                      </li>
                      <button
                          className="login-button left"
                          type="submit"
                          onClick={this.saveAndContinue}>
                          <h3>Login</h3>
                      </button>
                  </ul>
              </Popover>
          </div>
        );
    }

    signUpLayoutTwo = () => {
        return(
          <div>
            <SignUpLayoutTwo
                popoverIsOpen={this.state.popoverIsOpen}
                togglePopover={this.togglePopover}
                saveValues          = {this.props.saveValues}
                submitRegistration  = {this.props.submitRegistration}
              />
              <Popover
                  className="login-popover"
                  style={{opacity: this.props.popoverIsOpen ? 1 : 0 }}
                  placement="bottom"
                  title="Have an account?">
                  <ul>
                      <li>
                          <input
                              type="email"
                              id="register-email"
                              ref="email"
                              placeholder="Email"
                              required="true"
                              maxlength="100" />
                      </li>
                      <li>
                          <input
                              type="password"
                              id="register-password"
                              ref="password"
                              placeholder="Password"
                              required="true"
                              maxlength="100"
                              autocomplete="off" />
                      </li>
                      <li
                          className="solo-links left"
                          onClick={this.props.nextStep}>
                          <h3>Forgot your Password?</h3>
                      </li>
                      <button
                          className="login-button left"
                          type="submit"
                          onClick={this.saveAndContinue}>
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

    togglePopover = () => {
        this.setState({
            popoverIsOpen: !this.state.popoverIsOpen
        });

        console.log("toggled popover");
    }

    onLogin = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
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

        if(password.length < 7) {
            this.state.errors.push("Your password is too short.");
        }

        if(this.state.errors.length == 0) {
            data.email = email;
            data.password = password;
            this.props.login(data);
        }
    }
}
