'use strict';
import LandingPageLayout from '../components/landing-layouts/LandingPageLayout';
import SignUpLayout1     from '../components/landing-layouts/SignUpLayout1';
import SignUpLayout2     from '../components/landing-layouts/SignUpLayout2';

import React             from 'react';
import {Popover}         from 'react-bootstrap';




/**
 * TODO
 */
export default class LandingPageView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step       : 1,
            popoverIsOpen: false
            };
    }


    render() {
        switch(this.state.step) {
            case 1:
                return(
                  <div>
                    <LandingPageLayout
                        authenticateWithGoogle ={this.props.authenticateWithGoogle}
                        authenticateWithFB     ={this.props.authenticateWithFB}
                        saveValues             ={this.props.saveValues}
                        nextStep               ={this.nextStep}

                      />
                    <Popover
                        title        ="Popover right"
                        placement    ="right"
                        positionLeft ={200}
                        positionTop  ={50}
                    >
                    And here's some <strong>amazing</strong> content. Its very engaging. right?
                    </Popover>
                  </div>
              );
            case 2:
                return(
                  <div>
                    <SignUpLayout1
                      saveValues = {this.props.saveValues}
                      nextStep   = {this.nextStep}
                      />
                  </div>
              );
            case 3:
                return(
                  <div>
                    <SignUpLayout2
                      saveValues          = {this.props.saveValues}
                      submitRegistration  = {this.props.submitRegistration}
                      />
                  </div>
              );
        }
    }


    ////  --------   #Methods ----------------------------


    /**
     * [description]
     * @return {[type]} [description]
     */
    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }


}
