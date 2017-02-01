// Libs
import React    from 'react';
import firebase from 'firebase';
import {DragSource, DropTarget} from 'react-dnd';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

// Files
import ItemTypes from '../../constants/itemTypes';


//drag drop stuff
const artworkSource = {
    beginDrag(props) {
        return {
            id   : props.artwork.id,
            album: props.artwork.album,
            type : ItemTypes.ARTWORK
        }
    }
};

const artworkTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.artwork.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
        if(sourceId != targetId) {
            targetProps.onMove(sourceProps.album,sourceId, targetId);
        }
    }
};

// Makes Artwork a Drag Source
@DragSource(ItemTypes.ARTWORK, artworkSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging() // map isDragging() state to isDragging prop
}))
// Makes Artwork a Drop Target
@DropTarget(ItemTypes.ARTWORK, artworkTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Artwork extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("------Artwork");
    }


    render() {
        const {connectDragSource, connectDropTarget, isDragging,
            id, onMove, ...props} = this.props;

        const downloadTooltip = (
            <Tooltip
                id="download-artwork-tooltip"
                className="tooltip">
                Download
            </Tooltip>
        );

        const editTooltip = (
            <Tooltip
                id="edit-artwork-tooltip"
                className="tooltip">
                Edit
            </Tooltip>
        );

        const infoTooltip = (
            <Tooltip
                id="info-artwork-tooltip"
                className="tooltip">
                Artwork Info
            </Tooltip>
        );

        const deleteTooltip = (
            <Tooltip
                id="delete-artwork-tooltip"
                className="tooltip">
                Delete
            </Tooltip>
        );

        const submitTooltip = (
            <Tooltip
                id="download-artwork-tooltip"
                className="tooltip">
                Submit to Tekuma!
            </Tooltip>
        );

        const submittedTooltip = (
            <Tooltip
                className="tooltip">
                Artwork submitted!
            </Tooltip>
        );

        let hideStyle = {
            display: 'none'
        };

        return connectDragSource(connectDropTarget(
            <article
                style={{opacity: isDragging ? 0 : 1}}
                className="artwork">
                <OverlayTrigger placement="top" overlay={this.props.artwork.submitted ? submittedTooltip : submitTooltip}>
                    <div
                        className="artwork-image"
                        onClick={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                        onTouchTap={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                        >
                        <img src={this.props.paths.images + this.props.artwork.id} />
                    </div>
                </OverlayTrigger>
                <div className={this.props.artwork.submitted ? "artwork-info submitted": "artwork-info"}>
                    <h3 className={this.props.artwork.submitted ? "artwork-name submitted": "artwork-name"}>{this.props.artwork.title}</h3>
                    <div className={this.props.artwork.submitted ? "artwork-tools submitted": "artwork-tools"}>
                        <OverlayTrigger placement="bottom" overlay={submitTooltip}>
                            <img
                                className={this.props.artwork.submitted ? "artwork-tool submitted": "artwork-tool"}
                                style={this.props.artwork.submitted ? hideStyle: null}
                                src='assets/images/icons/submit-black.svg'
                                onClick={this.props.onSubmit.bind(null, this.props.artwork)}
                                onTouchTap={this.props.onSubmit.bind(null, this.props.artwork)}
                                 />
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={this.props.artwork.submitted ? infoTooltip : editTooltip}>
                            <img
                                className={this.props.artwork.submitted ? "artwork-tool submitted": "artwork-tool"}
                                src={this.props.artwork.submitted ? 'assets/images/icons/info-white.svg':'assets/images/icons/edit-black.svg'}
                                onClick={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.submitted, this.props.artwork.album)}
                                onTouchTap={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.submitted, this.props.artwork.album)}
                                 />
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
                            <img
                                className={this.props.artwork.submitted ? "artwork-tool submitted": "artwork-tool"}
                                src={this.props.artwork.submitted ? 'assets/images/icons/delete-white.svg':'assets/images/icons/delete-black.svg'}
                                onClick={this.props.onDelete.bind(null, this.props.artwork.id, this.props.artwork.submitted)}
                                onTouchTap={this.props.onDelete.bind(null, this.props.artwork.id, this.props.artwork.submitted)}
                                />
                        </OverlayTrigger>
                        <a
                            href={this.props.artwork.fullsize_url}
                            download={this.props.artwork.filename} >
                            <OverlayTrigger placement="bottom" overlay={downloadTooltip}>
                                <img
                                    className={this.props.artwork.submitted ? "artwork-tool submitted": "artwork-tool"}
                                    src={this.props.artwork.submitted ? 'assets/images/icons/download-white.svg':'assets/images/icons/download-black.svg'}
                                     />
                            </OverlayTrigger>
                        </a>
                    </div>
                </div>
            </article>
        ));
    }

    componentDidMount() {
        console.log("+++++++Artwork");
    }
}
