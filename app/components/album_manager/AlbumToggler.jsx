import React from 'react';

/**
 * TODO
 */
export default ({managerIsOpen, toggleManager, height, background}) => {
    let componentStyle = {
        height: height,
        background: background
    };

    let iconStyle = {
        height: height
    };

    return (
        <div
            style       ={componentStyle}
            className   ="manager-opener">
            <div
                onClick     ={toggleManager}
                style       ={iconStyle}
                className   ={managerIsOpen ? "manager-icon-wrapper toggle-manager" : "manager-icon-wrapper toggle-manager closed"}>
                <svg
                    version="1.1"
                    id="manager-icon"
                    x="0px"
                    y="0px"
                    width="50px"
                    height="50px"
                    viewBox="0 0 50 50"
                    enableBackground="new 0 0 50 50">
                     <polygon
                         points="15.14,49.86 11.398,46.118 32.649,24.866 11.531,3.749 15.14,0.14 40,25 "/>
                </svg>

            </div>
        </div>

    );
}
