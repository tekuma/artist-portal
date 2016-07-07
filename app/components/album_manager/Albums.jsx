// Libs
import React from 'react';
import {DragSource, DropTarget}  from 'react-dnd';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import update from 'react-addons-update';
// Files
import UploadsAlbum from './UploadsAlbum';
import Album          from './Album';
import AlbumActions   from '../../actions/AlbumActions';
import ItemTypes      from '../../constants/itemTypes';
import ArtworkActions from '../../actions/ArtworkActions';




export default class Albums extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return true;
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

        let albumKeys = Object.keys(this.props.albums);
        let albumArray = [];
        for (var i = 0; i < albumKeys.length; i++) {
            let index = albumKeys[i];
            let thisName = this.props.albums[index]['name'];
            albumArray.push({id:index, name:thisName});
        }

        return (
            <ul style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed} className="album-locker">
                <UploadsAlbum
                    changeAlbum={this.props.changeAlbum.bind(null, "Uploads")}
                    currentAlbum={this.props.currentAlbum}
                    changeArtworkAlbum={this.props.changeArtworkAlbum} />
                {albumArray.map(album => {
                    return (
                        <Album key={album.id}
                            album={album}
                            userInfo={this.props.userInfo}
                            onEdit={this.props.onEdit.bind(null, album.id)}
                            onDelete={this.props.onDelete.bind(null, album.id)}
                            onMove={this.move}
                            currentAlbum={this.props.currentAlbum}
                            changeAlbum={this.props.changeAlbum.bind(null, album.name)}
                            changeArtworkAlbum={this.props.changeArtworkAlbum} />
                    );
                })}
            </ul>
        );
    }

    move = (sourceName, targetName) => {
        console.log("Entered move");
        const userPath = 'public/onboarders/';
        const thisUID = firebase.auth().currentUser.uid;
        let path = userPath + thisUID + "/albums";
        let albumRef = firebase.database().ref(path);
        albumRef.transaction( (data) => {
            let albumsLength = Object.keys(data).length;
            let sourceData;
            let sourceIndex;
            let targetIndex;

            for (let i = 0; i < albumsLength; i++) {
                if (data[i]['name'] == sourceName) {
                    sourceData = data[i];
                    sourceIndex = i;
                } else if (data[i]['name'] == targetName) {
                    targetIndex = i;
                }
            }

            let modifiedAlbums = update(data, {
                $splice: [[sourceIndex, 1],[targetIndex, 0, sourceData]]
            });

            return modifiedAlbums;
        });
    }
}
