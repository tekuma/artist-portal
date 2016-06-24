import uuid from 'node-uuid';
import alt from '../libs/alt';
import AlbumActions from '../actions/AlbumActions';

class AlbumStore {
    constructor() {
        this.bindActions(AlbumActions);
        this.albums = [
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
        this.setState({
            albums: this.albums.filter(album => album.id !== id)
        });
    }
}

export default alt.createStore(AlbumStore, 'AlbumStore');
