import React from 'react';
import SearchBar from './SearchBar';

export default class Header extends React.Component {
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
                    <a href="/">
                        <img src='assets/images/icons/home.svg' />
                    </a>
                </div>

            	<div className="tekuma-logo">
                        <img id="tekuma-logo-image" src='assets/images/tekuma-black.svg' />
            	</div>
            	<div className="header-icons logged-off">
                    <div className="header-writing" title="Sign Up for Tekuma">
                        <a href="/">
                            <h3>Sign Up</h3>
                        </a>
                    </div>
                    <div className="header-writing" title="Log In to Tekuma">
                        <a href="/">
                            <h3>Log In</h3>
                        </a>
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
