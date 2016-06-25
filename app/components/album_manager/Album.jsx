import React from 'react';
import ArtworkStore from '../../stores/ArtworkStore';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../../constants/itemTypes';

const albumSource = {
    beginDrag(props) {
        return {
            id: props.album.id
        };
    }
};

const albumTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.album.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
        if(sourceId !== targetId) {
            targetProps.onMove({sourceId, targetId});
        }
    }
};

// Makes Album a Drag Source
@DragSource(ItemTypes.ALBUM, albumSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging() // map isDragging() state to isDragging prop
}))
// Makes Album a Drop Target
@DropTarget(ItemTypes.ALBUM, albumTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Album extends React.Component {
    constructor(props) {
        super(props);

        // Track 'editing' state.
        this.state = {
            editing: false
        };
    }

    render() {
        if(this.state.editing) {
            return this.renderEdit();
        }

        return this.renderAlbum();
    }

    renderEdit = () => {
        return (
            <li className={(this.props.currentAlbum === this.props.album.name.toLowerCase()) ? "album selected" : "album"}>
                <div className="album-avatar">
                    <img className="avatar-container" src={(this.props.album.name.search("Untitled") == -1) ? ArtworkStore.getState().artworks.find(artwork => artwork.album === this.props.album.name.toLowerCase()).image : "../../assets/images/icons/new-album.svg"} />
                </div>
                <div className="album-writing">
                    <input type="text"
                        className="edit-album"
                        ref={
                            (e) => e ? e.selectionStart = this.props.album.name.length : null
                        }
                        autoFocus={true}
                        defaultValue={this.props.album.name}
                        onBlur={this.finishEdit}
                        onKeyPress={this.checkEnter}
                        placeholder="Edit Album" />
                    <img className="album-more" src='assets/images/icons/more-white.svg' />
                </div>
            </li>
        );
    };

    renderAlbum = () => {
        const {connectDragSource, connectDropTarget, isDragging,
            id, onMove, ...props} = this.props;

        return connectDragSource(connectDropTarget(
            <li style={{opacity: isDragging ? 0 : 1}}
                onClick={this.props.changeAlbum}
                className={(this.props.currentAlbum === this.props.album.name.toLowerCase()) ? "album selected" : "album"}>
                <div className="album-avatar">
                    <img className="avatar-container" src={(this.props.album.name.search("Untitled") == -1) ? ArtworkStore.getState().artworks.find(artwork => artwork.album == this.props.album.name.toLowerCase()).image : "../../assets/images/icons/new-album.svg"} />
                </div>
                <div className="album-writing">
                    <h3 onClick={this.edit} className="album-name">{this.props.album.name}</h3>
                    <img
                        className="album-more"
                        onClick={this.props.onDelete}
                        src='assets/images/icons/more-white.svg' />
                </div>
            </li>
        ));
    };

    edit = (e) => {
        // Avoid bubbling to click that opens up album view
        e.stopPropagation();

        // Enter edit mode.
        this.setState({
            editing: true
        });
    };

    checkEnter = (e) => {
        // The user hit *enter*, let's finish up.
        if(e.key === 'Enter') {
            this.finishEdit(e);
        }
    };

    finishEdit = (e) => {
        const value = e.target.value;

        if(this.props.onEdit) {
            this.props.onEdit(value);

            // Exit edit mode.
            this.setState({
                editing: false
            });
        }
    }
}
