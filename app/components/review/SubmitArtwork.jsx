// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';
import uuid                         from 'uuid';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
// Files
import reviewStatus from '../../constants/reviewStatus';


/**
 * TODO
 */
export default class SubmitArtwork extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----SubmitArtwork");
    }

    render() {
        let styleBlock = {
            width   : "100%"
        }

        let styleResponsive = {
            width   : 0.96 * (window.innerWidth * 0.25 - 40) - 70 //
        };

        let styleFixed = {
            width   : 210 * 0.96 - 70   // Album locker width caps at 210px. An album is 96% of the locker. The avatar is 70px
        };
        const messageTooltip = (
            <Tooltip
                id="notification-tooltip"
                className="tooltip">
                You have a notification!
            </Tooltip>
        );

        const approvedTooltip = (
            <Tooltip
                id="approved-tooltip"
                className="tooltip">
                Artwork Approved!
            </Tooltip>
        );

        const heldTooltip = (
            <Tooltip
                id="held-tooltip"
                className="tooltip">
                Artwork Held
            </Tooltip>
        );

        const declinedTooltip = (
            <Tooltip
                id="declined-tooltip"
                className="tooltip">
                Artwork Declined
            </Tooltip>
        );

        const removeTooltip = (
            <Tooltip
                id="remove-tooltip"
                className="tooltip">
                Remove
            </Tooltip>
        );
        let thumbnail_url = this.props.paths.thmb128 + this.props.submit.artwork_uid;
        return (
            <li onClick     ={this.props.changeSubmitArtwork.bind({}, this.props.submit.artwork_uid)}
                className   ={(this.props.submitArtwork === this.props.submit.artwork_uid) ? "album review selected" : "album review"}>
                <div className="album-avatar">
                    <div
                        style={{backgroundImage : `url(${thumbnail_url})`}}
                        className="avatar-container" />
                </div>
                <h3
                    className   ={!this.props.submit.new_message && !this.props.submit.approved ? "album-name review no-notification": "album-name review"}
                    style={(window.innerWidth * 0.25 > 440) ? styleBlock: (window.innerWidth * 0.25 > 250) ? styleResponsive : styleFixed} >
                    {this.props.submit.artwork_name}
                </h3>
                <div className="album-tools bottom">
                        <div>
                            {!this.props.submit.new_message ?
                                null
                                :
                                <OverlayTrigger
                                    placement   ="bottom"
                                    overlay     ={messageTooltip}>
                                    <img
                                        className   ="album-tool review"
                                        src         ={(this.props.submitArtwork === this.props.submit.artwork_uid) ? 'assets/images/icons/mail-white.svg' : 'assets/images/icons/mail-pink.svg'}
                                    />
                                </OverlayTrigger>
                            }
                            {!this.props.submit.approved ?
                                null
                                :
                                <OverlayTrigger
                                    placement   ="bottom"
                                    overlay     ={approvedTooltip}>
                                    <img
                                        className   ="album-tool review"
                                        src         ={(this.props.submitArtwork === this.props.submit.artwork_uid) ? "assets/images/icons/approved-white.svg" : "assets/images/icons/approved-pink.svg"}
                                    />
                            </OverlayTrigger>
                            }
                            {!this.props.submit.declined ?
                                null
                                :
                                <OverlayTrigger
                                    placement   ="bottom"
                                    overlay     ={declinedTooltip}>
                                    <img
                                        className   ="album-tool review"
                                        src         ={(this.props.submitArtwork === this.props.submit.artwork_uid) ? "assets/images/icons/declined-white.svg" : "assets/images/icons/declined-pink.svg"}
                                    />
                            </OverlayTrigger>
                            }
                            {!this.props.submit.held ?
                                null
                                :
                                <OverlayTrigger
                                    placement   ="bottom"
                                    overlay     ={heldTooltip}>
                                    <img
                                        className   ="album-tool review"
                                        src         ={(this.props.submitArtwork === this.props.submit.artwork_uid) ? "assets/images/icons/held-white.svg" : "assets/images/icons/held-pink.svg"}
                                    />
                            </OverlayTrigger>
                            }
                        </div>
                </div>
            </li>
        );
    }

    componentDidMount() {
        console.log("+++++SubmitArtwork");

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount () {

    }

}
