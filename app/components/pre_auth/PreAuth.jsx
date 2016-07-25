// Libs
import React         from 'react';
import uuid          from 'node-uuid';

// Files
import LandingPage   from './LandingPage';
import SignUpOne     from './SignUpOne';
import SignUpTwo     from './SignUpTwo';
import PreAuthHeader from '../headers/PreAuthHeader';
import HiddenLogin   from './HiddenLogin.jsx'

/**
 * TODO
 */
export default class PreAuth extends React.Component {
    state = {
        step          : 1,                      // Used to keep track of which component in the pre-auth flow should be shown
        errors        : [],                     // Used to store errors from App.jsx
        loginIsOpen   : false                   // Used to track whether Hidden login is open
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('-----PreAuth');
    }

    render() {
        switch(this.state.step) {
            case 1:
                return this.landingPage();
            case 2:
                return this.signUpOne();
            case 3:
                return this.signUpTwo();
        }
    }

    componentDidMount() {
        console.log('+++++PreAuth');
    }

    componentWillReceiveProps(nextProps) {
        console.log("Errors from App: ", nextProps.errors);
        this.setState({
            errors: this.state.errors.concat(nextProps.errors)
        });
    }


// ============= Flow Control ===============

    /**
     * [Displays the Landing Page]
     * @return {HTML} [landing page view]
     */
    landingPage = () => {
        return(
          <div>
              <div className={this.state.loginIsOpen ? "pre-auth-main-wrapper open" : "pre-auth-main-wrapper"}>
                  <PreAuthHeader
                      returnToLandingPage   ={this.returnToLandingPage}
                      toggleLogin           ={this.toggleLogin} />
                  <LandingPage
                      loginIsOpen               ={this.state.loginIsOpen}
                      errors                    ={this.state.errors}
                      clearErrors               ={this.props.clearErrors}
                      saveRegPrivate            = {this.props.saveRegPrivate}
                      nextStep                  = {this.nextStep}
                      authenticateWithGoogle    = {this.props.authenticateWithGoogle}
                      authenticateWithFB        ={this.props.authenticateWithFB} />
              </div>
              <HiddenLogin
                  authenticateWithPassword  ={this.props.authenticateWithPassword}
                  toggleForgotPassword      ={this.props.toggleForgotPassword}
                  errors                    ={this.state.errors}
                  clearErrors               ={this.props.clearErrors} />
          </div>
        );
    }

    /**
     * [Displays the first Sign Up Page]
     * @return {HTML} [Sign Up Page One]
     */
    signUpOne = () => {
        return(
          <div>
              <div className={this.state.loginIsOpen ? "pre-auth-main-wrapper open" : "pre-auth-main-wrapper"}>
                  <PreAuthHeader
                      returnToLandingPage   ={this.returnToLandingPage}
                      toggleLogin           ={this.toggleLogin} />
                  <SignUpOne
                      loginIsOpen           ={this.state.loginIsOpen}
                      errors                ={this.state.errors}
                      clearErrors           ={this.props.clearErrors}
                      saveRegPrivate        ={this.props.saveRegPrivate}
                      saveRegPublic         ={this.props.saveRegPublic}
                      nextStep              ={this.nextStep}
                      returnToLandingPage   ={this.returnToLandingPage} />
              </div>
              <HiddenLogin
                  authenticateWithPassword  ={this.props.authenticateWithPassword}
                  toggleForgotPassword      ={this.props.toggleForgotPassword}
                  errors                    ={this.state.errors}
                  clearErrors               ={this.props.clearErrors} />
          </div>
        );
    }

    /**
     * [Displays the second Sign Up Page]
     * @return {HTML} [Sign Up Page Two]
     */
    signUpTwo = () => {
        return(
          <div>
              <div className={this.state.loginIsOpen ? "pre-auth-main-wrapper open" : "pre-auth-main-wrapper"}>
                  <PreAuthHeader
                      returnToLandingPage   ={this.returnToLandingPage}
                      toggleLogin           ={this.toggleLogin} />
                  <SignUpTwo
                      loginIsOpen           ={this.state.loginIsOpen}
                      errors                ={this.state.errors}
                      clearErrors           ={this.props.clearErrors}
                      saveRegPublic         = {this.props.saveRegPublic}
                      saveRegPrivate        = {this.props.saveRegPrivate}
                      submitRegistration    = {this.props.submitRegistration}
                      returnToLandingPage   ={this.returnToLandingPage} />
              </div>
              <HiddenLogin
                  authenticateWithPassword  ={this.props.authenticateWithPassword}
                  toggleForgotPassword      ={this.props.toggleForgotPassword}
                  errors                    ={this.state.errors}
                  clearErrors               ={this.props.clearErrors} />
          </div>
        );
    }

// ============= Methods ===============

    /**
     * Increments this.state.step to chnage the PreAuth View
     */
    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    /**
     * Toggles this.state.loginIsOpen to open or close the hidden login
     */
    toggleLogin = () => {
        this.setState({
            loginIsOpen: !this.state.loginIsOpen
        });
    }

    returnToLandingPage = () => {
        this.setState({step: 1});
        this.props.clearRegistration();
    }
}
