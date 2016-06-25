import React from 'react';
import Album from './Album.jsx';
import AlbumActions from '../../actions/AlbumActions';


export default class Albums extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var styleResponsive = {
            height: window.innerHeight - 60,
            width: window.innerWidth * 0.3 - 40
        };

        var styleFixed = {
            height: window.innerHeight - 60,
            width: 210
        };

        return (
            <ul style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed} className="album-locker">
                <li onClick={this.props.changeAlbum.bind(null, 'uploads')} className={(this.props.currentAlbum === 'uploads') ? "uploads-album uploads selected" : "uploads-album uploads"}>
                    <div className="album-avatar">
                        <div className="empty-container">
                            <img src='assets/images/icons/upload.svg' />
                        </div>
                    </div>
                    <div className="album-writing">
                        <h3 className="uploads-name">Uploads</h3>
                        <img className="uploads-album-more" src='assets/images/icons/download.svg' />
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
