// Libs
import React  from 'react';
import uuid   from 'node-uuid';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

// Files
import Albums       from './Albums.jsx';
import confirm      from '../confirm-dialog/ConfirmFunction';
import AlbumToggler from './AlbumToggler.jsx';

//Global Variables
const userPath = 'public/onboarders/';

export default class AlbumManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: {}
        }
    }

    componentDidMount() {
        function getAlbums() {
            let thisUID = firebase.auth().currentUser.uid;
            let albumPath = `public/onboarders/${thisUID}/albums`;
            let albumRef = firebase.database().ref(albumPath);

            albumRef.on("value", (snapshot) => {
                let albumJSON = snapshot.val();
                console.log("Here is albumJSON: ", albumJSON);

                let uploads   = albumJSON[0];
                console.log("Here are Uploads: ", uploads);
                let albumKeys = Object.keys(albumJSON);
                console.log("Here are the Album Keys: ", albumKeys);
                delete albumJSON[0];
                console.log("Here is albumJSON after deleting Uploads: ", albumJSON);
                let albumNames = ["Uploads"];
                for (var i = 0; i < albumKeys.length; i++) {
                    let key = albumKeys[i];
                    albumNames.push(albumJSON[key]['name']);
                }
                console.log("Here are the album names: ", albumNames);
                //send names to AppView
                this.props.setAlbumNames(albumNames);

                this.setState({
                    albums:albumJSON,
                    uploads:uploads,
                    albumNames:albumNames
                });
                console.log(this.state);

            }, null, this);
        }

        setTimeout(getAlbums.bind(this), 500);

        // When the currentAlbum is switched (by clicking on a new album), we load new artworks into view
        console.log("Here are the albums:", this.state);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillReceiveProps(nextProps) {
        let thisUID = firebase.auth().currentUser.uid;
        let albumPath = `public/onboarders/${thisUID}/albums`;
        let albumRef = firebase.database().ref(albumPath);

        albumRef.on("value", (snapshot) => {
            let albumJSON = snapshot.val();

            let uploads   = albumJSON[0];
            let albumKeys = Object.keys(albumJSON);
            delete albumJSON[0];

            let albumNames = ["Uploads"];
            for (var i = 0; i < albumKeys.length; i++) {
                let key = albumKeys[i];
                albumNames.push(albumJSON[key]['name']);
            }
            //send names to AppView
            this.props.setAlbumNames(albumNames);

            this.setState({
                albums:albumJSON,
                uploads:uploads,
                albumNames:albumNames
            });
            console.log(this.state);

        }, null, this);
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
        const addAlbumTooltip = (
            <Tooltip
                id="add-album-tooltip"
                className="tooltip">
                Create new album
            </Tooltip>
        );

        return (
            <section
                style={{
                height: window.innerHeight - 60,
                right: 0
                }}
                className="album-manager">
                <AlbumToggler
                    managerIsOpen={this.props.managerIsOpen}
                    toggleManager={this.props.toggleManager}/>
                <Albums
                    albums={this.state.albums}
                    uploads={this.state.uploads}
                    onEdit={this.editAlbum}
                    onDelete={this.deleteAlbum}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum}
                    userInfo={this.props.userInfo}
                    changeArtworkAlbum={this.props.changeArtworkAlbum} />
                <OverlayTrigger placement="left" overlay={addAlbumTooltip}>
                    <div
                        onClick={this.addAlbum}
                        onTouchTap={this.addAlbum}
                        className="add-album" >
                        <img src='assets/images/icons/plus-white.svg' />
                    </div>
                </OverlayTrigger>
            </section>
        );
    };

    closedManager = () => {
        let albumManagerWidth;

        if(document.getElementsByClassName('album-manager')[0] != undefined) {
            albumManagerWidth = document.getElementsByClassName('album-manager')[0].clientWidth;
        }

        const addAlbumTooltip = (
            <Tooltip
                id="add-album-tooltip"
                className="tooltip">
                Create new album
            </Tooltip>
        );

        return (
            <section
                style={{
                height: window.innerHeight - 60,
                right: -1 * albumManagerWidth + 40
                }}
                className="album-manager">
                <AlbumToggler
                    managerIsOpen={this.props.managerIsOpen}
                    toggleManager={this.props.toggleManager}/>
                <Albums
                    albums={this.state.albums}
                    uploads={this.state.uploads}
                    onEdit={this.editAlbum}
                    onDelete={this.deleteAlbum}
                    currentAlbum={this.props.currentAlbum}
                    changeAlbum={this.props.changeAlbum}
                    userInfo={this.props.userInfo} />
                <OverlayTrigger placement="left" overlay={addAlbumTooltip}>
                    <div
                        onClick={this.addAlbum}
                        onTouchTap={this.addAlbum}
                        className="add-album" >
                        <img src='assets/images/icons/plus-white.svg' />
                    </div>
                </OverlayTrigger>
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
        let albumPath = `public/onboarders/${thisUID}/albums`;
        let albumRef = firebase.database().ref(albumPath);

        albumRef.transaction( (data) => {
            let albumLength = Object.keys(data).length;
            data[albumLength] = {name: newAlbumName};
            console.log(albumLength, "albumLength");
            console.log("data:" ,data);
            return data;
        }, ()=>{
            console.log(">>addAlbum successful");
        });

        if(!this.props.managerIsOpen) {
            this.props.toggleManager();
        }

    };

    /**
     * [description]
     * @param  {Integer} index - index of the album
     * @param  {[type]}  name  - new name to update album name to.
     */
    editAlbum = (index, name) => {
        const thisUID = firebase.auth().currentUser.uid;
        // Don't modify if trying set an empty value or album name is already in use
        let isNameThere = this.state.albumNames.indexOf(name) != -1;
        if(!name.trim() || isNameThere ) {
            return;
        }

        // Change the name in the album branch
        let path = userPath + thisUID + "/albums/"+index;
        let thisAlbumRef = firebase.database().ref(path);
        thisAlbumRef.update({name: name}).then( () => {
            console.log("name update successful");
        });

        // change the album key for each artwork object
        let artLength = Object.keys(this.state.albums[index]['artworks']).length;
        for (var i = 0; i < artLength; i++) {
            let thisArtKey = this.state.albums[index]['artworks'][i];
            let artworkRef =firebase.database().ref(userPath+thisUID+'/artworks/'+thisArtKey);
            artworkRef.update({album:name}).then( () => {
                return;
            });
        }
        this.props.changeAlbum("Uploads");  // If user had edited album open, then no album is highlighted after edit.
    };

    /**
     * [description]
     * @param  {[type]} index [index of album to delete]
     * @param  {[type]} e  - element
     */
    deleteAlbum = (index, e) => {
        if (index === 0) {
            console.log(">>>ERROR: attempting to delete 'Uploads' album");
            return;
        }
        const thisUID = firebase.auth().currentUser.uid;
        // Avoid bubbling to edit
        e.stopPropagation();

        confirm('Are you sure you want to delete this album?').then( () => {
                // # they clicked "yes", so
                // First, Delete all attributed artworks
                // check if album is empty, if so bi-pass first step.
                if (this.state.albums[index]['artworks'] != null && this.state.albums[index]['artworks'] != undefined){
                    let artLength = Object.keys(this.state.albums[index]['artworks']).length;
                    for (let i = 0; i < artLength; i++) {
                        let thisArtKey = this.state.albums[index]['artworks'][i];
                        let artworkRef =firebase.database().ref(userPath+thisUID+'/artworks/'+thisArtKey);
                        artworkRef.set(null).then( () =>{
                            console.log(thisArtKey, "deleted successfully");
                        });
                    }
                }
                // then Delete this album branch, and manually update indexes.
                let path = 'public/onboarders/' + thisUID + '/albums' ;
                let albumRef = firebase.database().ref(path);
                albumRef.transaction( (data) => {
                    console.log("inside transaction", data);
                    let albumLength = Object.keys(data).length;
                    let found = false;
                    for (var i = 0; i < albumLength; i++) {
                        if (found) {
                            let aheadObject = data[i]
                            data[i-1] = aheadObject;
                        }
                        console.log("stuff", i, index);
                        if (i == index) {
                            console.log("DELETED::", i, data[i]);
                            delete data[i];
                            found = true;
                        }
                    }
                    console.log("DELETED2::", albumLength-1, data[albumLength-1]);
                    delete data[albumLength-1];
                    this.props.changeAlbum("Uploads");
                    return data;
                });
            }, () => {
                // they clicked 'no'
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

        let albumKeys = Object.keys(this.state.albums);

        for (let i = 0; i < albumKeys.length; i++) {
            let thisKey   = albumKeys[i];

            let albumName = this.state.albums[thisKey]['name'];
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
        console.log(nextAlbumName);
        return nextAlbumName;
    }
}
