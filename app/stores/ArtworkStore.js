import uuid from 'node-uuid';
import alt from '../libs/alt';
import ArtworkActions from '../actions/ArtworkActions';
import update from 'react-addons-update';

class ArtworkStore {
    constructor() {
        this.bindActions(ArtworkActions);
        this.artworks = [
            {
                id: uuid.v4(),
                title: 'The Starry Night',
                album: 'uploads',
                year:'1889',
                image: '../../assets/images/starry-night-1.jpg'
            },
            {
                id: uuid.v4(),
                title: 'Wheat Field with Cypresses',
                album: 'uploads',
                year:'1889',
                image: '../../assets/images/field.jpg'
            },
            {
                id: uuid.v4(),
                title: 'Starry Night Over the Rhone',
                album: 'uploads',
                year:'1888',
                image: '../../assets/images/starry-night-2.jpg'
            },
            {
                id: uuid.v4(),
                title: 'Sunset 1',
                album: 'sunsets',
                year:'2015',
                image: '../../assets/images/sunset-1.jpg'
            },
            {
                id: uuid.v4(),
                title: 'Sunset 2',
                album: 'sunsets',
                year:'2016',
                image: '../../assets/images/sunset-2.jpg'
            },
            {
                id: uuid.v4(),
                title: 'Sunset 3',
                album: 'sunsets',
                year:'2005',
                image: '../../assets/images/sunset-3.jpg'
            },
            {
                id: uuid.v4(),
                title: 'Elephant 1',
                album: 'elephants',
                year:'2008',
                image: '../../assets/images/elephant-1.jpg'
            },
            {
                id: uuid.v4(),
                title: 'Elephant 2',
                album: 'elephants',
                year:'2003',
                image: '../../assets/images/elephant-2.jpg'
            },
            {
                id: uuid.v4(),
                title: 'Elephant 3',
                album: 'elephants',
                year:'2000',
                image: '../../assets/images/elephant-3.jpg'
            }
        ];
    }

    updateArtwork(updatedArtwork) {
        const artworks = this.artworks.map(artwork => {
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

        this.setState({artworks});
    }

    // This function is called when an album name is changed.
    // It updates all artworks' associated album to reflect new name
    updateAlbumField(args) {
        // For some reason the arguments are sent in a JSON object
        // To access the two arguments, we have to use use indexing
        // Argument 1 = old album name
        // Argument 2 = new album name

        this.artworks.map(artwork => {
            if(artwork.album === args[0].toLowerCase()) {
                artwork.album = args[1].toLowerCase();      // This is mutating the artwork JSON. Think of Immutable way.
            }
            return artwork;
        });
    }

    // This function is called when an artwork is dragged to a new album
    // It moves the artwork to the new album
    changeAlbumField(args) {
        // For some reason the arguments are sent in a JSON object
        // To access the two arguments, we have to use use indexing
        // Argument 1 = Source ID
        // Argument 2 = Target Name (New Album Name)

        this.artworks.map(artwork => {
            if(artwork.id === args[0]) {
                artwork.album = args[1].toLowerCase();      // This is mutating the artwork JSON. Think of Immutable way.
            }
            return artwork;
        });
    }

    delete(id) {
        this.setState({
            artworks: this.artworks.filter(artwork => artwork.id !== id)
        });
    }

    move({sourceId, targetId}) {
        var artworks = this.artworks;
        const sourceArtwork = artworks.filter(artwork => artwork.id == sourceId)[0];
        const sourceArtworkIndex = artworks.findIndex(artwork => artwork.id == sourceId);
        const targetArtworkIndex = artworks.findIndex(artwork => artwork.id == targetId);

        var modifiedArtworks = update(artworks, {
            $splice: [[sourceArtworkIndex, 1],[targetArtworkIndex, 0, sourceArtwork]]
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
        // In the example above, we are deleting 1 element starting from sourceArtworkIndex,
        // then we are removing 0 elements starting from targetArtworkIndex
        // and adding sourceArtwork before targetArtworkIndex

        this.setState({artworks: modifiedArtworks });
    }
}

export default alt.createStore(ArtworkStore, 'ArtworkStore');
