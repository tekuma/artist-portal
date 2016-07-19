// Libs
import React                        from 'react';
import ReactDOM                     from "react-dom";
import {DragSource, DropTarget}     from 'react-dnd';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';

// Files
import ItemTypes                    from '../../constants/itemTypes';

// ============= Drag and Drop ===============

const albumSource = {
    beginDrag(props) {
        return {
            album: props.album,
            type: ItemTypes.ALBUM
        };
    }
};

const albumTarget = {
    hover(targetProps, monitor) {
        const target = targetProps.album;
        const source = monitor.getItem();
        if(source.album.name !== target.name) {
            if(source.type == ItemTypes.ALBUM) {
                // Move order of albums
                targetProps.onMove(source, target);
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

                // Change album within artwork JSON
                const thisUID  = firebase.auth().currentUser.uid;
                let path = `public/onboarders/${thisUID}/artworks/${source.id}`;
                let thisArtworkRef = firebase.database().ref(path);
                thisArtworkRef.transaction((data) => {
                    data['album'] = target.name;
                    return data;
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

/**
 * TODO
 */
export default class Album extends React.Component {
    state = {
        editing: false  // Track editing state of the album name
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Album");
    }

    render() {
        if(this.state.editing) {
            return this.renderEdit();
        } else {
            return this.renderAlbum();
        }
    }

    componentDidMount() {
        console.log("+++++Album");
    }

// ============= Flow Control ===============

    renderEdit = () => {
        let thumbnail = "../../assets/images/icons/new-album.svg";

        // Set avatar thumbnail
        for (let artworkID in this.props.user.artworks) {
            if (this.props.user.artworks.hasOwnProperty(artworkID)) {
                let artwork = this.props.user.artworks[artworkID];
                if (artwork.album == this.props.album.name) {
                    let image = this.props.thumbnail(artwork.fullsize_url, 50);
                    thumbnail = image;
                }
            }
        }

        let avatarStyle = {
            backgroundImage: 'url(' + thumbnail + ')'
        }

        let styleResponsive = {
            width   : 0.96 * (window.innerWidth * 0.3 - 40) - 70
        };

        let styleFixed = {
            width   : 210 * 0.96 - 70   // Album locker width caps at 210px. An album is 96% of the locker. The avatar is 70px
        };


        const downloadTooltip = (
            <Tooltip
                id="download-tooltip-edit"
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
                id="delete-tooltip-edit"
                className="tooltip">
                Delete
            </Tooltip>
        );

        return (
            <li className={(this.props.currentAlbum === this.props.album.name) ? "album selected" : "album"}>
                <div className="album-avatar">
                    <div style={avatarStyle}
                        className="avatar-container" />
                </div>
                <div
                    className="album-edit"
                    style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed}>
                    <input type="text"
                        className="album-edit-input"
                        ref={
                            (e) => e ? e.selectionStart = this.props.album.name.length : null
                        }
                        autoFocus       ={true}
                        defaultValue    ={this.props.album.name}
                        onBlur          ={this.finishEdit}
                        onKeyPress      ={this.checkEnter}
                        placeholder     ="Enter name" />
                </div>
                <div className="album-download-delete">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={editTooltip}>
                        <img
                            className="album-more"
                            src='assets/images/icons/edit-white.svg'
                            onClick={this.props.onEdit}
                             />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement   ="bottom"
                        overlay     ={deleteTooltip}>
                        <img
                            className   ="album-more"
                            src         ='assets/images/icons/delete-white.svg'
                            onClick     ={this.props.onDelete} />
                    </OverlayTrigger>
                </div>
            </li>
        );
    };

    renderAlbum = () => {
        const {connectDragSource, connectDropTarget, isDragging,
            id, onMove, ...props} = this.props;

        // Set avatar thumbnail
        let thumbnail = "../../assets/images/icons/new-album.svg";

        for (let artworkID in this.props.user.artworks) {
            if (this.props.user.artworks.hasOwnProperty(artworkID)) {

                let artwork = this.props.user.artworks[artworkID];
                if (artwork.album == this.props.album.name) {
                    let image = this.props.thumbnail(artwork.fullsize_url, 150);
                    thumbnail = image;
                }
            }
        }

        let avatarStyle = {
            backgroundImage: 'url(' + thumbnail + ')'
        }

        let styleResponsive = {
            width   : 0.96 * (window.innerWidth * 0.3 - 40) - 70
        };

        let styleFixed = {
            width   : 210 * 0.96 - 70   // Album locker width caps at 210px. An album is 96% of the locker. The avatar is 70px
        };

        const downloadTooltip = (
            <Tooltip
                id="download-tooltip-regular"
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
                id="delete-tooltip-regular"
                className="tooltip">
                Delete
            </Tooltip>
        );

        return connectDragSource(connectDropTarget(
            <li style       ={{opacity: isDragging ? 0 : 1}}
                onClick     ={this.props.changeAlbum}
                className   ={(this.props.currentAlbum === this.props.album.name) ? "album selected" : "album"}>
                <div className="album-avatar">
                    <div style={avatarStyle}
                        className="avatar-container" />
                </div>
                <h3
                    onClick     ={this.edit}
                    style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed}
                    className   ="album-name" >
                    {this.props.album.name}
                </h3>
                <div className="album-download-delete">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={editTooltip}>
                        <img
                            className="album-more"
                            src='assets/images/icons/edit-white.svg'
                            onClick={this.props.onEdit}
                             />
                     </OverlayTrigger>
                    <OverlayTrigger
                        placement   ="bottom"
                        overlay     ={deleteTooltip}>
                        <img
                            className   ="album-more"
                            src         ='assets/images/icons/delete-white.svg'
                            onClick     ={this.props.onDelete}
                        />
                    </OverlayTrigger>
                </div>
            </li>
        ));
    };

// ============= Methods ===============

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

        if (this.props.onEditName) {
            // Exit edit mode.
            this.setState({
                editing: false
            });

            this.props.onEditName(value);
        }
    }
}
