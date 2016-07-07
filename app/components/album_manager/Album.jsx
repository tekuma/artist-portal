import React from 'react';
import ReactDOM from "react-dom";
import ArtworkStore from '../../stores/ArtworkStore';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../../constants/itemTypes';
import ArtworkActions from '../../actions/ArtworkActions';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const albumSource = {
    beginDrag(props) {
        return {
            name: props.album.name,
            type: ItemTypes.ALBUM
        };
    }
};

const albumTarget = {
    hover(targetProps, monitor) {
        const target = targetProps.album;
        const source = monitor.getItem();
        if(source.name !== target.name) {
            if(source.type == ItemTypes.ALBUM) {
                // Move order of albums
                targetProps.onMove(source.name, target.name);
            }
        }
    },

    drop(targetProps, monitor) {
        const target = targetProps.album;
        const source = monitor.getItem();
        if(source.name !== target.name) {
            if(source.type == ItemTypes.ARTWORK) {
                // Move artwork to new album
                targetProps.changeArtworkAlbum(source.id, source.album, target.name);
                const thisUID  = firebase.auth().currentUser.uid;
                let path = 'public/onboarders/' + thisUID +'/artworks/' + source.id;
                let thisArtworkReference = firebase.database().ref(path);
                thisArtworkReference.update({album: target.name}).then( () => {
                    console.log("Artwork album changed within artwork");
                });
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
        var thumbnail = "../../assets/images/icons/new-album.svg";

        for (var artworkID in this.props.userInfo.artworks) {
            if (this.props.userInfo.artworks.hasOwnProperty(artworkID)) {
                let artwork = this.props.userInfo.artworks[artworkID];
                if (artwork.album == this.props.album.name) {
                    thumbnail = artwork.image;
                    console.log("Here is the thumbnail", thumbnail);
                }
            }
        }

        var style = {
            backgroundImage: 'url(' + thumbnail + ')'
        }

        const downloadTooltip = (
            <Tooltip
                id="download-tooltip-edit"
                className="tooltip">
                Download
            </Tooltip>
        );

        const deleteTooltip = (
            <Tooltip
                id="delete-tooltip-edit"
                className="tooltip">
                Delete
            </Tooltip>
        );

        return (
            <li className={(this.props.currentAlbum === this.props.album.name) ? "album selected" : "album"}>
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
                    <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
                        <img
                            className="album-more"
                            src='assets/images/icons/delete-white.svg'
                            onClick={this.props.onDelete} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={downloadTooltip}>
                        <img
                            className="album-more"
                            src='assets/images/icons/download-white.svg' />
                    </OverlayTrigger>
                </div>
            </li>
        );
    };

    renderAlbum = () => {
        const {connectDragSource, connectDropTarget, isDragging,
            id, onMove, ...props} = this.props;

        var thumbnail = "../../assets/images/icons/new-album.svg";

        for (var artworkID in this.props.userInfo.artworks) {
            if (this.props.userInfo.artworks.hasOwnProperty(artworkID)) {

                let artwork = this.props.userInfo.artworks[artworkID];
                if (artwork.album == this.props.album.name) {
                    thumbnail = artwork.image;
                    console.log("Here is the thumbnail", thumbnail);
                }
            }
        }

        var style = {
            backgroundImage: 'url(' + thumbnail + ')'
        }

        const downloadTooltip = (
            <Tooltip
                id="download-tooltip-regular"
                className="tooltip">
                Download
            </Tooltip>
        );

        const editTooltip = (
            <Tooltip
                id="edit-tooltip-regular"
                className="tooltip">
                Edit album name
            </Tooltip>
        );

        const deleteTooltip = (
            <Tooltip
                id="delete-tooltip-regular"
                className="tooltip">
                Delete
            </Tooltip>
        );

        return connectDragSource(connectDropTarget(
            <li style={{opacity: isDragging ? 0 : 1}}
                onClick={this.props.changeAlbum}
                className={(this.props.currentAlbum === this.props.album.name) ? "album selected" : "album"}>
                <div className="album-avatar">
                    <div style={style}
                        className="avatar-container" />
                </div>
                <div className="album-writing">
                    <OverlayTrigger placement="bottom" overlay={editTooltip}>
                        <h3 onClick={this.edit}
                            className="album-name" >
                            {this.props.album.name}</h3>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
                        <img
                            className="album-more"
                            src='assets/images/icons/delete-white.svg'
                            onClick={this.props.onDelete} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={downloadTooltip}>
                        <img
                            className="album-more"
                            src='assets/images/icons/download-white.svg' />
                    </OverlayTrigger>
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

        // if(this.props.onEdit) {
            this.props.onEdit(value);

            // Exit edit mode.
            this.setState({
                editing: false
            });
        // }
    }
}
