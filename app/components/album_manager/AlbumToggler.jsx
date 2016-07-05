import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default ({managerIsOpen, toggleManager, addAlbum}) => {
    var componentStyle = {
        height: window.innerHeight - 60
    };

    var iconStyle = {
        height: window.innerHeight - 120
    };

    const addAlbumTooltip = (
        <Tooltip
            id="add-album-tooltip"
            className="tooltip">
            Create new album
        </Tooltip>
    );

    return (
        <div style={componentStyle} className="manager-opener">
            <OverlayTrigger placement="bottom" overlay={addAlbumTooltip}>
                <div onClick={addAlbum}
                    className="manager-icon add-album" >
                    <img src='assets/images/icons/plus-white.svg' />
                </div>
            </OverlayTrigger>
            <div onClick={toggleManager}
                style={iconStyle}
                className={managerIsOpen ? "manager-icon toggle-manager" : "manager-icon toggle-manager closed"}>
                <img className="toggle"
                    src='assets/images/icons/arrow.svg' />
            </div>
        </div>

    );
}
