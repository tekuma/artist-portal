import React from 'react';
import Album from './Album.jsx';
import AlbumActions from '../../actions/AlbumActions';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../../constants/itemTypes';
import ArtworkActions from '../../actions/ArtworkActions';

const albumTarget = {
    hover(targetProps, monitor) {
        const source = monitor.getItem();
        ArtworkActions.changeAlbumField(source.id, "Uploads");
    }
};

// Makes Album a Drop Target for Artworks
@DropTarget(ItemTypes.ARTWORK, albumTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Albums extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {connectDropTarget, ...props} = this.props;

        var styleResponsive = {
            height: window.innerHeight - 60,
            width: window.innerWidth * 0.3 - 40
        };

        var styleFixed = {
            height: window.innerHeight - 60,
            width: 210
        };

        return connectDropTarget(
            <ul style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed} className="album-locker">
                <li onClick={this.props.changeAlbum.bind(null, 'Uploads')} className={(this.props.currentAlbum === 'Uploads') ? "album uploads selected" : "album uploads"}>
                    <div className="album-avatar">
                        <div className="empty-container">
                            <img src='assets/images/icons/upload.svg' />
                        </div>
                    </div>
                    <div className="album-writing">
                        <h3 className="uploads-name">Uploads</h3>
                        <img className="uploads-album-more"
                             src='assets/images/icons/download-white.svg'
                             data-tip="Download" />
                    </div>
                </li>
                {this.props.albums.map(album => {
                    return (
                        <Album key={album.id}
                            album={album}
                            onEdit={this.props.onEdit.bind(null, album.id, album.name)}
                            onDelete={this.props.onDelete.bind(null, album.id)}
                            onMove={AlbumActions.move}
                            currentAlbum={this.props.currentAlbum}
                            changeAlbum={this.props.changeAlbum.bind(null, album.name)} />
                    );
                })}
            </ul>
        );
    }
}
