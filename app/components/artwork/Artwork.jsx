import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../../constants/itemTypes';
import {ContextMenuLayer} from "react-contextmenu";
import ArtworkContextMenu from '../context_menu/ArtworkContextMenu';

//Component on which context-menu must be triggred
@ContextMenuLayer("artwork-context-menu")
export default class ArtworkContextButton extends React.Component {
    render() {
        return (
            <div>
                <img
                    className="artwork-more"
                    src='assets/images/icons/more-black.svg' />
            </div>
        );
    }
}

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

        return connectDragSource(connectDropTarget(
            <article
                style={{opacity: isDragging ? 0 : 1}}
                className="artwork">
                <div className="artwork-image">
                    <img src={this.props.artwork.image} />
                </div>
                <div className="artwork-info">
                    <h3 className="artwork-name">{this.props.artwork.title}</h3>
                    <h4 className="artwork-date">{this.props.artwork.year}</h4>
                    <ArtworkContextButton />
                </div>
                <ArtworkContextMenu
                    onDelete={this.props.onDelete} />
            </article>
        ));
    }
}
