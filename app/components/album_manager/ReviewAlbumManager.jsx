// Libs
import React                        from 'react';
import firebase                     from 'firebase';
import uuid                         from 'node-uuid';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
import update                       from 'react-addons-update';

// Files
import Albums                       from './Albums.jsx';

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

        const deleteTooltip = (
            <Tooltip
                id="delete-tooltip-regular"
                className="tooltip">
                Delete
            </Tooltip>
        );

        return (
            <section
                style={{
                    height: window.innerHeight - 60
                }}
                className="album-manager review">
                <div className="review-albums-heading">
                    <h2>
                        Albums
                    </h2>
                </div>
                <ul
                    style={{
                        height: window.innerHeight - 60 - 60
                    }}
                    className="album-locker">
                    <li className   ={"album review selected"}>
                        <div className="album-avatar">
                            <div
                                className="avatar-container" />
                        </div>
                        <h3 className   ="album-name" >
                            Impressions
                        </h3>
                        <div className="review-status">
                            <h4>
                                In Review
                            </h4>
                        </div>
                        <div className="album-tools top">
                            <OverlayTrigger
                                placement   ="bottom"
                                overlay     ={deleteTooltip}>
                                <img
                                    className   ="album-tool"
                                    src         ='assets/images/icons/delete-white.svg'
                                    onClick     ={this.props.onDelete}
                                    onTouchTap  ={this.props.onDelete}
                                />
                            </OverlayTrigger>
                        </div>
                    </li>
                    <li className   ={"album review"}>
                        <div className="album-avatar">
                            <div
                                className="avatar-container" />
                        </div>
                        <h3 className   ="album-name" >
                            Elephants
                        </h3>
                        <div className="review-status">
                            <h4>
                                Declined
                            </h4>
                        </div>
                        <div className="album-tools top">
                            <OverlayTrigger
                                placement   ="bottom"
                                overlay     ={deleteTooltip}>
                                <img
                                    className   ="album-tool"
                                    src         ='assets/images/icons/delete-white.svg'
                                    onClick     ={this.props.onDelete}
                                    onTouchTap  ={this.props.onDelete}
                                />
                            </OverlayTrigger>
                        </div>
                    </li>
                    <li className   ={"album review"}>
                        <div className="album-avatar">
                            <div
                                className="avatar-container" />
                        </div>
                        <h3 className   ="album-name" >
                            Sunsets
                        </h3>
                        <div className="review-status">
                            <h4>
                                Held
                            </h4>
                        </div>
                        <div className="album-tools top">
                            <OverlayTrigger
                                placement   ="bottom"
                                overlay     ={deleteTooltip}>
                                <img
                                    className   ="album-tool"
                                    src         ='assets/images/icons/delete-white.svg'
                                    onClick     ={this.props.onDelete}
                                    onTouchTap  ={this.props.onDelete}
                                />
                            </OverlayTrigger>
                        </div>
                    </li>
                </ul>
            </section>
        );
    }

    componentDidMount() {
        console.log("+++++ReviewAlbumManager");

    }

    componentWillReceiveProps(nextProps) {

    }
}
