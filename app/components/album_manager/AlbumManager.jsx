import React from 'react';
import uuid from 'node-uuid';
import AlbumToggler from './AlbumToggler.jsx';
import Albums from './Albums.jsx';
import confirm from '../confirm-dialog/ConfirmFunction';


//Global Variables
const userPath = 'public/onboarders/';

export default class AlbumManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: {}
        }

        // This function is needed to repopulate album manager with
        // empty albums.
        // They would disappear every rerender without it.
        function getAlbums() {

            let allAlbumNames = this.props.albums;
            let allAlbums = [];

            for (let i =0; i < allAlbumNames.length; i++) {
                allAlbums.push({
                    id: uuid.v4(),
                    name: allAlbumNames[i]
                });
            }

            allAlbums.splice(0, 1);
            this.setState({
                albums: allAlbums
            });
        }

        setTimeout(getAlbums.bind(this), 10);
    }

    componentDidMount() {
        const thisUID = firebase.auth().currentUser.uid;

        let path = userPath + thisUID + "/albums";
        let albumRef = firebase.database().ref(path);
        console.log("did we get here?");
        albumRef.on("value", (snapshot) => {
            let albumJSON = snapshot.val();

            let uploads = albumJSON[0];
            delete albumJSON[0];

            let albumKeys = Object.keys(albumJSON);
            let albumNames = [];
            for (var i = 0; i < albumKeys.length; i++) {
                let key = albumKeys[i];
                albumNames.push(albumJSON[key]['name']);
            }

            this.setState({
                albums:albumJSON,
                uploads:uploads,
                albumNames:albumNames
            });
            console.log(this.state);

        }, null, this);

        // When the currentAlbum is switched (by clicking on a new album), we load new artworks into view
        console.log("Here are the albums:", this.state);


    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        if(this.props.managerIsOpen) {
            return this.openedManager();
        } else {
            return this.closedManager();
        }
    }

    /// -------------- METHODS ----------

    //   #flow control
    openedManager = () => {
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
                    albums={this.state.albums}
                    uploads={this.state.uploads}
                    onEdit={this.editAlbum}
                    onDelete={this.deleteAlbum}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum}
                    userInfo={this.props.userInfo} />
            </section>
        );
    };

    closedManager = () => {
        let albumManagerWidth;
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
                    albums={this.state.albums}
                    uploads={this.state.uploads}
                    onEdit={this.editAlbum}
                    onDelete={this.deleteAlbum}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum}
                    userInfo={this.props.userInfo} />
            </section>
        );
    }

    /**
     * [description]
     * @return {[type]} [description]
     */
    addAlbum = () => {
        const thisUID = firebase.auth().currentUser.uid;
        let newAlbumName = this.getUniqueNewAlbumName();
        let albums = this.state.albums;


        console.log(this.state.albums, "thisstatealbums");
        let path = userPath + thisUID + "/albums";
        let albumRef = firebase.database().ref(path);

        albumRef.transaction(function(data) {
            let albumLength = Object.keys(data).length;
            data[albumLength] = {name:newAlbumName};
            console.log(albumLength, "albumLength");
            console.log("data:" ,data);
            return data;
        }, function(){
            console.log(">>addAlbum successful");
        });

        if(!this.props.managerIsOpen) {
            this.props.toggleManager();
        }

    };

    /**
     * [description]
     * @param  {Integer} index - index of the album
     * @param  {[type]}  name  - name to update album name to.
     */
    editAlbum = (index, name) => {
        const thisUID = firebase.auth().currentUser.uid;
        // Don't modify if trying set an empty value or album name is already in use
        if(!name.trim() || this.state.albumNames.indexOf(name) != -1) {
            return;
        }

        // Change the name in the album branch
        let path = userPath + thisUID + "/albums/"+index;
        let thisAlbumRef = firebase.database().ref(path);
        thisAlbumRef.update({name:name});

        // change the album key for each artwork object
        let artLength = Object.keys(this.state.albums[index]['artworks']).length;
        for (var i = 0; i < artLength; i++) {
            let thisArtKey = this.state.albums[index]['artworks'][i];
            let artworkRef =firebase.database().ref(userPath+thisUID+'/artworks/'+thisArtKey);
            artworkRef.update({album:name});
        }
    };

    /**
     * [description]
     * @param  {[type]} index [index of album to delete]
     * @param  {[type]} e  - element
     */
    deleteAlbum = (index, e) => {
        const thisUID = firebase.auth().currentUser.uid;
        // Avoid bubbling to edit
        e.stopPropagation();

        confirm('Are you sure you want to delete this album?').then(
            () => {
                // Proceed Callback:
                // Delete all attributed artworks
                // change the album key for each artwork object
                let artLength = Object.keys(this.state.albums[index]['artworks']).length;
                for (let i = 0; i < artLength; i++) {
                    let thisArtKey = this.state.albums[index]['artworks'][i];
                    let artworkRef =firebase.database().ref(userPath+thisUID+'/artworks/'+thisArtKey);
                    artworkRef.set(null);
                }
                // then Delete this album branch
                let albumRef = firebase.database().ref(userPath+thisUID+'/albums/'+index);
                albumRef.set(null);
            },

            () => {
                // Cancel Callback
                return;
            }
        );
    };

    /**
     * [description]
     * @return {[type]} [description]
     */
    getUniqueNewAlbumName = () => {
        let untitledIntegersUsed = [];
        let untitledAlbumIndex = 1;
        let nextAlbumName = "Untitled ";

        let albumsLength = Object.keys(this.state.albums).length;
        for (let i = 0; i < albumsLength; i++) {
            let albumName = this.state.albums[i]['name'];
            let isUntitledAlbum = albumName.search("Untitled");  // Returns index of start of term if contained, otherwise -1

            if(isUntitledAlbum != -1) { // True if contains untitled
                let untitledNumber = albumName.split(" ")[1] // Get number
                if(!isNaN(untitledNumber)) {
                    untitledIntegersUsed.push(eval(untitledNumber));
                    // Only add to array if it is a number
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
