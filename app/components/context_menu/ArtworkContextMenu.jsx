import React from "react";
import ReactDOM from "react-dom";
import {ContextMenu, MenuItem} from "react-contextmenu";

export default class ArtworkContextMenu extends React.Component {
    render() {
        return (
            <ContextMenu identifier="artwork-context-menu">
                <MenuItem>
                    <div className="context-icon-container">
                            <img src='../assets/images/icons/download-black.svg' />
                    </div>
    				<div className="context-writing">
    					<h3>Download</h3>
    				</div>
                </MenuItem>
                <MenuItem>
					<div className="context-icon-container">
                            <img src='../assets/images/icons/edit.svg' />
                    </div>
					<div className="context-writing">
						<h3>Edit</h3>
					</div>
                </MenuItem>
                <MenuItem onClick={this.props.onDelete}>
                    <div className="context-icon-container">
                            <img className="cross" src='../assets/images/icons/plus-black.svg' />
                    </div>
    				<div className="context-writing">
    					<h3>Delete</h3>
    				</div>
                </MenuItem>
            </ContextMenu>
        );
    }
}
