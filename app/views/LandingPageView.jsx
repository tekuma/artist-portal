'use strict';
import LandingPageLayout from '../components/landing-layouts/LandingPageLayout';
import SignUpLayout1     from '../components/landing-layouts/SignUpLayout1';
import SignUpLayout2     from '../components/landing-layouts/SignUpLayout2';
import React             from 'react';



/**
 * TODO
 */
export default class LandingPageView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step       : 1
            };
    }


    render() {
        switch(this.state.step) {
            case 1:
                return <LandingPageLayout
                        saveValues = {this.props.saveValues}
                        nextStep   = {this.nextStep}
                        authenticateWithGoogle = {this.props.authenticateWithGoogle}
                        />
            case 2:
                return <SignUpLayout1
                        saveValues = {this.props.saveValues}
                        nextStep   = {this.nextStep}
                        />
            case 3:
                return <SignUpLayout2
                        saveValues          = {this.props.saveValues}
                        submitRegistration  = {this.props.submitRegistration}
                        />
        }
    }


// ---functions ---


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
