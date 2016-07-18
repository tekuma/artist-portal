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
import Snackbar           from 'material-ui/Snackbar';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';

// Files
import PostAuth           from './components/main/PostAuth';
import PreAuth            from './components/pre_auth/PreAuth';
import ResetPassword      from './components/pre_auth/ResetPassword';
import ForgotPassword     from './components/pre_auth/ForgotPassword';

//Initialize Firebase  SDK in root JSX (here)
var config = {
    apiKey: "AIzaSyAOS1ZTz4YcbIpTNNihtr-FeLb_905GefM",
    authDomain: "artist-tekuma-4a697.firebaseapp.com",
    databaseURL: "https://artist-tekuma-4a697.firebaseio.com",
    storageBucket: "artist-tekuma-4a697.appspot.com",
};
firebase.initializeApp(config);

//  # Global Variables
const userPath  = 'public/onboarders/';

const providerG = new firebase.auth.GoogleAuthProvider();
const providerF = new firebase.auth.FacebookAuthProvider();
//TODO  Add 'scopes'? to google/fb auth

/**
 * a
 */
export default class App extends React.Component {
    state = {
        errors      : [],    // error logs, snackbar display?
        reg         : {},    // public reg info
        _reg        : {},    // private reg info
        login       : {},    //
        loggedIn    : null,  //
        loaded      : false, // dictates if folding-cube is displayed
        forgotPass  : false,  // TODO,
        verifyEmailMessage: ""
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----App");
    }

    render() {
        if (!this.state.loaded) {
            return this.goToLoadingScreen();
        } else {
            if (this.state.loggedIn) {
                return this.goToPostAuth();
            } else if (this.state.forgotPass) {
                return this.goToForgotPassword();
            } else {
                return this.goToPreAuth();
            }
        }
    }

    componentDidMount() {
        console.log("++++++App");
        //LISTENER: listen for auth state changes
        firebase.auth().onAuthStateChanged( (currentUser)=>{
            if (currentUser) {
                this.setState({loggedIn: true,  loaded:true});
            } else {
                this.setState({loggedIn: false, loaded:true});
            }
        });
    }


    //// ----------- #Methods ---------------------------------

    // #Render flowcontrol Methods

    /**
     * Flow Control Function: If a user is currently logged in after accessing
     * '/', they are sent here.
     * @return {[JSX]} [renders into PostAuth]
     */
    goToPostAuth = () => {
        return(
            <div>
                <PostAuth
                  thisUID = {this.state.thisUID}
                  signOutUser = {this.signOutUser}
                  clearVerifyEmailMessage={this.clearVerifyEmailMessage}
                />
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="registration-error"
                        open={this.state.verifyEmailMessage.length > 0}
                        message={this.state.verifyEmailMessage}
                        autoHideDuration={4000} />
                </MuiThemeProvider>
            </div>
        )
    }

    /**
     * Flow Control Function: If no user is detected when accessing '/', then
     * they the UX will render the login page, "PreAuth".
     * @return {JSX} Renders the PreAuth screen
     */
    goToPreAuth = () => {
        console.log("|>Rendering Login Page");
        return(
            <PreAuth
                authenticateWithPassword={this.authenticateWithPassword}
                authenticateWithGoogle  ={this.authenticateWithGoogle}
                authenticateWithFB      ={this.authenticateWithFB}
                submitRegistration      ={this.submitRegistration}
                saveRegPublic           ={this.saveRegPublic}
                saveRegPrivate          ={this.saveRegPrivate}
                clearRegistration       ={this.clearRegistration}
                toggleForgotPassword    ={this.toggleForgotPassword}
                clearErrors             ={this.clearErrors}
                errors                  ={this.state.errors}
            />
        )
    }

    /**
     * Flow control Function: if a user selects the "forgot password" button,
     * flow them into the forgot password interface.
     * @return {JSX} [forgot password views]
     */
    goToForgotPassword = () => {
        return(
            <ForgotPassword
                authenticateWithPassword={this.authenticateWithPassword}
                errors                  ={this.state.errors}
                toggleForgotPassword    ={this.toggleForgotPassword}
                returnToLandingPage    ={this.toggleForgotPassword}
            />
        )
    }

    /**
     * TODO
     * @return {[type]} [description]
     */
    goToLoadingScreen = () => {
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
    }

// ============= Methods ===============

    /**
     * TODO
     * @return {[type]} [description]
     */
    toggleForgotPassword = () => {
        this.setState({forgotPass:!this.state.forgotPass});
    }

    /**
     * TODO
     * @param  {Object} data - data to be combined with this.state.reg
     */
    saveRegPublic = (data) => {
        this.setState({
            reg: Object.assign({}, this.state.reg, data)
        });
    }

    /**
     * TODO
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    saveRegPrivate = (data) => {
        this.setState({
            _reg: Object.assign({}, this.state._reg, data)
        });
    }

    /**
     * Resets this.state.reg to empty object.
     */
    clearRegistration = () => {
        this.setState({
            reg : {},
            _reg: {}
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
            console.log(">Google Auth successful");
            this.socialLoginToTekuma("google");
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
            console.log(">FB Auth successful");
            this.socialLoginToTekuma("facebook");
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
        .then( (thisUser) => {
            console.log(">Password Auth successful for:", thisUser.displayName);
        }).catch( (error) => {
            console.error(error);
            this.setState({
                errors: this.state.errors.concat(error.message)
            });
        });
    }

    /**
     * This method will read the state.reg
     * and create an onboarders JSON object from it to be set to
     * public/onboarders/{uid}.
     * reg has :
     * -email,password, display_name, dob, gender_pronoun, avatar,
     * legal_name, legal_age, bio, location, portfolio.
     * @return {Object} [object will all non-null'd fields]
     */
    createPublicOnboarderObject = () => {
        // email and password WILL be non-null
        let dob            = "",
            gender_pronoun = "",
            bio            = "",
            location       = "",
            portfolio      = "",
            display_name   = "",
            legal_age      = false,
            avatar         = "";

        //FIXME do this with a forloop and .hasOwnProperty()
        //Check for info Submitted, if so override defaults
        if (this.state.reg.dob != undefined && this.state.reg.dob != null) {
           dob = this.state.reg.dob;
        }
        if (this.state.reg.gender_pronoun != undefined && this.state.reg.gender_pronoun != null) {
           gender_pronoun = this.state.reg.gender_pronoun;
        }
        if (this.state.reg.bio != undefined && this.state.reg.bio != null) {
           bio = this.state.reg.bio;
        }
        if (this.state.reg.location != undefined && this.state.reg.location != null) {
           location = this.state.reg.location;
        }
        if (this.state.reg.portfolio != undefined && this.state.reg.portfolio != null) {
           portfolio = this.state.reg.portfolio;
        }
        if (this.state.reg.display_name != undefined && this.state.reg.display_name != null) {
           display_name = this.state.reg.display_name;
        }
        if (this.state.reg.legal_age != undefined && this.state.reg.legal_age != null) {
           legal_age = this.state.reg.legal_age;
        }

        // now create the object
        let onboarder = {
            albums        : { 0: {
                name:"Uploads",
                description: "The default album in which uploaded artworks are placed."
            }},
            auth_provider   : "password",
            display_name    : display_name,
            avatar          : "",
            dob             : dob,
            gender_pronoun  : gender_pronoun,
            bio             : bio,
            location        : location,
            portfolio       : portfolio,
            over_eighteen   : legal_age,
            joined          : new Date().toISOString()
        };

        return onboarder;


    }

    /**
     * If a new user decides to sign-up with email/password, they will be sent
     * to a text interface to submit registration information, which is saved
     * to this.state.reg (public) and this.state._reg (private).
     * After the user is created, the user will be initialized in Tekuma's
     * database at :
     * - Onboarders object in 'public/onboarders/{UID}'
     * - private    object in '_private/onboarders/{UID}'
     * - branch of marketed products in 'public/products/{UID}'
     * - branch of sales information in '_private/products/{UID}'
     * Then, the user's avatar will be uploaded.
     */
    submitRegistration = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state._reg.email, this.state._reg.password)
        .then( (thisUser) => { //thisUser is passed in asynchronously from FB
            const thisUID    = thisUser.uid;

            //>>>> First, Send email verified email
            thisUser.sendEmailVerification().then(()=>{
                console.log("Verification Email sent to", thisUser.email);

                this.setState({
                    verifyEmailMessage: `Verification Email sent to ${thisUser.email}`
                });

                console.log("This is the verifyEmailMessage: ",this.state.verifyEmailMessage);
            });


            //>>>> Instantiate 'public/onboarders/{uid}'
            let onboarderPath = `public/onboarders/${thisUID}`;
            const userRef     = firebase.database().ref(onboarderPath);
            const onboarder   = this.createPublicOnboarderObject();
            if (this.state.reg.avatar != null && this.state.reg.avatar != undefined){
                //If the user chose to upload an avatar, we have to asynchronously upload it
                const avatarPath = `portal/${thisUID}/avatars/${this.state.reg.avatar.name}`;
                const avatarRef  = firebase.storage().ref(avatarPath);
                avatarRef.put(this.state.reg.avatar).on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot)=>{ //On-state changed
                    },
                    (error)=>{ // on-catch
                        console.error(error);
                    },
                    ()=>{ //on-complete
                        console.log("success in avatar upload");
                        avatarRef.getDownloadURL().then( (avatarURL)=>{
                            //Define an Onboarder object, and populate:
                            onboarder.avatar = avatarURL;
                            userRef.set(onboarder).then(()=>{
                                console.log(">>> User created in DB");
                            });
                        });
                    }
                );

            }
            else { // no avatar, no async, no hassle
                userRef.set(onboarder).then( ()=>{
                    console.log(">>>>User created in DB");
                });
            }


            //>>>> Instantiate public/products/thisUID
            let  productPath  = `public/products/${thisUID}`;
            firebase.database().ref(productPath).set({
                on_shopify: false
            }).then( ()=>{
                console.log("product node created");
            });

            //>>>> Instantiate _private/onboarders/thisUID
            let userPrivatePath  = `_private/onboarders/${thisUID}`;

            let legal_name = "Legal Name not provided";
            if (this.state._reg.legal_name != undefined && this.state._reg.legal_name != null) {
               legal_name = this.state._reg.legal_name;
            }

            let email = "";
            if (this.state._reg.email != undefined && this.state._reg.email != null) {
               email = this.state._reg.email;
            }
            firebase.database().ref(userPrivatePath).set({
                legal_name: legal_name,
                email     : email
            }).then( ()=>{
                console.log("private onboarder node created");
            });

            //>>>> Instantiate _private/products/thisUID
            const _productsRef = firebase.database().ref('_private/products');
            let _productPath = `_private/products/${thisUID}`;
            firebase.database().ref(_productPath).set({
                on_shopify: false
            }).then(()=>{
                console.log("private product node created");
            });

        }).catch( (error) => {
            console.log("user not created :(");
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
     */
    socialLoginToTekuma = (provider) => {
        const user    = firebase.auth().currentUser;
        const thisUID = user.uid;
        let isNewUser = true;

        //>>>> Instantiate public/onboarders/thisUID
        // and check if isNewUser.

        const usersRef = firebase.database().ref('public/onboarders');
        usersRef.once('value').then( (snapshot) => {
            //check if user already exists at node
            if (!snapshot.child(thisUID).exists()) {
                isNewUser = true;

                // Setting Onboarder name
                let thisDisplayName = "Untitled Artist";``
                if (user.displayName) {
                    thisDisplayName = user.displayName;
                }

                // Setting onboarder info (if registered)
                let dob            = "",
                    avatar         = "",
                    gender_pronoun = "",
                    bio            = "",
                    location       = "",
                    portfolio      = "",
                    legal_age      = false;


                if (user.photoURL !== undefined ) {
                    avatar = user.photoURL;
                }

                usersRef.child(thisUID).set({
                    albums        : { 0: {
                        name:"Uploads",
                        description: "The default album in which uploaded artworks are placed."
                    }},
                    auth_provider   : provider,
                    display_name    : thisDisplayName,
                    avatar          : avatar,
                    dob             : dob,
                    gender_pronoun  : gender_pronoun,
                    bio             : bio,
                    location        : location,
                    portfolio       : portfolio,
                    over_eighteen   : false,
                    joined          : new Date().toISOString()
                }).then( ()=>{
                    console.log("//node set in public user (1/4)");
                });

            } else {
                isNewUser = false;
            }
        }, (error) => {
            console.error("reg Error: ", error);
        }, this);

        if (isNewUser) {
            //>>>> Instantiate public/products/thisUID
            let  productPath  = `public/products/${thisUID}`;
            firebase.database().ref(productPath).set({
                on_shopify: false
            }).then(()=>{
                console.log("//node set in public products (2/4)");
            });


            //>>>> Instantiate _private/onboarders/thisUID
            let userPrivatePath = `_private/onboarders/${thisUID}`;
            firebase.database().ref(userPrivatePath).set({
                legal_name: "",
                email     : user.email
            }).then(()=>{
                console.log("//node set in private user (3/4)");
            });

            //>>>> Instantiate _private/products/thisUID
            let  _productPath  = `_private/products/${thisUID}`;
            firebase.database().ref(_productPath).set({
                on_shopify: false
            }).then(()=>{
                console.log("//node set in private products (4/4)");
            });

        }
    }

    /**
     * Signs the user out from firebase auth().
     * Listener in Render() will detect change.
     */
    signOutUser = () => {
        firebase.auth().signOut().then( () => {
          console.log("User signed out");
        }, (error) => {
          console.error(error);
        });
    }

    clearVerifyEmailMessage = () => {
        this.setState({
            verifyEmailMessage: ""
        });

        console.log("This is the verifyEmailMessage after display: ",this.state.verifyEmailMessage);
    }
}//END App
