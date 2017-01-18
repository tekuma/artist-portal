// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';
import uuid                         from 'node-uuid';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';


/**
 * TODO
 */
export default class ReviewArtwork extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ReviewArtwork");
    }

    render() {
        let styleResponsive = {
            width   : 0.96 * (window.innerWidth * 0.25 - 40) - 70
        };

        let styleFixed = {
            width   : 210 * 0.96 - 70   // Album locker width caps at 210px. An album is 96% of the locker. The avatar is 70px
        };
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
                    style={(window.innerWidth * 0.25 > 250) ? styleResponsive : styleFixed} >
                    {this.props.submit.artwork_name}
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
        );
    }

    componentDidMount() {
        console.log("+++++ReviewArtwork");

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount () {

    }

}
