import React from 'react';
import SearchBar from './SearchBar';

export default class LoggedOnHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchOpen: false
        };
    }
    render() {
        return (
            <header className="blue">
            	<div
                    className="tekuma-logo"
                    onClick={this.props.changeAppLayout.bind({}, "Artworks")}>
                        <img id="tekuma-logo-image" src='assets/images/tekuma-white.svg' />
            	</div>
            	<div className={this.state.searchOpen ? "header-icons search-open" : "header-icons"}>
        	    	<div
                        className="header-icon"
                        data-tip="Upload artworks"
                        onClick={this.props.changeAppLayout.bind({}, "Upload")}>
                        <img src='assets/images/icons/plus-pink.svg' />
        	    	</div>
        	    	<div
                        className="header-icon"
                        data-tip="Organize artworks"
                        onClick={this.props.changeAppLayout.bind({}, "Artworks")}>
                        <img src='assets/images/icons/organize.svg' />
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
