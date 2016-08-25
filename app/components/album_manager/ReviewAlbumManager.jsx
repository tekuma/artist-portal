// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';
import uuid                         from 'node-uuid';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
import update                       from 'react-addons-update';

// Files
import Albums                       from './Albums.jsx';
import Views             from '../../constants/Views';
import AlbumToggler                 from './AlbumToggler';

/**
 * TODO
 */
export default class ReviewAlbumManager extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ReviewAlbumManager");
    }

    render() {
        if(this.props.managerIsOpen) {
            return this.openedManager();
        } else {
            return this.closedManager();
        }
    }

    componentDidMount() {
        console.log("+++++ReviewAlbumManager");

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount () {

    }

// ============= Flow Control ===============

    openedManager = () => {
        const messagesTooltip = (
            <Tooltip
                id="notifications-tooltip"
                className="tooltip">
                Notifications
            </Tooltip>
        );

        const removeTooltip = (
            <Tooltip
                id="remove-tooltip"
                className="tooltip">
                Remove
            </Tooltip>
        );

        let styleResponsive = {
            width   : 0.96 * (window.innerWidth * 0.25 - 40) - 70
        };

        let styleFixed = {
            width   : 210 * 0.96 - 70   // Album locker width caps at 210px. An album is 96% of the locker. The avatar is 70px
        };

        return (
            <section
                className="album-manager review"
                style={{
                    height: window.innerHeight - 60,
                    left :  0
                }}>
                <AlbumToggler
                    height          ={window.innerHeight - 60}
                    float           ={"right"}
                    background      ={"#111111"}
                    managerIsOpen   ={this.props.managerIsOpen}
                    toggleManager   ={this.props.toggleManager} />
                <ul
                    style={{
                        height: window.innerHeight - 60
                    }}
                    className="album-locker">
                    <li onClick     ={this.props.changeAlbum.bind({}, "Impressions")}
                        className   ={(this.props.currentAlbum === "Impressions") ? "album review selected" : "album review"}>
                        <div className="album-avatar">
                            <div
                                style={{backgroundImage : 'url(assets/starry.jpg)'}}
                                className="avatar-container" />
                        </div>
                        <h3
                            className   ="album-name review"
                            style={(window.innerWidth * 0.25 > 250) ? styleResponsive : styleFixed} >
                            Impressions of a Crazy Man
                        </h3>
                        <div className="album-tools bottom">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={messagesTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool review"
                                        src         ='assets/images/icons/mail-white.svg'
                                    />
                                    <h5 className="album-tool message-count">1</h5>
                                </div>
                            </OverlayTrigger>
                        </div>
                        <div className="album-tools top">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={removeTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool"
                                        src         ='assets/images/icons/delete-white.svg'
                                    />
                                </div>
                            </OverlayTrigger>
                        </div>
                    </li>
                    <li onClick     ={this.props.changeAlbum.bind({}, "Elephants")}
                        className   ={(this.props.currentAlbum === "Elephants") ? "album review selected" : "album review"}>
                        <div className="album-avatar">
                            <div
                                style={{backgroundImage : 'url(assets/elephant.jpg)'}}
                                className="avatar-container" />
                        </div>
                        <h3
                            className   ="album-name review"
                            style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed} >
                            Elephants
                        </h3>
                        <div className="album-tools bottom">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={messagesTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool review"
                                        src         ='assets/images/icons/mail-white.svg'
                                    />
                                    <h5 className="album-tool message-count">0</h5>
                                </div>
                            </OverlayTrigger>
                        </div>
                        <div className="album-tools top">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={removeTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool"
                                        src         ='assets/images/icons/delete-white.svg'
                                    />
                                </div>
                            </OverlayTrigger>
                        </div>
                    </li>
                    <li onClick     ={this.props.changeAlbum.bind({}, "Sunsets")}
                        className   ={(this.props.currentAlbum === "Sunsets") ? "album review selected" : "album review"}>
                        <div className="album-avatar">
                            <div
                                style={{backgroundImage : 'url(assets/sunset.jpg)'}}
                                className="avatar-container" />
                        </div>
                        <h3
                            className   ="album-name review"
                            style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed} >
                            Sunsets
                        </h3>
                        <div className="album-tools bottom">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={messagesTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool review"
                                        src         ='assets/images/icons/mail-white.svg'
                                    />
                                    <h5 className="album-tool message-count">0</h5>
                                </div>
                            </OverlayTrigger>
                        </div>
                        <div className="album-tools top">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={removeTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool"
                                        src         ='assets/images/icons/delete-white.svg'
                                    />
                                </div>
                            </OverlayTrigger>
                        </div>
                    </li>
                </ul>
            </section>
        );
    }

    closedManager = () => {
        const messagesTooltip = (
            <Tooltip
                id="notifications-tooltip"
                className="tooltip">
                Notifications
            </Tooltip>
        );

        const removeTooltip = (
            <Tooltip
                id="remove-tooltip"
                className="tooltip">
                Remove
            </Tooltip>
        );

        let styleResponsive = {
            width   : 0.96 * (window.innerWidth * 0.25 - 40) - 70
        };

        let styleFixed = {
            width   : 210 * 0.96 - 70   // Album locker width caps at 210px. An album is 96% of the locker. The avatar is 70px
        };

        return (
            <section
                className="album-manager review"
                style={{
                    height: window.innerHeight - 60,
                    left: -1 * document.getElementsByClassName('album-manager')[0].clientWidth + 40
                }}>
                <AlbumToggler
                    height          ={window.innerHeight - 60}
                    float           ={"right"}
                    background      ={"#111111"}
                    managerIsOpen   ={this.props.managerIsOpen}
                    toggleManager   ={this.props.toggleManager} />
                <ul
                    style={{
                        height: window.innerHeight - 60
                    }}
                    className="album-locker">
                    <li onClick     ={this.props.changeAlbum.bind({}, "Impressions")}
                        className   ={(this.props.currentAlbum === "Impressions") ? "album review selected" : "album review"}>
                        <div className="album-avatar">
                            <div
                                style={{backgroundImage : 'url(assets/starry.jpg)'}}
                                className="avatar-container" />
                        </div>
                        <h3
                            className   ="album-name review"
                            style={(window.innerWidth * 0.25 > 250) ? styleResponsive : styleFixed} >
                            Impressions of a Crazy Man
                        </h3>
                        <div className="album-tools bottom">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={messagesTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool review"
                                        src         ='assets/images/icons/mail-white.svg'
                                    />
                                    <h5 className="album-tool message-count">1</h5>
                                </div>
                            </OverlayTrigger>
                        </div>
                        <div className="album-tools top">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={removeTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool"
                                        src         ='assets/images/icons/delete-white.svg'
                                    />
                                </div>
                            </OverlayTrigger>
                        </div>
                    </li>
                    <li onClick     ={this.props.changeAlbum.bind({}, "Elephants")}
                        className   ={(this.props.currentAlbum === "Elephants") ? "album review selected" : "album review"}>
                        <div className="album-avatar">
                            <div
                                style={{backgroundImage : 'url(assets/elephant.jpg)'}}
                                className="avatar-container" />
                        </div>
                        <h3
                            className   ="album-name review"
                            style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed} >
                            Elephants
                        </h3>
                        <div className="album-tools bottom">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={messagesTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool review"
                                        src         ='assets/images/icons/mail-white.svg'
                                    />
                                    <h5 className="album-tool message-count">0</h5>
                                </div>
                            </OverlayTrigger>
                        </div>
                        <div className="album-tools top">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={removeTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool"
                                        src         ='assets/images/icons/delete-white.svg'
                                    />
                                </div>
                            </OverlayTrigger>
                        </div>
                    </li>
                    <li onClick     ={this.props.changeAlbum.bind({}, "Sunsets")}
                        className   ={(this.props.currentAlbum === "Sunsets") ? "album review selected" : "album review"}>
                        <div className="album-avatar">
                            <div
                                style={{backgroundImage : 'url(assets/sunset.jpg)'}}
                                className="avatar-container" />
                        </div>
                        <h3
                            className   ="album-name review"
                            style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed} >
                            Sunsets
                        </h3>
                        <div className="album-tools bottom">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={messagesTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool review"
                                        src         ='assets/images/icons/mail-white.svg'
                                    />
                                    <h5 className="album-tool message-count">0</h5>
                                </div>
                            </OverlayTrigger>
                        </div>
                        <div className="album-tools top">
                            <OverlayTrigger
                                placement   ="right"
                                overlay     ={removeTooltip}>
                                <div>
                                    <img
                                        className   ="album-tool"
                                        src         ='assets/images/icons/delete-white.svg'
                                    />
                                </div>
                            </OverlayTrigger>
                        </div>
                    </li>
                </ul>
            </section>
        );
    }
}
