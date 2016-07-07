import React from 'react';
import {DragSource, DropTarget}  from 'react-dnd';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import ItemTypes      from '../../constants/itemTypes';



// Drop Target for Uploads
const albumTarget = {
    drop(targetProps, monitor) {
        const source = monitor.getItem();
        targetProps.changeArtworkAlbum(source.id, source.album, "Uploads");
        const thisUID  = firebase.auth().currentUser.uid;
        let path = 'public/onboarders/' + thisUID +'/artworks/' + source.id;
        let thisArtworkReference = firebase.database().ref(path);
        thisArtworkReference.update({album: "Uploads"}).then( () => {
            console.log("Artwork album changed within artwork");
        });
    }
};


// Makes Album a Drop Target for Artworks
@DropTarget(ItemTypes.ARTWORK, albumTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Albums extends React.Component {

    render() {
        const downloadTooltip = (
            <Tooltip id="uploads-download-tooltip">Download</Tooltip>
        );

        let connectDropTarget = this.props.connectDropTarget;

        return connectDropTarget(
            <li onClick={this.props.changeAlbum} className={(this.props.currentAlbum === 'Uploads') ? "album uploads selected" : "album uploads"}>
                <div className="album-avatar">
                    <div className="empty-container">
                        <img src='assets/images/icons/upload.svg' />
                    </div>
                </div>
                <div className="album-writing">
                    <h3 className="uploads-name">Uploads</h3>
                    <OverlayTrigger placement="bottom" overlay={downloadTooltip}>
                        <img className="uploads-album-more"
                             src='assets/images/icons/download-white.svg' />
                     </OverlayTrigger>
                </div>
            </li>
        );
    }

}
