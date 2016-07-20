// Libs
import React     from 'react';

// Files
import SearchBar from './SearchBar';

/**
 * TODO
 */
export default class PreAuthHeader extends React.Component {
    state = {
        searchOpen: false
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //pass
    }

    render() {
        return (
            <header className="pre-auth">
                <div className="header-icon home-icon" title="Go to Homepage">
                    <a href="http://tekuma.io">
                        <img src='assets/images/icons/home.svg' />
                    </a>
                </div>

            	<div
                    className="tekuma-logo"
                    onClick={this.props.returnToLandingPage}
                    >
                    <h1 className="pre-auth-header-logotype">TEKUMA</h1>
            	</div>
            	<div
                    className="header-icons logged-off"
                    onClick={this.props.toggleLogin}
                    >
                    <div className="header-writing" title="Log In to Tekuma">
                        <h3>Log In</h3>
                    </div>
        	    </div>
        	</header>
        );
    }

    componentDidMount() {
        //pass
    }

    // ----------- METHODS -----------

    /**
     * TODO
     */
    toggleSearch = () => {
        this.setState({
            searchOpen: !this.state.searchOpen
        });

        if(!this.state.searchOpen) {
            document.getElementById("search").value = "";
        }
    }

}
