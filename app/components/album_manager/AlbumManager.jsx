import React from 'react';
import uuid from 'node-uuid';
import AlbumToggler from './AlbumToggler.jsx';
import Albums from './Albums.jsx';
import AlbumActions from '../../actions/AlbumActions';
import AlbumStore from '../../stores/AlbumStore';
import ArtworkActions from '../../actions/ArtworkActions';
import confirm from '../confirm-dialog/ConfirmFunction';

export default class AlbumManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: AlbumStore.getState().albums
        }
    }

    componentDidMount() {
        AlbumStore.listen(this.storeChanged);
    }
    componentWillUnmount() {
        AlbumStore.unlisten(this.storeChanged);
    }

    storeChanged = (store) => {
        // Without a property initializer 'this' wouldn't
        // point at the right context because it defaults to
        // 'undefined' in strict mode.
        this.setState({
            albums: store.albums
        });
    };

    render() {
        const albums = this.state.albums;
        if(this.props.managerIsOpen) {
            return this.openedManager();
        } else {
            return this.closedManager();
        }        
    }

    openedManager = () => {
        const albums = this.state.albums;
        var style = {
            height: window.innerHeight - 60,
            right: 0
        };

        return (
            <section style={style} className="album-manager">
                <AlbumToggler
                    managerIsOpen={this.props.managerIsOpen}
                    toggleManager={this.props.toggleManager}
                    addAlbum={this.addAlbum}/>
                <Albums
                    albums={albums}
                    onEdit={this.editAlbum}
                    onDelete={this.deleteAlbum}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum} />
            </section>
        );
    };

    closedManager = () => {
        const albums = this.state.albums;
        var albumManagerWidth = document.getElementsByClassName('album-manager')[0].clientWidth;

        var style = {
            height: window.innerHeight - 60,
            right: -1 * albumManagerWidth + 40
        };

        return (
            <section style={style} className="album-manager">
                <AlbumToggler
                    managerIsOpen={this.props.managerIsOpen}
                    toggleManager={this.props.toggleManager}
                    addAlbum={this.addAlbum}/>
                <Albums
                    albums={albums}
                    onEdit={this.editAlbum}
                    onDelete={this.deleteAlbum}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum} />
            </section>
        );
    }

    addAlbum = () => {

        var newAlbumName = this.getUniqueNewAlbumName();

        AlbumActions.create({
            name: newAlbumName
        });

        if(!this.props.managerIsOpen) {
            this.props.toggleManager();
        }
    };

    editAlbum = (id,oldAlbumName, name) => {
        // Don't modify if trying set an empty value or album name is already in use
        if(!name.trim() || AlbumStore.getState().albums.filter(artwork => artwork.name == name).length > 0) {
            return;
        }

        AlbumActions.update({id, name});
        ArtworkActions.updateAlbumField(oldAlbumName, name);

        if (this.props.currentAlbum === oldAlbumName) {
            setTimeout(this.props.changeAlbum.bind(null, name), 10);
            // We need to update currentAlbum
            // We need to set a timeout to allow artwork albums to update
        }

    };

    deleteAlbum = (id, e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        confirm('Are you sure you want to delete this album?').then(
            () => {
                // Proceed Callback
                AlbumActions.delete(id);
            },
            () => {
                // Cancel Callback
                return;
            }
        );
    };

    getUniqueNewAlbumName = () => {
        var untitledIntegersUsed = [];
        var untitledAlbumIndex = 1;
        var nextAlbumName = "Untitled ";

        for(var i = 0; i < this.state.albums.length; i++) {
            var albumName = this.state.albums[i].name;
            var isUntitledAlbum = albumName.search("Untitled");  // Returns index of start of term if contained, otherwise -1

            if(isUntitledAlbum != -1) { // True if contains untitled
                var untitledNumber = albumName.substring(albumName.length -1); // Get character at last index
                if(!isNaN(untitledNumber)) {
                    untitledIntegersUsed.push(eval(untitledNumber));    // Only add to array if it is a number
                }
            }
        }

        if(untitledIntegersUsed.length == 0) {
            nextAlbumName += "1";
        } else {
            // Determines whether final index has been used
            // Increments it if it has been used
            while(untitledIntegersUsed.indexOf(untitledAlbumIndex) != -1) {
                untitledAlbumIndex += 1;
            }
            nextAlbumName += untitledAlbumIndex.toString();
        }

        return nextAlbumName;
    }
}
