import React from 'react';
import uuid from 'node-uuid';
import AlbumToggler from './AlbumToggler.jsx';
import Albums from './Albums.jsx';
import AlbumActions from '../../actions/AlbumActions';
import AlbumStore from '../../stores/AlbumStore';
import ArtworkActions from '../../actions/ArtworkActions';
import ArtworkStore from '../../stores/ArtworkStore';

export default class AlbumManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: AlbumStore.getState().albums
        }
    }

    updateDimensions = () => {
        this.setState({});
    }
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        AlbumStore.listen(this.storeChanged);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
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
        if(this.props.managerOpen) {
            return this.openedManager();
        }

        return this.closedManager();
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
                    managerOpen={this.props.managerOpen}
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
                    managerOpen={this.props.managerOpen}
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

        if(!this.props.managerOpen) {
            this.props.toggleManager();
        }
    };

    editAlbum = (id,oldAlbumName, name) => {
        // Don't modify if trying set an empty value
        if(!name.trim()) {
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

        AlbumActions.delete(id);
    };

    getUniqueNewAlbumName = () => {
        var numUntitledAlbums = 0;

        for(var i = 0; i < this.state.albums.length; i++) {
            var albumName = this.state.albums[i].name;

            var isUntitledAlbum = albumName.search("Untitled");  // Returns position of beginning of term, otherwise -1

            if(isUntitledAlbum != -1) {
                numUntitledAlbums += 1;
            }
        }

        numUntitledAlbums += 1; // Used to increment
        var nextAlbumName = "Untitled " + numUntitledAlbums.toString();

        return nextAlbumName;
    }
}
