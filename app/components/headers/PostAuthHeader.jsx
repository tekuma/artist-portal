// Libs
import React     from 'react';
import SearchBar from './SearchBar';
import Dropzone  from 'react-dropzone';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

// Files
import Views from '../../constants/Views';

/**
 * TODO
 */
export default class PostAuthHeader extends React.Component {
    state = {
        searchOpen: false // 
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----PostAuthHeader");
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
                        onClick={this.props.changeAppLayout.bind({}, Views.ARTWORKS)}
                  >

                    <img id="tekuma-logo-image-small" src='assets/images/logo-white.svg' />

                	</div>
                	<div className={this.state.searchOpen ? "header-icons search-open" : "header-icons"}>
                        <OverlayTrigger placement="bottom" overlay={addArtworkTooltip}>
                	    	<div
                                className="header-icon"
                                onClick={this.onOpenClick}
                                >
                                <img src='assets/images/icons/plus-pink.svg' />
                	    	</div>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={organizeTooltip}>
                	    	<div
                                className="header-icon"
                                onClick={this.props.changeAppLayout.bind({}, Views.ARTWORKS)}
                                >
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

    componentDidMount() {
        console.log("+++++PostAuthHeader");
    }

    componentWillReceiveProps(nextProps) {
        //Pass
    }

    // ------------ METHODS -------------

    /**
     * TODO
     * @return {[type]} [description]
     */
    toggleSearch = () => {
        this.setState({
            searchOpen: !this.state.searchOpen
        });

        if(!this.state.searchOpen) {
            document.getElementById("search").value = "";
        }
    };

    /**
     * TODO
     * @param  {[type]} files [description]
     * @return {[type]}       [description]
     */
    onOpenClick = (files) => {
        this.refs.dropzone.open();
    }

    /**
     * TODO
     * @param  {[type]} files [description]
     * @return {[type]}       [description]
     */
    onDrop = (files) => {
        this.props.setUploadedFiles(files);
        this.props.changeAppLayout(Views.ARTWORKS);
        console.log('Set uploaded files: ', files);
    }

}
