// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';
import uuid                         from 'node-uuid';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
import update                       from 'react-addons-update';

// Files
import Views             from '../../constants/Views';
import AlbumToggler      from '../album_manager/AlbumToggler';
import ReviewArtwork     from './ReviewArtwork';

/**
 * TODO
 */
export default class ReviewArtworkManager extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ReviewArtworkManager");
    }

    render() {
        if(this.props.managerIsOpen) {
            return this.openedManager();
        } else {
            return this.closedManager();
        }
    }

    componentDidMount() {
        console.log("+++++ReviewArtworkManager");

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount () {

    }

// ============= Flow Control ===============

    openedManager = () => {
        let submitList = [];
        for (var submit in this.props.submits) {
            if (this.props.submits.hasOwnProperty(submit)) {
                submitList.push(this.props.submits[submit]);
            }
        }

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
                    {submitList.map(submit => {
                        return(
                            <ReviewArtwork
                                submit={submit}
                                paths={this.props.paths}
                                reviewArtwork={this.props.reviewArtwork}
                                changeReviewArtwork={this.props.changeReviewArtwork}
                                />
                        );
                    })}
                </ul>
            </section>
        );
    }

    closedManager = () => {
        let submitList = [];
        for (var submit in this.props.submits) {
            if (this.props.submits.hasOwnProperty(submit)) {
                submitList.push(this.props.submits[submit]);
            }
        }

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
                    {submitList.map(submit => {
                        return(
                            <ReviewArtwork
                                submit={submit}
                                paths={this.props.paths}
                                reviewArtwork={this.props.reviewArtwork}
                                changeReviewArtwork={this.props.changeReviewArtwork}
                                />
                        );
                    })}
                </ul>
            </section>
        );
    }
}
