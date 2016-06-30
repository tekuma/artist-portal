import React from 'react';
import SearchBar from './SearchBar';
import { Router, Route, Link } from 'react-router';

export default class LoggedOffHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchOpen: false
        };
    }
    render() {
        return (
            <header>
                <div className="header-icon home-icon" title="Go to Homepage">
                    <a href="http://tekuma.io">
                        <img src='assets/images/icons/home.svg' />
                    </a>
                </div>

            	<div className="tekuma-logo">
                    <Link to="/">
                        <img id="tekuma-logo-image" src='assets/images/tekuma-black.svg' />
                    </Link>
            	</div>
            	<div
                    className="header-icons logged-off"
                    onClick={this.props.togglePopover}>
                    <div className="header-writing" title="Log In to Tekuma">
                        <h3>Log In</h3>
                    </div>
        	    </div>
        	</header>
        );
    }

    toggleSearch = () => {
        this.setState({
            searchOpen: !this.state.searchOpen
        });

        if(!this.state.searchOpen) {
            document.getElementById("search").value = "";
        }
    };
}
