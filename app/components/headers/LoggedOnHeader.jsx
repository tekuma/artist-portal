import React from 'react';
import SearchBar from './SearchBar';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

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
            <div>
                <header className="blue">
                	<div
                        className="tekuma-logo"
                        onClick={this.props.changeAppLayout.bind({}, "Artworks")}
                        onTouchTap={this.props.changeAppLayout.bind({}, "Artworks")}>
                            <img id="tekuma-logo-image" src='assets/images/tekuma-white.svg' />
                	</div>
                	<div className={this.state.searchOpen ? "header-icons search-open" : "header-icons"}>
                        <OverlayTrigger placement="bottom" overlay={addArtworkTooltip}>
                	    	<div
                                className="header-icon"
                                onClick={this.onOpenClick}
                                onTouchTap={this.onOpenClick}>
                                <img src='assets/images/icons/plus-pink.svg' />
                	    	</div>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={organizeTooltip}>
                	    	<div
                                className="header-icon"
                                onClick={this.props.changeAppLayout.bind({}, "Artworks")}
                                onTouchTap={this.props.changeAppLayout.bind({}, "Artworks")}>
                                <img src='assets/images/icons/organize.svg' />
                	    	</div>
                        </OverlayTrigger>
            	    </div>
            	</header>
                <Dropzone
                    style={{display: "none"}}
                    accept="image/*"
                    disableClick
                    onDrop={this.onDrop}
                    ref="dropzone">
                </Dropzone>
            </div>
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

    onOpenClick = (files) => {
        this.refs.dropzone.open();
    }

    onDrop = (files) => {
        this.props.setUploadedFiles(files);
        this.props.changeAppLayout("Artworks");
        console.log('Set uploaded files: ', files);
    }
}
