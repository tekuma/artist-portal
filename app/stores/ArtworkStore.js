import uuid from 'node-uuid';
import alt from '../libs/alt';
import ArtworkActions from '../actions/ArtworkActions';

class ArtworkStore {
    constructor() {
        this.bindActions(ArtworkActions);
        this.artworkAlbums = {
            uploads: [
                {
                    id: uuid.v4(),
                    title: 'The Starry Night',
                    year:'1889',
                    image: '../../assets/images/starry-night-1.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Wheat Field with Cypresses',
                    year:'1889',
                    image: '../../assets/images/field.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Starry Night Over the Rhone',
                    year:'1888',
                    image: '../../assets/images/starry-night-2.jpg'
                }
            ],
            sunsets: [
                {
                    id: uuid.v4(),
                    title: 'Sunset 1',
                    year:'2015',
                    image: '../../assets/images/sunset-1.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Sunset 2',
                    year:'2016',
                    image: '../../assets/images/sunset-2.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Sunset 3',
                    year:'2005',
                    image: '../../assets/images/sunset-3.jpg'
                }
            ],
            elephants: [
                {
                    id: uuid.v4(),
                    title: 'Elephant 1',
                    year:'2008',
                    image: '../../assets/images/elephant-1.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Elephant 2',
                    year:'2003',
                    image: '../../assets/images/elephant-2.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Elephant 3',
                    year:'2000',
                    image: '../../assets/images/elephant-3.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Elephant 1',
                    year:'2008',
                    image: '../../assets/images/elephant-1.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Elephant 2',
                    year:'2003',
                    image: '../../assets/images/elephant-2.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Elephant 3',
                    year:'2000',
                    image: '../../assets/images/elephant-3.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Elephant 1',
                    year:'2008',
                    image: '../../assets/images/elephant-1.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Elephant 2',
                    year:'2003',
                    image: '../../assets/images/elephant-2.jpg'
                },
                {
                    id: uuid.v4(),
                    title: 'Elephant 3',
                    year:'2000',
                    image: '../../assets/images/elephant-3.jpg'
                }
            ]
        };
    }

    update(album, updatedArtwork) {
        const artworks = this.artworkAlbums[album].map(artwork => {
            if(artwork.id === updatedAlbum.id) {
                // Object.assign is used to patch the note data here. It
                // mutates target (first parameter). In order to avoid that,
                // I use {} as its target and apply data on it.
                //
                // Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
                //
                // You can pass as many objects to the method as you want.
                return Object.assign({}, artwork, updatedArtwork);
            }
            return artwork;
        });

        var artworkAlbums = this.artworkAlbums;
        artworkAlbums[album] = artworks;

        this.setState({artworkAlbums});
    }

    delete(args) {
        // for some reason the two arguments 'album' (album of artwork) and 'id' (id of artwork)
        // come in an array, so I have to use args[i] to fetch them
        const artworks = this.artworkAlbums[args[0]].filter(artwork => artwork.id !== args[1]);

        var artworkAlbums = this.artworkAlbums;
        artworkAlbums[args[0]] = artworks;
        this.setState({artworkAlbums});
    }
}

export default alt.createStore(ArtworkStore, 'ArtworkStore');
