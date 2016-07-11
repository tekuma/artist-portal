import React from 'react';
import SearchBar from './SearchBar';

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

            	<div
                    className="tekuma-logo"
                    onClick={this.props.returnToLandingPage}
                    onTouchTap={this.props.returnToLandingPage} >
                    <img id="tekuma-logo-image" src='assets/images/tekuma-black.svg' />
            	</div>
            	<div
                    className="header-icons logged-off"
                    onClick={this.props.togglePopover}
                    onTouchTap={this.props.togglePopover}>
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
