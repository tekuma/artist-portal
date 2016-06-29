import React    from 'react';
import AppView  from './views/AppView';
import LandingPageView    from './views/LandingPageView';
import ForgotPasswordView from './views/ForgotPasswordView';
import ResetPasswordView  from './views/ResetPasswordView';
import { Router, Route, Link, browserHistory} from 'react-router';
import Firebase from 'firebase';
//
import reactMixin     from 'react-mixin'
import ReactFireMixin from 'reactfire'

//import Firebase
var config = {
    apiKey: "AIzaSyAOS1ZTz4YcbIpTNNihtr-FeLb_905GefM",
    authDomain:          "artist-tekuma-4a697.firebaseapp.com",
    databaseURL: "https://artist-tekuma-4a697.firebaseio.com",
    storageBucket: "artist-tekuma-4a697.appspot.com",
};

firebase.initializeApp(config);






const rootRef = new firebase.database().ref()

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            db : null
        }


    }
    //
    componentWillMount() {
        // this.bind(rootRef, db)
    }


    render(){
        return (
            <Router history={browserHistory}>
                <Route path="/artist" component = {AppView} />
                <Route path="/forgot" component = {ForgotPasswordView} />
                <Route path="/reset"  component = {ResetPasswordView} />
                <Route path="/*"      component = {LandingPageView} />
            </Router>
        );

    }

}


reactMixin(App.prototype, ReactFireMixin)
