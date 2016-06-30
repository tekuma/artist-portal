'use strict';
//import Views
import AppView            from './views/AppView';
import LandingPageView    from './views/LandingPageView';
import ForgotPasswordView from './views/ForgotPasswordView';
import ResetPasswordView  from './views/ResetPasswordView';

// React Imports
import React          from 'react';


import firebase       from 'firebase';
import reactMixin     from 'react-mixin'
import ReactFireMixin from 'reactfire';

//Initialize Firebase  SDK
var config = {
    apiKey: "AIzaSyAOS1ZTz4YcbIpTNNihtr-FeLb_905GefM",
    authDomain: "artist-tekuma-4a697.firebaseapp.com",
    databaseURL: "https://artist-tekuma-4a697.firebaseio.com",
    storageBucket: "artist-tekuma-4a697.appspot.com",
};
firebase.initializeApp(config);


var provider = new firebase.auth.GoogleAuthProvider();


export default class App extends React.Component {
    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            user : null,
            errors : [],
            registration : {}
        };
        // this.googleAuth = this.googleAuth.bind(this);
    } //END constructor

    shouldComponentUpdate(nestProps, nextState) {
      return nextState.user != null;
    }

    render() {
        console.log("||>> Rendering...");
        if (this.state.user !== null && this.state.errors.length == 0) {
          // User is signed in.
          console.log(">> TRUE!");
          return this.artistPortal();
        } else {
            console.log(">>> in the render else");
            console.log(this.state);
          return this.login();
        }
    }

    //// ----- Functions

    /**
     * [description]
     * @return {[type]} [description]
     */
    googleAuth = () => {
        console.log(this);
        console.log("Entered Google Auth Function");
        var container = null;

        firebase.auth().signInWithPopup(provider).then(function(result) {
            //logged in Successful
            console.log(">Authentication Successful");
            const user = result.user

        }).catch(function(error) {
            // An error occurred
            console.log("++++Auth error");
            console.log(error);
        });
        console.log(user);
    }


    /**
     * [description]
     * @return {[type]} [description]
     */
    artistPortal = () => {
        console.log("in portal function");
        console.log("State", this.state);
        return(
            <AppView
              user={this.state.user} />
        )
    }

    /**
     * [description]
     * @return {[type]} [description]
     */
    login = () => {
        console.log("in login function");
        return(
            <LandingPageView
                saveValues={this.saveValues}
                submitRegistration={this.submitRegistration}
                user={this.state.user}
                googleAuth={this.googleAuth} />
        )
    }

    saveValues = (data) => {

        this.setState({
            registration: Object.assign({}, this.state.registration, data)
        });
    }

    submitRegistration = () => {

        firebase.auth().createUserWithEmailAndPassword(this.state.registration.email, this.state.registration.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.state.errors.push(error);
        });

        var user = firebase.auth().currentUser;

        this.setState({user});
    }
}


// reactMixin(App.prototype, ReactFireMixin)
