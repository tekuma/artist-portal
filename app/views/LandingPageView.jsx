import React from 'react';
import LandingPageLayout from '../components/landing-layouts/LandingPageLayout';
import SignUpLayout1 from '../components/landing-layouts/SignUpLayout1';
import SignUpLayout2 from '../components/landing-layouts/SignUpLayout2';

export default class LandingPageView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            registraton: {
                name: null,
                dob: null,
                gender: null,
                bio: null,
                location: null,
                portfolio: null
            }
        };
    }

    render() {
        switch(this.state.step) {
            case 1:
                return <LandingPageLayout />
            case 2:
                return <SignUpLayout1 />
            case 3:
                return <SignUpLayout2 />
        }
    }

    saveValues = (data) => {

    }

    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }
}
