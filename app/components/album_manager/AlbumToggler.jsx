import React from 'react';

export default ({managerIsOpen, toggleManager, addAlbum}) => {
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
                data-tip="Add new album" >
                <img src='assets/images/icons/plus-white.svg' />
            </div>
            <div onClick={toggleManager}
                style={iconStyle}
                className={managerIsOpen ? "manager-icon toggle-manager" : "manager-icon toggle-manager closed"}>
                <img className="toggle"
                    src='assets/images/icons/arrow.svg'
                    data-tip="Toggle side drawer" />
            </div>
        </div>

    );
}
