'use strict';
// Libs
import React          from 'react';
import Firebase       from 'firebase';
// Views
import AppView            from './views/AppView';
import LandingPageView    from './views/LandingPageView';
import ResetPasswordView  from './views/ResetPasswordView';
import ForgotPasswordView from './views/ForgotPasswordView';

//Initialize Firebase  SDK in root JSX (here)
var config = {
    apiKey: "AIzaSyAOS1ZTz4YcbIpTNNihtr-FeLb_905GefM",
    authDomain: "artist-tekuma-4a697.firebaseapp.com",
    databaseURL: "https://artist-tekuma-4a697.firebaseio.com",
    storageBucket: "artist-tekuma-4a697.appspot.com",
};
firebase.initializeApp(config);

//  # Global Variables
const userPath = 'public/onboarders/';

const providerG = new firebase.auth.GoogleAuthProvider();
const providerF = new firebase.auth.FacebookAuthProvider();
//TODO  Add 'scopes'? to google/fb auth



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
          return this.goToArtistPortal();
        } else {
          return this.goToLandingPage();
        }
    }


    //// ----------- #Methods ---------------------------------

    // #Render flowcontrol Methods

    /**
     * Flow Control Function: If a user is currently logged in after accessing
     * '/', they are sent here.
     * @return {[JSX]} [renders into AppView]
     */
    goToArtistPortal = () => {
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
    goToLandingPage = () => {
        console.log("|>Rendering Login Page");
        console.log("|+>State:", this.state);
        return(
            <LandingPageView
                authenticateWithPassword={this.authenticateWithPassword}
                authenticateWithGoogle  ={this.authenticateWithGoogle}
                authenticateWithFB      ={this.authenticateWithFB}
                submitRegistration      ={this.submitRegistration}
                saveRegistration        ={this.saveRegistration}
                clearRegistration       ={this.clearRegistration}

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

    /**
     * [description]
     * @return {[type]} [description]
     */
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
     * not currently needed for the scope of Artist.Tekuma.io.
     * NOTE: that '() =>' will lexically bind the 'this' object.
     * [https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup ]
     */
    authenticateWithGoogle = () => {
        firebase.auth().signInWithPopup(providerG)
        .then( () => {
            let thisCurrentUser = firebase.auth().currentUser;
            this.addUserToTekuma(thisCurrentUser, "google");
            this.setUID(thisCurrentUser.uid);
            console.log(">Google Auth successful");
        }).catch( (error) => {
            console.error(error);
        });
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
        firebase.auth().signInWithPopup(providerF)
        .then( () => {
            let thisCurrentUser = firebase.auth().currentUser;
            this.addUserToTekuma(thisCurrentUser, "fb");
            this.setUID(thisCurrentUser.uid);
            console.log(">FB Auth successful");
        }).catch( (error) => {
            console.error(error);
        });
    }

    /**
     * [description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    authenticateWithPassword = (data) => {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then( () => {
            this.setUID(firebase.auth().currentUser.uid);
            console.log(">Password Auth successful");
        }).catch( (error) => {
            console.error(error);
        });
    }

    /**
     * [description -> TODO]
     * @return {[type]} [description]
     */
    submitRegistration = () => {
        console.log("|>Submitted registration.");
        firebase.auth().createUserWithEmailAndPassword(this.state.registration.email, this.state.registration.password)
        .then( () => {
            this.saveRegistration({uid: this.state.thisUID});
            this.addUserToTekuma(this.state.registration, "password");
            console.log("Reached end of complete Registration function");
        }).catch( (error) => {
            console.error(error);
        });
    }

    /**
     * Initializes a user in the DB:
     * - Onboarders object in public/onboarders
     * - private    object in _private/onboarders
     * - branch of marketed products in public/products
     * - branch of sales information in _private/products
     * @param  {firebase.auth.currentUser} user [current user object]
     * @param  {String} provider - one of("password", "google", "fb")
     */
    addUserToTekuma = (user, provider) => {
        const thisUID = user.uid;
        let isNewUser = true;

        // Instantiate public/onboarders/thisUID
        // and check if isNewUser.
        const usersRef = firebase.database().ref('public/onboarders');
        usersRef.once('value').then( (snapshot) => {
            //check if user already exists at node
            if (!snapshot.child(thisUID).exists()) {
                isNewUser = true;

                console.log("User :", user);
                // Setting Onboarder name
                let thisDisplayName = "Awesome Artist";
                if (user.displayName !== undefined && user.displayName !== null) {
                    thisDisplayName = user.displayName;
                }

                // Setting onboarder info (if registered)
                let dob = "",
                    avatar = "",
                    gender = "",
                    bio = "",
                    location = "",
                    portfolio = "",
                    legal_age = false;

                //TODO: set up iteratively. #dontRepeatYourself
                if (user.dob !== undefined) {
                    dob = user.dob;
                }
                if (user.gender !== undefined) {
                    gender = user.gender;
                }
                if (user.bio !== undefined) {
                    bio = user.bio;
                }
                if (user.location !== undefined) {
                    location = user.location;
                }
                if (user.portfolio !== undefined) {
                    portfolio = user.portfolio;
                }
                if (user.photoURL !== undefined ) {
                    avatar = user.photoURL;
                }

                usersRef.child(thisUID).set({
                    albums        : { 0: {
                        name:"Uploads"
                    }},
                    auth_provider : provider,
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
            } else {
                isNewUser = true;
            }
        }, (error) => {
            console.error(error);
        }, this);

        if (isNewUser) {
            //Instantiate public/products/thisUID
            const productsRef = firebase.database().ref('public/products');
            productsRef.once('value').then( (snapshot) => {
                //check if user already exists in at node, if not:
                if (!snapshot.child(thisUID).exists()) {
                    productsRef.child(thisUID).set({onShopify: false});
                }
            }, (error) => {
                console.error(error);
            }, this);

            //Instantiate _private/onboarders/thisUID
            const _userRef = firebase.database().ref('_private/onboarders');
            _userRef.once('value').then( (snapshot) => {
                //check if user already exists in at node, if not:
                if (!snapshot.child(thisUID).exists()) {
                    _userRef.child(thisUID).set({legal_name: "legal_name"});
                }
            }, (error) => {
                console.error(error);
            }, this);

            //Instantiate _private/products/thisUID
            const _productsRef = firebase.database().ref('_private/products');
            _productsRef.once('value').then( (snapshot) => {
                //check if user already exists in at node, if not:
                if (!snapshot.child(thisUID).exists()) {
                    _productsRef.child(thisUID).set({onShopify: false});
                }
            }, (error) => {
                console.error(error);
            }, this);
        }
    }

    /**
     * Signs the user out from firebase auth
     */
    signOutUser = () => {
        firebase.auth().signOut().then( () => {
          console.log("User signed out");
        }, (error) => {
          console.error(error);
        });
    }

}//END App
