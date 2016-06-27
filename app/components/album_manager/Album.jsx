import React from 'react';
import ReactDOM from "react-dom";
import ArtworkStore from '../../stores/ArtworkStore';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../../constants/itemTypes';
import ArtworkActions from '../../actions/ArtworkActions';

const albumSource = {
    beginDrag(props) {
        return {
            id: props.album.id,
            type: "album"
        };
    }
};

const albumTarget = {
    hover(targetProps, monitor) {
        const target = targetProps.album;
        const source = monitor.getItem();
        if(source.id !== target.id) {
            if(source.type == "album") {
                // Move order of albums
                targetProps.onMove({source, target});
            } else {
                // Move artwork to new album
                ArtworkActions.changeAlbumField(source.id, target.name);
            }
        }
    }
};

// Makes Album a Drag Source
@DragSource(ItemTypes.ALBUM, albumSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging() // map isDragging() state to isDragging prop
}))
// Makes Album a Drop Target
@DropTarget([ItemTypes.ALBUM, ItemTypes.ARTWORK], albumTarget, (connect) => ({
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
        var thumbnail;

        if (typeof ArtworkStore.getState().artworks.find(artwork => artwork.album == this.props.album.name.toLowerCase()) == 'undefined') {
            thumbnail = "../../assets/images/icons/new-album.svg";
        } else {
            thumbnail = ArtworkStore.getState().artworks.find(artwork => artwork.album == this.props.album.name.toLowerCase()).image;
        }

        var style = {
            backgroundImage: 'url(' + thumbnail + ')'
        }

        return (
            <li className={(this.props.currentAlbum === this.props.album.name.toLowerCase()) ? "album selected" : "album"}>
                <div className="album-avatar">
                    <div style={style}
                        className="avatar-container" />
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
                        placeholder="Enter name" />
                    <img
                        className="album-more"
                        src='assets/images/icons/delete-white.svg'
                        onClick={this.props.onDelete}
                        data-tip="Delete" />
                    <img
                        className="album-more"
                        src='assets/images/icons/download-white.svg'
                        data-tip="Download" />
                </div>
            </li>
        );
    };

    renderAlbum = () => {
        const {connectDragSource, connectDropTarget, isDragging,
            id, onMove, ...props} = this.props;

        var thumbnail;

        if (typeof ArtworkStore.getState().artworks.find(artwork => artwork.album == this.props.album.name.toLowerCase()) == 'undefined') {
            thumbnail = "../../assets/images/icons/new-album.svg";
        } else {
            thumbnail = ArtworkStore.getState().artworks.find(artwork => artwork.album == this.props.album.name.toLowerCase()).image;
        }

        var style = {
            backgroundImage: 'url(' + thumbnail + ')'
        }

        return connectDragSource(connectDropTarget(
            <li style={{opacity: isDragging ? 0 : 1}}
                onClick={this.props.changeAlbum}
                className={(this.props.currentAlbum === this.props.album.name.toLowerCase()) ? "album selected" : "album"}>
                <div className="album-avatar">
                    <div style={style}
                        className="avatar-container" />
                </div>
                <div className="album-writing">
                    <h3 onClick={this.edit}
                        className="album-name"
                        data-tip="Edit album name" >
                        {this.props.album.name}</h3>
                    <img
                        className="album-more"
                        src='assets/images/icons/delete-white.svg'
                        onClick={this.props.onDelete}
                        data-tip="Delete" />
                    <img
                        className="album-more"
                        src='assets/images/icons/download-white.svg'
                        data-tip="Download" />
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
