// Libs
import React                    from "react";
import ReactDOM                 from "react-dom";
import {ContextMenu, MenuItem}  from "react-contextmenu";

/**
 * TODO
 */
export default class AlbumContextMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----AlbumContextMenu");
    }

    render() {
        return (
            <ContextMenu identifier="album-context-menu">
                <MenuItem>
                    <div className="context-icon-container">
                        <img src='../assets/images/icons/download-black.svg' />
                    </div>
    				<div className="context-writing">
    					<h3>Download</h3>
    				</div>
                </MenuItem>
                <MenuItem onClick={this.props.onDelete}>
                    <div className="context-icon-container">
                        <img
                            className   ="cross"
                            src         ='../assets/images/icons/plus-black.svg' />
                    </div>
    				<div className="context-writing">
    					<h3>Delete</h3>
    				</div>
                </MenuItem>
            </ContextMenu>
        );
    }

    componentDidMount() {
        console.log("+++++AlbumContextMenu");
    }
}
