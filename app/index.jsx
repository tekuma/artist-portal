import './assets/stylesheets/style.css';
import React    from 'react';
import Firebase from 'firebase'
import ReactDOM from 'react-dom';
import alt      from './libs/alt';import storage  from './libs/storage';import persist  from './libs/persist';
import AppView  from './views/AppView';
import LandingPageView    from './views/LandingPageView';
import ForgotPasswordView from './views/ForgotPasswordView';
import ResetPasswordView  from './views/ResetPasswordView';
import { Router, Route, Link, browserHistory} from 'react-router';



persist(alt, storage, 'root');

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/"       component = {LandingPageView} />
        <Route path="/artist" component = {AppView} />
        <Route path="/forgot" component = {ForgotPasswordView} />
        <Route path="/reset"  component = {ResetPasswordView} />
    </Router>
), document.getElementById('root'));


// Redirect with browserHistory
// browserHistory.push('/some/path');
