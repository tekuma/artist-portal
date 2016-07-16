import React from 'react';

/**
 * TODO
 */
export default ({managerIsOpen, toggleManager, addAlbum}) => {
    let componentStyle = {
        height: window.innerHeight - 60
    };

    let iconStyle = {
        height: window.innerHeight - 60
    };

    return (
        <div
            style       ={componentStyle}
            className   ="manager-opener">
            <div
                onClick     ={toggleManager}
                style       ={iconStyle}
                className   ={managerIsOpen ? "manager-icon toggle-manager" : "manager-icon toggle-manager closed"}>
                <img
                    className   ="toggle"
                    src         ='assets/images/icons/arrow.svg' />
            </div>
        </div>

    );
}
