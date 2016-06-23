import React from 'react';
import Album from './Album.jsx';

export default ({albums, onEdit}) => {
    var style = {
        height: window.innerHeight - 60,
        width: window.innerWidth * 0.3 - 40
    };

    return (
        <ul style={style} className="album-locker">
            <li className="album uploads">
                <div className="album-avatar">
                    <div className="empty-container">
                        <img src='assets/images/icons/upload-black.svg' />
                    </div>
                </div>
                <div className="album-writing">
                    <h3 className="uploads-name">Uploads</h3>
                    <img className="album-more" src='assets/images/icons/download.svg' />
                </div>
            </li>
            {albums.map(album => {
                return (
                    <Album key={album.id}
                        album={album}
                        onEdit={onEdit.bind(null, album.id)} />
                );

            })}
        </ul>
    );
}
