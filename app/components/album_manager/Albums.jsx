// Libs
import React                        from 'react';
import {DragSource, DropTarget}     from 'react-dnd';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
import update                       from 'react-addons-update';

// Files
import UploadsAlbum   from './UploadsAlbum';
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
                            user={this.props.user}
                            onEdit={this.props.onEdit.bind(null, album.id)}
                            onDelete={this.props.onDelete.bind(null, album.id)}
                            onMove={this.props.onMove}
                            currentAlbum={this.props.currentAlbum}
                            changeAlbum={this.props.changeAlbum.bind(null, album.name)}
                            changeArtworkAlbum={this.props.changeArtworkAlbum} />
                    );
                })}
            </ul>
        );
    }

    componentDidMount() {
        console.log("+++++Albums");
    }
}
