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
            id: props.artwork.id,
            album: props.artwork.album,
            type: ItemTypes.ARTWORK
        }
    }
};

const artworkTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.artwork.id;
        console.log("Target ID: ", targetId);
        const sourceProps = monitor.getItem();
        console.log("SourceProps: ", sourceProps);
        const sourceId = sourceProps.id;
        if(sourceId != targetId) {
            console.log("Source ID != Target ID");
            targetProps.onMove(sourceId, targetId);
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

        const deleteTooltip = (
            <Tooltip
                id="delete-artwork-tooltip"
                className="tooltip">
                Delete
            </Tooltip>
        );

        return connectDragSource(connectDropTarget(
            <article
                style={{opacity: isDragging ? 0 : 1}}
                className="artwork">
                <div className="artwork-image">
                    <img src={this.props.artwork.thumbnail} />
                </div>
                <div className="artwork-info">
                    <h3 className="artwork-name">{this.props.artwork.title}</h3>
                    <div className="download-edit-delete">
                        <a
                            href={this.props.artwork.fullsize_url}
                            download={this.props.artwork.filename} >
                            <OverlayTrigger placement="bottom" overlay={downloadTooltip}>
                                <img
                                    className="artwork-more"
                                    src='assets/images/icons/download-black.svg' />
                            </OverlayTrigger>
                        </a>
                        <OverlayTrigger placement="bottom" overlay={editTooltip}>
                            <img
                                className="artwork-more"
                                src='assets/images/icons/edit-black.svg'
                                onClick={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                                 />
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
                            <img
                                className="artwork-more"
                                src='assets/images/icons/delete-black.svg'
                                onClick={this.props.onDelete.bind(null, this.props.artwork.id)}
                                />
                        </OverlayTrigger>
                    </div>
                </div>
            </article>
        ));
    }

    componentDidMount() {
        console.log("+++++++Artwork");
    }
}
