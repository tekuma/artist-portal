'use strict';
import firebase       from 'firebase';
import ArtworkActions from '../actions/ArtworkActions';
import alt            from '../libs/alt';
import update         from 'react-addons-update';

var config = {
    apiKey: "AIzaSyAOS1ZTz4YcbIpTNNihtr-FeLb_905GefM",
    authDomain: "artist-tekuma-4a697.firebaseapp.com",
    databaseURL: "https://artist-tekuma-4a697.firebaseio.com",
    storageBucket: "artist-tekuma-4a697.appspot.com",
};
firebase.initializeApp(config);


class ArtworkStore {
    constructor(props) {

        this.bindActions(ArtworkActions);
        this.artworks = [];


        firebase.database().ref('onboarders/' + this.props.thisUID + '/artworks')
        .on('value', function(snapshot) {
            this.artworks = snapshot.val();
        }, function(errorStuff){
            console.log(errorStuff);
        }, this);
        console.log(this.artworks);

    }

    getArtworkInfo(id) {
        var artwork = this.artworks.filter(artwork => artwork.id === id)[0];
        return artwork;
    }

    updateArtwork(updatedArtwork) {
        const artworks = this.artworks.map(artwork => {
            if(artwork.id === updatedArtwork.id) {
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
            if(artwork.album === args[0]) {
                artwork.album = args[1];      // This is mutating the artwork JSON. Think of Immutable way.
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
                artwork.album = args[1];      // This is mutating the artwork JSON. Think of Immutable way.
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
