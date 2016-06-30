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
            registration : {},
            login: {}
        };
    } //END constructor

    shouldComponentUpdate(nextProps, nextState) {
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
          return this.landingPage();
        }
    }
    //// ----- Functions

    /**
     * [description]
     * @param  {[type]} user [description]
     * @return {[type]}      [description]
     */
    setUser = (user) => {
        this.setState({user});
    }

    /**
     * [description]
     * @return {[type]} [description]
     */
    authenticateWithGoogle = () => {
        console.log(this);
        console.log("Entered Google Auth Function");

        firebase.auth().signInWithPopup(provider).catch(function(error) {
            // An error occurred
            console.log("++++Auth error");
            console.log(error);
        });
        let user = firebase.auth().currentUser
        console.log("??????");
        if (user !== null) {
            console.log(user.email);
        }
        this.setUser(user);
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
    landingPage = () => {
        console.log("in login function");
        return(
            <LandingPageView
                authenticateWithGoogle={this.authenticateWithGoogle}
                login={this.login}
                saveValues={this.saveValues}
                submitRegistration={this.submitRegistration}
                user={this.state.user}
            />
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

    login = (data) => {
        firebase.auth().loginUserWithEmailAndPassword(data.email, data.password).catch(function(error) {
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
