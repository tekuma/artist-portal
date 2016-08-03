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
        if(source.type == ItemTypes.ALBUM) {
            if(source.album.name != target.name) {
                // Move order of albums
                targetProps.onMove(source, target);
            }
        }
    },

    drop(targetProps, monitor) {
        const target = targetProps.album;
        const source = monitor.getItem();
        if(source.type == ItemTypes.ARTWORK) {
            if (source.album != target.name) {
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
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Album");
    }

    render() {
        const {connectDragSource, connectDropTarget, isDragging,
            id, onMove, ...props} = this.props;

        let thumbnail = "../../assets/images/icons/new-album.svg";
        let artworkID;

        // ====== SETTING AVATAR IMAGE ======


        if (this.props.album.artworks) {
            // STEP 1: FIND FIRST ARTWORK IN ALBUM
            artworkID = this.props.album.artworks[0];

            if (this.props.user) {
                // STEP 2: GET ARTWORK'S IMAGE URL
                for (let id in this.props.user.artworks) {
                    if (this.props.user.artworks.hasOwnProperty(artworkID)) {
                        if (artworkID == id) {
                            let artwork = this.props.user.artworks[artworkID];
                            if (artwork.album && this.props.thumbnail) {
                                let image = this.props.thumbnail(artwork.fullsize_url, 150);
                                thumbnail = image;
                                break;
                            }
                        }
                    }
                }
            }
        }

        // ==================================

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
                className   ={(this.props.currentAlbum === this.props.album.name) ? "album black selected" : "album black"}>
                <div className="album-avatar">
                    <div style={avatarStyle}
                        className="avatar-container" />
                </div>
                <h3
                    style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed}
                    className   ="album-name" >
                    {this.props.album.name}
                </h3>
                <div className="album-tools bottom">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={editTooltip}>
                        <img
                            className="album-tool"
                            src='assets/images/icons/edit-white.svg'
                            onClick={this.props.onEdit}
                            onTouchTap={this.props.onEdit}
                             />
                     </OverlayTrigger>
                    <OverlayTrigger
                        placement   ="bottom"
                        overlay     ={deleteTooltip}>
                        <img
                            className   ="album-tool"
                            src         ='assets/images/icons/delete-white.svg'
                            onClick     ={this.props.onDelete}
                            onTouchTap  ={this.props.onDelete}
                        />
                    </OverlayTrigger>
                </div>
            </li>
        ));
    }

    componentDidMount() {
        console.log("+++++Album");
    }
}
