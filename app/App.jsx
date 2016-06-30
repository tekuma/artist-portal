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


//Initialize Firebase  SDK in root JSX (here)
var config = {
    apiKey: "AIzaSyAOS1ZTz4YcbIpTNNihtr-FeLb_905GefM",
    authDomain: "artist-tekuma-4a697.firebaseapp.com",
    databaseURL: "https://artist-tekuma-4a697.firebaseio.com",
    storageBucket: "artist-tekuma-4a697.appspot.com",
};
firebase.initializeApp(config);

//Instanciate Provider Objects for Auth()
const providerG = new firebase.auth.GoogleAuthProvider();
const providerF = new firebase.auth.FacebookAuthProvider();

//TODO  Add 'scopes'? to google/fb


export default class App extends React.Component {
    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            user : null,
            errors : [],
            registration : {}
        };
    } //END constructor

    shouldComponentUpdate(nestProps, nextState) {
      return nextState.user != null;
    }

    render() {
        console.log("||++>>>Rendering...");
        if (this.state.user !== null && this.state.errors.length == 0) {
          // User is signed in successfully
          console.log("|>>>User signed in successfully, rendering Artist Portal!");
          return this.artistPortal();
        } else {
            console.log("|>>>No user detected. Rendering Log-in page");
            console.log("|+>State: ", this.state);
          return this.login();
        }
    }


    //// ----------- #Methods ---------------------------------

    // #Flow control Methods

    /**
     * Flow Control Function: If a user is currently logged in after accessing
     * '/', they are sent here.
     * @return {[JSX]} [renders into AppView]
     */
    artistPortal = () => {
        console.log("|>Rendering Artist Portal");
        console.log("|+>State:", this.state);
        return(
            <AppView
              user={this.state.user} />
        )
    }

    /**
     * Flow Control Function: If no user is detected when accessing '/', then
     * they the UX will render the login page, "LandingPageView".
     * @return {[type]} [description]
     */
    login = () => {
        console.log("|>Rendering Login Page");
        console.log("|+>State:", this.state);
        return(
            <LandingPageView
                authenticateWithGoogle={this.authenticateWithGoogle}
                authenticateWithFB    ={this.authenticateWithFB}
                submitRegistration    ={this.submitRegistration}
                saveValues            ={this.saveValues}
                user                  ={this.state.user}
            />
        )
    }

    // #Mutator Methods

    /**
     * *always use mutator methods to change the state* never
     * change the state directly.
     * @param  {[type]} user [description]
     * @return {[type]}      [description]
     */
    setUser = (user) => {
        this.setState({user});
    }

    /**
     * [description -> TODO]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    saveValues = (data) => {
        this.setState({
            registration: Object.assign({}, this.state.registration, data)
        });
    }

    // #Authentication Methods

    /**
     * This function will launch a pop-up with the Google Provider object,
     * and fill the firebase.auth() object with current user information.
     * A .then() can be used follwering the signInWithPopup and before the
     * .catch to grab a Google OAuth Token to access Google APIs. But, it is
     * not currently needed for the scope of Artist.Tekuma.io
     * @return {[Promise]} see:
     * [https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup ]
     */
    authenticateWithGoogle = () => {
        console.log("|>> Authenticating with Google");

        firebase.auth().signInWithPopup(providerG).catch(function(error) {
            console.log("|>>>> ERROR with Google Auth:");
            console.log(error);
        });

        let user = firebase.auth().currentUser
        if (user !== null) {
            console.log("|>> User Obj:", user);
        }

        this.setUser(user);
    }

    /**
     * This function will launch a pop-up with the Facebook Provider object,
     * and fill the firebase.auth() object with current user information.
     * A .then() can be used follwering the signInWithPopup and before the
     * .catch to grab a Google OAuth Token to access FB APIs. But, it is
     * not currently needed for the scope of Artist.Tekuma.io
     * @return {[Promise]} see:
     * [https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup ]
     */
    authenticateWithFB = () => {
        console.log("|>> Authenticating with Facebook");

        firebase.auth().signInWithPopup(providerF).catch(function(error) {
            console.log("|>>>> ERROR with FB Auth:");
            console.log(error);
        });

        let user = firebase.auth().currentUser
        if (user != null) {
            console.log("|>> User Obj:", user);
        }
        this.setUser(user);
    }

    /**
     * [description -> TODO]
     * @return {[type]} [description]
     */
    submitRegistration = () => {
        console.log("|>Submitted registration.");
        firebase.auth().createUserWithEmailAndPassword(this.state.registration.email, this.state.registration.password).catch(function(error) {
            // Handle Errors here.
            const errorMessage = error.message;
            const errorCode    = error.code;
            this.state.errors.push(error);
        });

        let user = firebase.auth().currentUser;
        if (user != null) {
            console.log("|>> User Obj:", user);
        }
        this.setState({user});
    }


}//END App
// reactMixin(App.prototype, ReactFireMixin)
