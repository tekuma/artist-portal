// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';
import uuid                         from 'node-uuid';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
import update                       from 'react-addons-update';
import TweenMax                     from 'gsap';

// Files
import Albums                       from './Albums.jsx';
import Views             from '../../constants/Views';

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
                className="album-manager review"
                style={{
                    height: window.innerHeight - 60,
                    left : this.props.currentAppLayout == Views.REVIEW ? 0 : -1 * window.innerWidth * 0.3
                }}>
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
                    <li onClick     ={this.props.changeAlbum.bind({}, "Impressions")}
                        className   ={(this.props.currentAlbum === "Impressions") ? "album review selected" : "album review"}>
                        <div className="album-avatar">
                            <div
                                style={{backgroundImage : 'url(assets/starry.jpg)'}}
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
                    <li onClick     ={this.props.changeAlbum.bind({}, "Elephants")}
                        className   ={(this.props.currentAlbum === "Elephants") ? "album review selected" : "album review"}>
                        <div className="album-avatar">
                            <div
                                style={{backgroundImage : 'url(assets/elephant.jpg)'}}
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
                    <li onClick     ={this.props.changeAlbum.bind({}, "Sunsets")}
                        className   ={(this.props.currentAlbum === "Sunsets") ? "album review selected" : "album review"}>
                        <div className="album-avatar">
                            <div
                                style={{backgroundImage : 'url(assets/sunset.jpg)'}}
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

    componentWillUnmount () {
        
    }
}
