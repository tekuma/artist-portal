import React from 'react';
import Header from './header/Header.jsx';
import MainView from './MainView.jsx';
import ReactTooltip from "react-tooltip";

export default ({navIsOpen, managerIsOpen, toggleManager, currentAlbum, changeAlbum}) => {
    return (
        <div className={navIsOpen ? "main-wrapper open" : "main-wrapper"}>
            <Header />
            <MainView
                navIsOpen={navIsOpen}
                managerIsOpen={managerIsOpen}
                toggleManager={toggleManager}
                currentAlbum={currentAlbum}
                changeAlbum={changeAlbum} />
            <ReactTooltip
                place="bottom"
                class="tooltip"
                delayShow={700}
                eventOff="click" />
        </div>
    );
}
