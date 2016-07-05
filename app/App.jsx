'use strict';
// Libs
import React          from 'react';
import Firebase       from 'firebase';
// Views
import AppView            from './views/AppView';
import LandingPageView    from './views/LandingPageView';
import ForgotPasswordView from './views/ForgotPasswordView';
import ResetPasswordView  from './views/ResetPasswordView';

//TODO Remove stores, use Firebase DB

//Initialize Firebase  SDK in root JSX (here)
var config = {
    apiKey: "AIzaSyAOS1ZTz4YcbIpTNNihtr-FeLb_905GefM",
    authDomain: "artist-tekuma-4a697.firebaseapp.com",
    databaseURL: "https://artist-tekuma-4a697.firebaseio.com",
    storageBucket: "artist-tekuma-4a697.appspot.com",
};
firebase.initializeApp(config);

//Instantiate Provider Objects for Auth()
const providerG = new firebase.auth.GoogleAuthProvider();
const providerF = new firebase.auth.FacebookAuthProvider();
//   =>TODO  Add 'scopes'? to google/fb auth


export default class App extends React.Component {
    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            user        : {},
            errors      : [],
            registration: {},
            login       : {},
            thisUID     : null
        };
    } //END constructor

    /**
     * [shouldComponentUpdate description]
     * @param  {[type]} nestProps [description]
     * @param  {[type]} nextState [description]
     * @return {[type]}           [description]
     */
    shouldComponentUpdate(nextProps, nextState) {
      return true;
      // re-renders everytime state is changed.
    }

    render() {
        console.log("||++>>>Rendering...");
        if (this.state.thisUID !== null && this.state.errors.length == 0) {
          // User is signed in successfully
          console.log("|>>>User signed in successfully, rendering Artist Portal!");
          return this.artistPortal();
        } else {
            console.log("|>>>No user detected. Rendering Log-in page");
            console.log("|+>State: ", this.state);
          return this.landingPage();
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
              thisUID = {this.state.thisUID}
              signOutUser = {this.signOutUser}
            />
        )
    }

    /**
     * Flow Control Function: If no user is detected when accessing '/', then
     * they the UX will render the login page, "LandingPageView".
     * @return {[type]} [description]
     */
    landingPage = () => {
        console.log("|>Rendering Login Page");
        console.log("|+>State:", this.state);
        return(
            <LandingPageView
                authenticateWithPassword={this.authenticateWithPassword}
                authenticateWithGoogle  ={this.authenticateWithGoogle}
                authenticateWithFB      ={this.authenticateWithFB}
                submitRegistration      ={this.submitRegistration}
                saveRegistration        ={this.saveRegistration}
                clearRegistration        ={this.clearRegistration}
                errors                  ={this.state.errors}
                user                    ={this.state.user}
            />
        )
    }

    // #Mutator Methods

    /**
     * NOTE *always use mutator methods to change the state* never
     * change the state directly.
     * @param  {[String]} user [the users UID, pointer to DB]
     */
    setUID = (thisUID) => {
        this.setState({thisUID});
    }


    /**
     * Mutates state to include registration infromation for new users.
     * @param  {[Object]} data [Registration information from user gathered info]
     */
    saveRegistration = (data) => {
        console.log("Previous Registration: ", this.state.registration);
        this.setState({
            registration: Object.assign({}, this.state.registration, data)
        });
        console.log("Current Registration: ", this.state.registration);
    }

    clearRegistration = () => {
        this.setState({
            registration: {}
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

        let currentUser = firebase.auth().currentUser;
        console.log(currentUser.uid);
        this.addUserToTekuma(currentUser);
        this.setUID(currentUser.uid);

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
            var errorMessage = error.message;
            console.log(errorMessage);
        });

        let currentUser = firebase.auth().currentUser;
        console.log(currentUser.uid);
        this.addUserToTekuma(currentUser);
        this.setUID(currentUser.uid);
    }

    /**
     * [description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    authenticateWithPassword = (data) => {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password).catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage);
        });

        function setUID(that) {
            let currentUserUID = firebase.auth().currentUser.uid;
            console.log(currentUserUID);
            that.setUID(currentUserUID);
        }

        setTimeout(setUID.bind(null, this), 1000);
    }

    /**
     * [description -> TODO]
     * @return {[type]} [description]
     */
    submitRegistration = () => {
        console.log("|>Submitted registration.");
        firebase.auth().createUserWithEmailAndPassword(this.state.registration.email, this.state.registration.password).catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage);
        });

        function completeRegistration(that) {
            console.log(that.state);
            that.authenticateWithPassword({
                email: that.state.registration.email,
                password: that.state.registration.password});
            function saveUser (that) {
                that.saveRegistration({uid: that.state.thisUID});
                that.addUserToTekuma(that.state.registration);
                console.log("Reached end of complete Registration function");
            }
            setTimeout(saveUser.bind(null, that), 1000);
        }

        setTimeout(completeRegistration.bind(null, this), 1000);


    }

    addUserToTekuma = (user) => {
        console.log("Entered addUserToTekuma");
        // check if UID is a child of /onboarders
        // (TODO also check /products, /_private , etc)
        // If not, add them. else, do nothing.

        // const thisUID = firebase.auth().currentUser.uid;
        const thisUID = user.uid;
        const onboardersNode = firebase.database().ref('onboarders');

        onboardersNode.once('value').then(function(snapshot) {
                if (!snapshot.child(thisUID).exists()) {

                    console.log("User :", user);
                    // Setting Onboarder name
                    let thisDisplayName = "Awesome Artist";

                    if (user.displayName !== undefined && user.displayName !== null) {
                        thisDisplayName = user.displayName;
                        console.log("display name: ", thisDisplayName);
                    }

                    // Setting onboarder info (if registered)
                    let dob = "",
                        avatar = "",
                        gender = "",
                        bio = "",
                        location = "",
                        portfolio = "";

                    if (user.dob !== undefined) {
                        dob = user.dob;
                        console.log("Entered dob in addUserToTekuma");
                        console.log("dob value: ", dob);
                    }

                    if (user.gender !== undefined) {
                        gender = user.gender;
                        console.log("Entered gender in addUserToTekuma");
                        console.log("gender value: ", gender);
                    }

                    if (user.bio !== undefined) {
                        bio = user.bio;
                        console.log("Entered bio in addUserToTekuma");
                        console.log("bio value: ", bio);
                    }

                    if (user.location !== undefined) {
                        location = user.location;
                        console.log("Entered location in addUserToTekuma");
                        console.log("location value: ", location);
                    }

                    if (user.portfolio !== undefined) {
                        portfolio = user.portfolio;
                        console.log("Entered portfolio in addUserToTekuma");
                        console.log("portfolio value: ", portfolio);
                    }

                    if (user.photoURL !== undefined ) {
                        avatar = user.photoURL;
                    }

                    onboardersNode.child(thisUID).set({
                        //TODO expand to all keys in DB
                        email         : user.email,
                        display_name  : thisDisplayName,
                        avatar        : avatar,
                        dob           : dob,
                        gender        : gender,
                        bio           : bio,
                        location      : location,
                        portfolio     : portfolio
                    });
                    console.log(">>User Submitted To Database!");
                }
        }, function(errorStuff){
            if (errorStuff != null){console.log(errorStuff);}
        }, this);

    }

    signOutUser = () => {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          console.log("User signed out");
        }, function(error) {
          // An error happened.
          console.log("Error occured.");
        });
        }
}//END App
