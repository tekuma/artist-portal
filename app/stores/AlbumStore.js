import uuid from 'node-uuid';
import alt from '../libs/alt';
import AlbumActions from '../actions/AlbumActions';
import update from 'react-addons-update';

class AlbumStore {
    constructor() {
        this.bindActions(AlbumActions);
        this.albums = [
            {
                id: uuid.v4(),
                name: 'Sunsets'
            },
            {
                id: uuid.v4(),
                name: 'Elephants'
            }
        ];
    }

    create(album) {
         const albums = this.albums;

         album.id = uuid.v4();

         this.setState({
             albums: albums.concat(album)
         });
    }

    update(updatedAlbum) {
        const albums = this.albums.map(album => {
            if(album.id === updatedAlbum.id) {
                // Object.assign is used to patch the note data here. It
                // mutates target (first parameter). In order to avoid that,
                // I use {} as its target and apply data on it.
                //
                // Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
                //
                // You can pass as many objects to the method as you want.
                return Object.assign({}, album, updatedAlbum);
            }
            return album;
        });

        // This is same as 'this.setState({albums: albums})'
        this.setState({albums});
    }

    delete(id) {
        console.log("in artwork store");
        this.setState({
            albums: this.albums.filter(album => album.id !== id)
        });
    }

    move({source, target}) {
        var albums = this.albums;
        const sourceAlbum = albums.filter(album => album.id == source.id)[0];
        const sourceAlbumIndex = albums.findIndex(album => album.id === source.id);
        const targetAlbumIndex = albums.findIndex(album => album.id === target.id);

        var modifiedAlbums = update(albums, {
            $splice: [[sourceAlbumIndex, 1],[targetAlbumIndex, 0, sourceAlbum]]
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
        // In the example above, we are deleting 1 element starting from sourceAlbumIndex,
        // then we are removing 0 elements starting from targetAlbumIndex
        // and adding sourceAlbum before targetAlbumIndex

        this.setState({albums: modifiedAlbums });
    }
}

export default alt.createStore(AlbumStore, 'AlbumStore');
