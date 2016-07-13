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
            <div
                onClick={toggleManager}
                onTouchTap={toggleManager}
                style={iconStyle}
                className={managerIsOpen ? "manager-icon toggle-manager" : "manager-icon toggle-manager closed"}>
                <img className="toggle"
                    src='assets/images/icons/arrow.svg' />
            </div>
        </div>

    );
}
