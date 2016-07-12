import './assets/stylesheets/style.css';
import './assets/stylesheets/animation.css';
import React    from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import alt      from './libs/alt';import storage  from './libs/storage';import persist  from './libs/persist';

persist(alt, storage, 'root');

/**
 * RenderDOM connects the root JSX logic (App.jsx) to the root HTML id.
 * @param  {[JSX File]} ( <App /> ) App.jsx file that hanldes 'if auth'
 * @return {[type]}   [description]
 */
ReactDOM.render((
    <App />
), document.getElementById('root'));
