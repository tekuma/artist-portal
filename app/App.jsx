/*
 *  Root of Artist.tekuma.io: Web framework build on
 *  Firebase+ReactJS, written in JS ES6 compiled with babelJS,
 *  Bundled with webpack and NPM.
 *  written for Tekuma Inc, summer 2016 by:
 *  Stephen White and Afika Nyati
 */
// Libs
import React              from 'react';
import Firebase           from 'firebase';
// Views
import AppView            from './views/AppView';
import LandingPageView    from './views/LandingPageView';
import ResetPasswordView  from './views/ResetPasswordView';
import ForgotPasswordView from './views/ForgotPasswordView';
// Styles
import './assets/stylesheets/spinkit.css';
import './assets/stylesheets/folding-cube.css';

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
    constructor(props) {
        super(props);
        this.state = {
            user        : {},
            errors      : [],
            registration: {},
            login       : {},
            loggedIn    : null,
            loaded      : false,
            forgotPass  : false
        };
    }

    /**
     * Force a re-render on every state change at root JSX
     * @param  {} nestProps [description]
     * @param  {} nextState [description]
     * @return {Boolean} if the component should re-render
     */
    shouldComponentUpdate(nextProps, nextState) {
      return true;
    }

    /**
     * What Happens as the component mounts
     */
    componentWillMount() {
        firebase.auth().onAuthStateChanged( (user)=>{
            if (user) {
                this.setState({loggedIn: true,  loaded:true});
            } else {
                this.setState({loggedIn: false, loaded:true});
            }
        });
    }

    render() {
        console.log("||++>>>Rendering root app...");
        // Show loading animation if not loaded
        if (!this.state.loaded) {
            return (
                <div className="layout-centered">
                    <div className="sk-folding-cube">
                      <div className="sk-cube1 sk-cube"></div>
                      <div className="sk-cube2 sk-cube"></div>
                      <div className="sk-cube4 sk-cube"></div>
                      <div className="sk-cube3 sk-cube"></div>
                    </div>
                </div>
            );
        } else {
            if (this.state.loggedIn) {
                return this.goToArtistPortal();
            } else if (this.this.state.forgotPass) {
                return this.goToForgotPassword();
            } else {
                return this.goToLandingPage();
            }
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
        return(
            <LandingPageView
                authenticateWithPassword={this.authenticateWithPassword}
                authenticateWithGoogle  ={this.authenticateWithGoogle}
                authenticateWithFB      ={this.authenticateWithFB}
                submitRegistration      ={this.submitRegistration}
                saveRegistration        ={this.saveRegistration}
                clearRegistration       ={this.clearRegistration}
                clearErrors             ={this.clearErrors}
                errors                  ={this.state.errors}
                user                    ={this.state.user}
            />
        )
    }

    /**
     * Flow control Function: if a user selects the "forgot password" button,
     * flow them into the forgot password interface.
     * @return {JSX} [forgot password views]
     */
    goToForgotPassword = () => {
        //TODO
    }


    // #Mutator Methods
    // NOTE: Always use methods to setState, never directly mutate state.

    /**
     * Mutates state to include registration infromation for new users.
     *  registration includes the following fields as data.{}
     * -email
     * -password
     * -display_name
     * -dob
     * -gender
     * -avatar (blob)
     * -bio
     * -location
     * -legal_name
     * -portfolio
     *
     * First, upload the avatar blob to be a URL, then set all info to state.
     * @param  {[Object]} data [Registration information from user gathered info]
     */
    saveRegistration = (data) => {
        this.setState({
            registration: Object.assign({}, this.state.registration, data)
        });
    }

    /**
     * Resets this.state.registration to empty object.
     */
    clearRegistration = () => {
        this.setState({
            registration: {}
        });
    }

    /**
     * resets this.state.errors to empty array
     */
    clearErrors = () => {
        this.setState({
            errors: []
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
        .then( ()=>{
            this.socialLoginToTekuma(firebase.auth().currentUser, "google");
            console.log(">Google Auth successful");
        }).catch( (error) => {
            console.error(error);
            this.setState({
                errors: this.state.errors.concat(error.message)
            });
        });
    }

    /**
     * This function will launch a pop-up with the Facebook Provider object,
     * and fill the firebase.auth() object with current user information.
     * A .then() can be used follwering the signInWithPopup and before the
     * .catch to grab a FB OAuth Token to access FB APIs. But, it is
     * not currently needed for the scope of Artist.Tekuma.io;
     * @see <a href="https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup">
     * firebase loginWithPopup</a>
     * NOTE: Facebook authentication is providered for "facebook apps". Thus,
     * a facebook app called "tekuma" has been initialized, and redirected to
     * artist.tekuma.io ;
     * @see <a href="https://developers.facebook.com/apps/586328154875055/">
     * Facebook Tekuma App Interface</a>
     */
    authenticateWithFB = () => {
        firebase.auth().signInWithPopup(providerF)
        .then( ()=>{
            this.socialLoginToTekuma(firebase.auth().currentUser, "fb");
            console.log(">FB Auth successful");
        }).catch( (error) => {
            console.error(error);
            this.setState({
                errors: this.state.errors.concat(error.message)
            });
        });
    }

    /**
     * Sign a user in via email/password
     * @param  {Object} data - object containing login info
     */
    authenticateWithPassword = (data) => {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then( () => {
            console.log(">Password Auth successful");
        }).catch( (error) => {
            console.error(error);
            this.setState({
                errors: this.state.errors.concat(error.message)
            });
        });
    }

    /**
     * If a new user decides to sign-up with email/password, they will be sent
     * to a text interface to submit registration information, which is saved
     * to this.state.registration (see this.saveRegistration javadoc for fields).
     * After the user is created, the user will be initialized in Tekuma's
     * database at :
     * - Onboarders object in 'public/onboarders/{UID}'
     * - private    object in '_private/onboarders/{UID}'
     * - branch of marketed products in 'public/products/{UID}'
     * - branch of sales information in '_private/products/{UID}'
     * Then, the user's avatar will be uploaded.
     */
    submitRegistration = () => {
        console.log("|>Submitted registration.");
        firebase.auth().createUserWithEmailAndPassword(this.state.registration.email, this.state.registration.password)
        .then( (thisUser) => { //thisUser is passed in asynchronously from FB
            const thisUID = thisUser.uid;
            console.log(thisUser, "THIS USER!!");

            // Instantiate public/onboarders/thisUID
            const usersRef = firebase.database().ref('public/onboarders');
            usersRef.once('value').then( (snapshot) => {
                //check if user already exists at node
                console.log(this.state.registration.avatar, "AVATAR");
                if (!snapshot.child(thisUID).exists()) {
                    // Setting onboarder info (if registered)
                    let dob = "",
                        avatar = "",
                        gender = "",
                        bio = "",
                        location = "",
                        portfolio = "",
                        legal_age = false;


                    //
                    firebase.storage().ref('portal/'+thisUID+'/avatars').put(this.state.registration.avatar).on(
                        firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot)=>{
                            if (snapshot.downloadURL != null) {
                                usersRef.child(thisUID).set({
                                    albums        : { 0: {
                                        name:"Uploads"
                                    }},
                                    auth_provider   : "password",
                                    email           : this.state.registration.email,
                                    display_name    : this.state.registration.display_name,
                                    legal_name      : this.state.registration.legal_name,
                                    avatar          : snapshot.downloadURL,
                                    dob             : this.state.registration.dob,
                                    gender_pronoun  : this.state.registration.gender_pronoun,
                                    bio             : this.state.registration.bio,
                                    location        : this.state.registration.location,
                                    portfolio       : this.state.registration.portfolio,
                                    over_eighteen   : false
                                });
                            }
                        },
                        (error)=>{
                            console.error(error);
                        },
                        ()=>{
                            console.log("success in avatar upload");
                        }
                    );


                    console.log(">>User Submitted To Database!");
                }
            }, (error) => {
                console.error(error);
            }, this);

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
                    _userRef.child(thisUID).set({legal_name: this.state.registration.legal_name});
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
        }).catch( (error) => {
            console.error(error);
        });
    }

    /**
     * When logging in via a social button, there is no way to know if a user
     * is clicking that button for the first time. First, we check a snapshot
     * of the database to see if the user already exists. If not, then we
     * initialize the user inside of Tekuma's infrastructure with:
     * - Onboarders object in 'public/onboarders/{UID}'
     * - private    object in '_private/onboarders/{UID}'
     * - branch of marketed products in 'public/products/{UID}'
     * - branch of sales information in '_private/products/{UID}'
     * @param  {firebase.auth.currentUser} user [current user object]
     * @param  {String} provider - one of("google", "fb")
     */
    socialLoginToTekuma = (user, provider) => {
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
                let thisDisplayName = "Untitled Artist";
                if (user.displayName !== undefined && user.displayName !== null) {
                    thisDisplayName = user.displayName;
                }

                // Setting onboarder info (if registered)
                let dob = "",
                    avatar = "",
                    gender_pronoun = "",
                    bio = "",
                    location = "",
                    portfolio = "",
                    legal_age = false;

                if (user.photoURL !== undefined ) {
                    avatar = user.photoURL;
                }

                usersRef.child(thisUID).set({
                    albums        : { 0: {
                        name:"Uploads"
                    }},
                    auth_provider   : provider,
                    email           : user.email,
                    display_name    : thisDisplayName,
                    legal_name      : "",
                    avatar          : avatar,
                    dob             : dob,
                    gender_pronoun  : gender_pronoun,
                    bio             : bio,
                    location        : location,
                    portfolio       : portfolio,
                    over_eighteen   : false
                });
                console.log(">>User Submitted To Database!");
            } else {
                isNewUser = false;
            }
        }, (error) => {
            console.error("Registration Error: ", error);
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
     * Signs the user out from firebase auth()
     */
    signOutUser = () => {
        firebase.auth().signOut().then( () => {
          console.log("User signed out");
        }, (error) => {
          console.error(error);
        });
    }


}//END App
