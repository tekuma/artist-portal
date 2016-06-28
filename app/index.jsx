import './assets/stylesheets/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import AppView from './views/AppView';
import alt from './libs/alt';import storage from './libs/storage';import persist from './libs/persist';
import { Router, Route, Link, browserHistory} from 'react-router'

persist(alt, storage, 'root');

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={AppView} />
    </Router>
), document.getElementById('root'));


// Redirect with browserHistory
// browserHistory.push('/some/path');
