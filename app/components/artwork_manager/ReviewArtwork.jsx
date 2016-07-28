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

        return (
            <article
                className="artwork">
                <div
                    className="artwork-image"

                    >
                    <img src="assets/starry.jpg" />
                </div>
                <div className="artwork-info review">
                    <h3 className="artwork-name review">Starry Night</h3>
                </div>
            </article>
        );
    }

    componentDidMount() {
        console.log("+++++++ReviewArtwork");
    }
}
