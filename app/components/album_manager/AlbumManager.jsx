import React from 'react';
import uuid from 'node-uuid';
import AlbumToggler from './AlbumToggler.jsx';
import Albums from './Albums.jsx';
import confirm from '../confirm-dialog/ConfirmFunction';

export default class AlbumManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: []
        }

        // This function is needed to repopulate album manager with
        // empty albums.
        // They would disappear every rerender without it.
        function getAlbums(that) {

            let allAlbumNames = that.props.albums;
            let allAlbums = [];

            for (var i =0; i < allAlbumNames.length; i++) {
                allAlbums.push({
                    id: uuid.v4(),
                    name: allAlbumNames[i]
                });
            }

            allAlbums.splice(0, 1);
            that.setState({
                albums: allAlbums
            });
        }

        setTimeout(getAlbums.bind(null, this), 10);
    }

    componentDidMount() {

         function getAlbums(that) {
            let albums = [];
            let uniqueAlbumNames = [];
            let artworks = that.props.userInfo.artworks;

            for (var artworkID in artworks) {
                if (artworks.hasOwnProperty(artworkID)) {
                    console.log("artwork id", artworkID);
                    console.log("artwork", artworks[artworkID]);
                    let artwork = artworks[artworkID];
                    if(uniqueAlbumNames.indexOf(artwork.album) == -1) {
                        if(artwork.album != "Uploads") {
                            uniqueAlbumNames.push(artwork.album);
                            // We don't want to create a duplicate Uploads album
                            // It is automatically created by Albums component
                        }
                    }
                }
            }

            // Creates JSON with unique ID for each album
            for (var i =0; i < uniqueAlbumNames.length; i++) {
                albums.push({
                    id: uuid.v4(),
                    name: uniqueAlbumNames[i]
                });
            }

            // When the currentAlbum is switched (by clicking on a new album), we load new artworks into view
            that.setState({albums});
            uniqueAlbumNames.splice(0,0,"Uploads");   // uniqueAlbumNames is sent to App View, so we want to include Uploads
            this.props.setAlbums(uniqueAlbumNames);
        }

        setTimeout(getAlbums.bind(null, this), 50);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

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

        return (
            <section
                style={{
                height: window.innerHeight - 60,
                right: 0
                }}
                className="album-manager">
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

        var albumManagerWidth;
        if(document.getElementsByClassName('album-manager')[0] != undefined) {
            albumManagerWidth = document.getElementsByClassName('album-manager')[0].clientWidth;
        }

        return (
            <section
                style={{
                height: window.innerHeight - 60,
                right: -1 * albumManagerWidth + 40
                }}
                className="album-manager">
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
        let albums = this.state.albums;
        albums.push({
            id: uuid.v4(),
            name: newAlbumName
        });

        this.setState({albums});

        if(!this.props.managerIsOpen) {
            this.props.toggleManager();
        }

        // send albums to AppView
        let uniqueAlbumNames = [];

        for(var i = 0; i < this.state.albums.length; i++) {
            uniqueAlbumNames.push(this.state.albums[i].name);
            console.log("Album: ", this.state.albums[i].name);
        }
        uniqueAlbumNames.splice(0,0,"Uploads");   // uniqueAlbumNames is sent to App View, so we want to include Uploads
        this.props.setAlbums(uniqueAlbumNames);
    };

    editAlbum = (id,oldAlbumName, name) => {
        // Don't modify if trying set an empty value or album name is already in use
        if(!name.trim() || this.state.albums.filter(album => album.name === name).length > 0) {
            return;
        }

        let album = this.state.albums.filter(album => album.id == id)[0];
        let index = this.state.albums.indexOf(album);
        album.name = name;
        this.state.albums.splice(index, 1, album);
        // TODO Update any artwork with album name
        // ArtworkActions.updateAlbumField(oldAlbumName, name);

        if (this.props.currentAlbum === oldAlbumName) {
            setTimeout(this.props.changeAlbum.bind(null, name), 10);
            // We need to update currentAlbum
            // We need to set a timeout to allow artwork albums to update
        }

        // send albums to AppView
        let uniqueAlbumNames = [];

        for(var i = 0; i < this.state.albums.length; i++) {
            uniqueAlbumNames.push(this.state.albums[i].name);
            console.log("Album: ", this.state.albums[i].name);
        }

        uniqueAlbumNames.splice(0,0,"Uploads");   // uniqueAlbumNames is sent to App View, so we want to include Uploads
        this.props.setAlbums(uniqueAlbumNames);

    };

    deleteAlbum = (id, e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        confirm('Are you sure you want to delete this album?').then(
            () => {
                // Proceed Callback
                for(var i=0; i < this.state.albums.length; i++) {
                    if(this.state.albums[i].id == id) {
                        let index = this.state.albums.indexOf(this.state.albums[i]);
                        this.state.albums.splice(index, 1);
                    }
                }
                this.setState({});  // Rerender
                this.props.setAlbums(this.state.albums);

                // send albums to AppView
                let uniqueAlbumNames = [];

                for(var i = 0; i < this.state.albums.length; i++) {
                    uniqueAlbumNames.push(this.state.albums[i].name);
                    console.log("Album: ", this.state.albums[i].name);
                }

                uniqueAlbumNames.splice(0,0,"Uploads");   // uniqueAlbumNames is sent to App View, so we want to include Uploads
                this.props.setAlbums(uniqueAlbumNames);
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
                var untitledNumber = albumName.split(" ")[1] // Get number
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
