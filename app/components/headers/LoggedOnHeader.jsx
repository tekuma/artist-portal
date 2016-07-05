import React from 'react';
import SearchBar from './SearchBar';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default class LoggedOnHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchOpen: false
        };
    }
    render() {
        const addArtworkTooltip = (
            <Tooltip
                id="add-artwork-tooltip"
                className="tooltip">
                Upload artworks
            </Tooltip>
        );

        const organizeTooltip = (
            <Tooltip
                id="organize-tooltip"
                className="tooltip">
                Organize artworks
            </Tooltip>
        );

        return (
            <header className="blue">
            	<div
                    className="tekuma-logo"
                    onClick={this.props.changeAppLayout.bind({}, "Artworks")}>
                        <img id="tekuma-logo-image" src='assets/images/tekuma-white.svg' />
            	</div>
            	<div className={this.state.searchOpen ? "header-icons search-open" : "header-icons"}>
                    <OverlayTrigger placement="bottom" overlay={addArtworkTooltip}>
            	    	<div
                            className="header-icon"
                            onClick={this.props.changeAppLayout.bind({}, "Upload")}>
                            <img src='assets/images/icons/plus-pink.svg' />
            	    	</div>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={organizeTooltip}>
            	    	<div
                            className="header-icon"
                            onClick={this.props.changeAppLayout.bind({}, "Artworks")}>
                            <img src='assets/images/icons/organize.svg' />
            	    	</div>
                    </OverlayTrigger>
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
