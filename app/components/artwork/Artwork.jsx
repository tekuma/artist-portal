import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../../constants/itemTypes';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';


const artworkSource = {
    beginDrag(props) {
        return {
            id: props.artwork.id,
            type: "artwork"
        };
    }
};

const artworkTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.artwork.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
        if(sourceId !== targetId) {
            targetProps.onMove({sourceId, targetId});
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
    render() {
        const {connectDragSource, connectDropTarget, isDragging,
            id, onMove, ...props} = this.props;

        const editTooltip = (
            <Tooltip
                id="edit-artwork-tooltip"
                className="tooltip">
                Edit
            </Tooltip>
        );

        const downloadTooltip = (
            <Tooltip
                id="download-artwork-tooltip"
                className="tooltip">
                Download
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
                    <img src={this.props.artwork.image} lowsrc="assets/images/artwork-substitute.png" />
                </div>
                <div className="artwork-info">
                    <h3 className="artwork-name">{this.props.artwork.title}</h3>
                    <h4 className="artwork-date">{this.props.artwork.year}</h4>
                    <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
                        <img
                            className="artwork-more"
                            src='assets/images/icons/delete-black.svg'
                            onClick={this.props.onDelete.bind(null, this.props.artwork.id)} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={editTooltip}>
                        <img
                            className="artwork-more"
                            src='assets/images/icons/edit.svg'
                            onClick={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={downloadTooltip}>
                        <a
                            href={this.props.artwork.image}
                            download={this.props.artwork.filename} >
                            <img
                                className="artwork-more"
                                src='assets/images/icons/download-black.svg' />
                        </a>
                    </OverlayTrigger>
                </div>
            </article>
        ));
    }
}
