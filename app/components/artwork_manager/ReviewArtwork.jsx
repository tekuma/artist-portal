// Libs
import React    from 'react';
import firebase from 'firebase';
import {DragSource, DropTarget} from 'react-dnd';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

// Files

export default class Artwork extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("------ReviewArtwork");
    }

    render() {

        let artworkImage = {
            backgroundImage: 'url(assets/starry.jpg)'
        }

        return (
            <article
                className="artwork review">
                <div
                    style={artworkImage}
                    className="artwork-image review">
                </div>
                <div className="artwork-status">
                    <div className="review-status">
                        <h5>
                            In Review
                        </h5>
                    </div>
                    <input id="publish-button1" className="button slide-square small" type="checkbox" />
                    <label
                        style={{
                            marginTop: 10
                        }}
                        htmlFor="publish-button1"></label>
                </div>
                <div className="artwork-review-tools">
                    <div className="review-delete">
                        <img src="assets/images/icons/delete-white.svg" />
                    </div>
                    <div className="review-message received">
                        <svg
                            version="1.1"
                            id="Layer_1"
                            x="0px"
                            y="0px"
                            width="50px"
                            height="50px"
                            viewBox="0 0 50 50"
                            enableBackground="new 0 0 50 50">
                            <path
                                id="mail-sleeve"
                                d="M47,11.833v26.334H3V11.833H47 M50,8.833H0v32.334h50V8.833L50,8.833z"/>
                            <polyline
                                id="mail-flap"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="3" strokeMiterlimit="10"
                                points="2.399,11.232 25,26.199 47.601,11.232 "/>
                        </svg>
                    </div>
                </div>
            </article>
        );
    }

    componentDidMount() {
        console.log("+++++++ReviewArtwork");
    }
}
