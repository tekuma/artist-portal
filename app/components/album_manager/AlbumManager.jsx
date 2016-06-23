import React from 'react';
import uuid from 'node-uuid';
import AlbumToggler from './AlbumToggler.jsx';
import Albums from './Albums.jsx';

export default class AlbumManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: [
                {
                    id: uuid.v4(),
                    name: 'Sunsets',
                    thumbnail: '../../assets/images/sunset-1.jpg'
                },
                {
                    id: uuid.v4(),
                    name: 'Elephants',
                    thumbnail: '../../assets/images/elephant-1.jpg'
                },
                {
                    id: uuid.v4(),
                    name: 'Untitled 1',
                    thumbnail: '../../assets/images/icons/new-album.svg'
                }
            ],
            open: true
        };
    }

    updateDimensions = () => {
        this.setState({});
    }
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

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
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum} />
            </section>
        );
    }

    addAlbum = () => {

        var newAlbumName = this.getUniqueNewAlbumName();

        this.setState({
            albums: this.state.albums.concat([{
                id: uuid.v4(),
                name: newAlbumName,
                thumbnail: '../../assets/images/icons/new-album.svg'
            }])
        });

        if(!this.state.open) {
            this.setState({
                open: true
            });
        }
    };

    editAlbum = (id, name) => {
        // Don't modify if trying set an empty value
        if(!name.trim()) {
            return;
        }

        const albums = this.state.albums.map(album => {
            if(album.id === id && name) {
                album.name = name;
            }

            return album;
        });

        this.setState({albums});
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
