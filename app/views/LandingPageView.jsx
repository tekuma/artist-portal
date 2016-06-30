import React    from 'react';
import LandingPageLayout from '../components/landing-layouts/LandingPageLayout';
import SignUpLayout1     from '../components/landing-layouts/SignUpLayout1';
import SignUpLayout2     from '../components/landing-layouts/SignUpLayout2';
import { Router, Route, Link, browserHistory } from 'react-router';
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAOS1ZTz4YcbIpTNNihtr-FeLb_905GefM",
    authDomain: "artist-tekuma-4a697.firebaseapp.com",
    databaseURL: "https://artist-tekuma-4a697.firebaseio.com",
    storageBucket: "artist-tekuma-4a697.appspot.com",
};
firebase.initializeApp(config);


/**
 * TODO
 */
export default class LandingPageView extends React.Component {
    constructor(props) {
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

            },
            user: null
            }

        };
    }

    componentWillReceiveProps(nextProps) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        } else {
          // No user is signed in.
        }
      });
    }

    render() {
        switch(this.state.step) {
            case 1:
                return <LandingPageLayout
                        saveValues = {this.saveValues}
                        nextStep   = {this.nextStep}
                        authenticateWithGoogle = {this.props.authenticateWithGoogle}
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
        // browserHistory.push('/artist');
        firebase.auth().createUserWithEmailAndPassword(this.state.registration.email, this.state.registration.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ...
        });

        var user = firebase.auth().currentUser;

        console.log("User Info:", user);
        this.setState({user: user});

        if(this.state.user != null) {
          browserHistory.push('/artist');
        }

    }
}
