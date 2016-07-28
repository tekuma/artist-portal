// Libs
import React                        from 'react';
import firebase                     from 'firebase';
import {DragSource, DropTarget}     from 'react-dnd';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
import update                       from 'react-addons-update';

// Files
import MiscAlbum   from './MiscAlbum';
import Album          from './Album';
import ItemTypes      from '../../constants/itemTypes';

/**
 * TODO
 */
export default class Albums extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Albums");
    }

    render() {

        let styleResponsive = {
            height  : window.innerHeight - 60,
            width   : window.innerWidth * 0.3 - 40
        };

        let styleFixed = {
            height  : window.innerHeight - 60,
            width   : 210
        };

        // Create an array of albums to be used by map function
        let albumKeys = Object.keys(this.props.albums);
        let albumArray = [];

        for (let i = 0; i < albumKeys.length; i++) {
            let index = albumKeys[i];
            let thisName = this.props.albums[index]['name'];
            let artworks = this.props.albums[index]['artworks'];
            albumArray.push({
                id: index,
                name: thisName,
                artworks: artworks
            });
        }

        return (
            <ul style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed} className="album-locker right">
                <MiscAlbum
                    user               ={this.props.user}
                    uploads            ={this.props.uploads}
                    thumbnail          ={this.props.thumbnail}
                    changeAlbum        ={this.props.changeAlbum.bind(null, "Miscellaneous")}
                    currentAlbum       ={this.props.currentAlbum}
                    changeArtworkAlbum ={this.props.changeArtworkAlbum}
                    emptyMisc          ={this.props.emptyMisc}
                    editMisc           ={this.props.editMisc}
                    />
                {albumArray.map(album => {
                    return (
                        <Album
                            key                 ={album.id}
                            album               ={album}
                            user                ={this.props.user}
                            thumbnail           ={this.props.thumbnail}
                            onEdit              ={this.props.onEdit.bind(null, album.id)}
                            onDelete            ={this.props.onDelete.bind(null, album.id)}
                            onMove              ={this.moveAlbum}
                            currentAlbum        ={this.props.currentAlbum}
                            changeAlbum         ={this.props.changeAlbum.bind(null, album.name)}
                            changeArtworkAlbum  ={this.props.changeArtworkAlbum} />
                    );
                })}
            </ul>
        );
    }

    componentDidMount() {
        console.log("+++++Albums");

    }

// ============= Methods ===============

    moveAlbum = (source, target) => {
        console.log("Entered move");
        const thisUID = firebase.auth().currentUser.uid;
        const albumPath = `public/onboarders/${thisUID}/albums`;
        const albumRef = firebase.database().ref(albumPath);

        albumRef.transaction((data) => {
            let sourceIndex = source['album']['id'];
            let targetIndex = target['id'];
            let sourceData = data[sourceIndex];

            let albums = update(data, {
                $splice: [[sourceIndex, 1],[targetIndex, 0, sourceData]]
            });

            // array.splice(start, deleteCount[, item1[, item2[, ...]]])
            // start:
            //  -> index at which to start changing the array (with origin 0)
            // deleteCount:
            //  -> An integer indicating the number of old array elements to remove
            //  -> If deleteCount is 0, no elements are removed
            // item1, item2, ...
            //  -> The elements to add to the array, beginning at the start index
            //
            // In the example above, we are deleting 1 element starting from sourceAlbumIndex,
            // then we are removing 0 elements starting from targetAlbumIndex
            // and adding sourceAlbum before targetAlbumIndex

            return albums;
        });
    }
}
