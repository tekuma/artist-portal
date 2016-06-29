import React    from 'react';
import LandingPageLayout from '../components/landing-layouts/LandingPageLayout';
import SignUpLayout1     from '../components/landing-layouts/SignUpLayout1';
import SignUpLayout2     from '../components/landing-layouts/SignUpLayout2';
import { Router, Route, Link, browserHistory } from 'react-router';



export default class LandingPageView extends React.Component {
    constructor(props) {
        //TOP
        super(props);

        this.state = {
            step       : 1,
            registraton: {
                name: null,
                dob: null,
                avatar: null,
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
                return <LandingPageLayout
                        saveValues = {this.saveValues}
                        nextStep   = {this.nextStep}
                        googleAuth = {this.googleAuth}
                        />
            case 2:
                return <SignUpLayout1
                        saveValues = {this.saveValues}
                        nextStep   = {this.nextStep}
                        />
            case 3:
                return <SignUpLayout2
                        saveValues          = {this.saveValues}
                        submitRegistration  = {this.submitRegistration}
                        />
        }
    }


// ---functions ---

    googleAuth = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        var auth = firebase.auth();
        console.log("-----");
        auth.signInWithPopup(provider).then(function(result) {
          // User signed in!
          console.log("IT FUCKING WORKED");
          var uid = result.user.uid;
          console.log(uid);
          browserHistory.push('/artist');
        }).catch(function(error) {
          // An error occurred
          console.log("error, fuck");
        });
    }

    saveValues = (data) => {

        this.setState({
            registration: Object.assign({}, this.state.registration, data)
        });

        console.log(this.state.registration);
    }

    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    previousStep = () => {
        this.setState({
            step: this.state.step - 1
        })
    }

    submitRegistration = () => {
        console.log(this.state.registration);
        browserHistory.push('/artist');
    }
}
