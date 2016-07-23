// Libs
import React                        from 'react';
import {DragSource, DropTarget}     from 'react-dnd';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';

// Files
import ItemTypes                    from '../../constants/itemTypes';



// ============= Drag and Drop ===============

const albumTarget = {
    drop(targetProps, monitor) {
        const source = monitor.getItem();
        // Only do drag if album isn't already in album
        if(source.albums.indexOf("Uploads") == -1) {
            // Create array of albums that doesn't have currentAlbum and has new album
            let newAlbums = source['albums'].slice(0);
            let currentAlbumIndex = newAlbums.indexOf(source.currentAlbum)
            newAlbums.splice(currentAlbumIndex, 1);
            newAlbums.push("Uploads");
            // Move artwork to new album
            targetProps.changeArtworkAlbum(source.id, source.albums, newAlbums);

            // Change album within artwork JSON
            const thisUID  = firebase.auth().currentUser.uid;
            let path = `public/onboarders/${thisUID}/artworks/${source.id}`;
            let thisArtworkRef = firebase.database().ref(path);
            thisArtworkRef.transaction((data) => {
                data['albums'] = newAlbums;
                return data;
            });
        }
    }
};


// Makes Album a Drop Target for Artworks
@DropTarget(ItemTypes.ARTWORK, albumTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

/**
 * TODO
 */
export default class Albums extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----UploadsAlbum");
    }

    render() {
        const downloadTooltip = (
            <Tooltip
                id="download-tooltip-regular"
                className="tooltip">
                Download
            </Tooltip>
        );

        const emptyTooltip = (
            <Tooltip
                id="delete-tooltip-regular"
                className="tooltip">
                Empty
            </Tooltip>
        );

        let connectDropTarget = this.props.connectDropTarget;

        return connectDropTarget(
            <li
                onClick     ={this.props.changeAlbum}
                className   ={(this.props.currentAlbum === 'Uploads') ? "album uploads selected" : "album uploads"}>
                <div className="album-avatar">
                    <div className="empty-container">
                        <img src='assets/images/icons/upload.svg' />
                    </div>
                </div>
                <h3
                    id="uploads-album-name"
                    className="album-name">
                    Uploads
                </h3>
                <div className="album-download-delete">
                    <OverlayTrigger
                        placement   ="bottom"
                        overlay     ={emptyTooltip}>
                        <img
                            className   ="album-more"
                            src         ='assets/images/icons/delete-white.svg'
                            onClick     = {this.props.emptyUploads}
                            onTouchTap  ={this.props.changeAlbum} />

                    </OverlayTrigger>
                </div>
            </li>
        );
    }

    componentDidMount() {
        console.log("+++++UploadsAlbum");
    }
}
