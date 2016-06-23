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
            open: true,
            width: window.innerWidth * 0.3
        };
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth * 0.3});
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
                <Albums albums={albums} onEdit={this.editAlbum}/>
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
}
