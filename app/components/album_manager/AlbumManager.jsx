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
                    thumbnail: '../../assets/images/sunset.jpg'
                },
                {
                    id: uuid.v4(),
                    name: 'Elephants',
                    thumbnail: '../../assets/images/elephant.jpg'
                },
                {
                    id: uuid.v4(),
                    name: 'Untitled',
                    thumbnail: '../../assets/images/icons/new-album.svg'
                }
            ],
            open: true
        };
    }

    render() {
        if(this.state.open) {
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
                    open={this.state.open}
                    toggle={this.toggle}
                    addAlbum={this.addAlbum}/>
                <Albums albums={albums} onEdit={this.editAlbum}/>
            </section>
        );
    };

    closedManager = () => {
        const albums = this.state.albums;
        var style = {
            height: window.innerHeight - 60,
            right: -1 * document.getElementsByClassName('album-manager')[0].clientWidth + 40
        };

        return (
            <section style={style} className="album-manager">
                <AlbumToggler
                    open={this.state.open}
                    toggle={this.toggle}
                    addAlbum={this.addAlbum}/>
                <Albums albums={albums} onEdit={this.editAlbum}/>
            </section>
        );
    }

    addAlbum = () => {
        this.setState({
            albums: this.state.albums.concat([{
                id: uuid.v4(),
                name: 'Untitled',
                thumbnail: '../../assets/images/icons/new-album.svg'
            }])
        });
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

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
        console.log(this.state.open);
    };
}
