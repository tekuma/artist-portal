import React from 'react';

export default ({managerOpen, toggleManager, addAlbum}) => {
    var componentStyle = {
        height: window.innerHeight - 60
    };

    var iconStyle = {
        height: window.innerHeight - 120
    };

    return (
        <div style={componentStyle} className="manager-opener">
            <div onClick={addAlbum}
                className="manager-icon add-album"
                data-tip="Click to add new album" >
                <img src='assets/images/icons/plus-white.svg' />
            </div>
            <div onClick={toggleManager}
                style={iconStyle}
                className={managerOpen ? "manager-icon toggle-manager" : "manager-icon toggle-manager closed"}>
                <img className="toggle"
                    src='assets/images/icons/arrow.svg'
                    data-tip="Close side drawer" />
            </div>
        </div>

    );
}
