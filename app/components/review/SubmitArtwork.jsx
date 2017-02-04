// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';
import uuid                         from 'uuid';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';


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
            width   : 0.96 * (window.innerWidth * 0.25 - 40) - 70
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

        const removeTooltip = (
            <Tooltip
                id="remove-tooltip"
                className="tooltip">
                Remove
            </Tooltip>
        );
        let thumbnail_url = this.props.paths.thmb128 + this.props.submit.artwork_uid;
        return (
            <li onClick     ={this.props.changeReviewArtwork.bind({}, this.props.submit.artwork_uid)}
                className   ={(this.props.reviewArtwork === this.props.submit.artwork_uid) ? "album review selected" : "album review"}>
                <div className="album-avatar">
                    <div
                        style={{backgroundImage : `url(${thumbnail_url})`}}
                        className="avatar-container" />
                </div>
                <h3
                    className   ="album-name review"
                    style={(window.innerWidth * 0.3 > 440) ? styleBlock: (window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed} >
                    {this.props.submit.artwork_name}
                </h3>
                {this.props.submit.new_message ?
                    <div className="album-tools bottom">
                        <OverlayTrigger
                            placement   ="right"
                            overlay     ={messageTooltip}>
                            <div>
                                <img
                                    className   ="album-tool review"
                                    src         ={(this.props.reviewArtwork === this.props.submit.artwork_uid) ? 'assets/images/icons/mail-white.svg' : 'assets/images/icons/mail-pink.svg'}
                                />
                            </div>
                        </OverlayTrigger>
                    </div>
                    :
                    <div className="submit-artwork-padding" />
                }
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
