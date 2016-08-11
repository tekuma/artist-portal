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
                <header className="black">
                	<div
                        className="tekuma-logo"
                        onClick={this.props.changeAppLayout.bind({}, Views.ARTWORKS)}
                        onTouchTap={this.props.changeAppLayout.bind({}, Views.ARTWORKS)}
                  >
                      <svg version="1.0" id="tekuma-logo-image-small" x="0px" y="0px" viewBox="0 0 1000 1000">
                        <g>
                            <g>
                                <rect x="56.8" y="57.4" width="886.3" height="886.3"/>
                                <rect x="322.7" y="323.3" width="354.5" height="354.5"/>
                                <line x1="677.3" y1="323.3" x2="943.2" y2="57.4"/>
                                <line x1="322.7" y1="323.3" x2="56.8" y2="57.4"/>
                                <line x1="322.7" y1="677.9" x2="56.8" y2="943.8"/>
                                <line x1="677.3" y1="677.9" x2="943.2" y2="943.8"/>
                            </g>
                        </g>
                      </svg>

                	</div>
                	<div className="header-icons">
                        <OverlayTrigger placement="bottom" overlay={addArtworkTooltip}>
                	    	<div
                                className="header-icon"
                                onClick={this.onOpenClick}
                                onTouchTap={this.onOpenClick}
                                >
                                <img src='assets/images/icons/plus-pink.svg' />
                	    	</div>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={organizeTooltip}>
                	    	<div
                                className="header-icon"
                                onClick={this.props.changeAppLayout.bind({}, Views.ARTWORKS)}
                                onTouchTap={this.props.changeAppLayout.bind({}, Views.ARTWORKS)}
                                >
                                <img src='assets/images/icons/organize.svg' />
                	    	</div>
                        </OverlayTrigger>
            	    </div>
            	</header>
                <Dropzone
                    style={{display: "none"}}
                    accept="image/png, image/jpeg"
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
