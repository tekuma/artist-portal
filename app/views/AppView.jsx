// Libs
import React               from 'react';
import firebase            from 'firebase';
import HTML5Backend        from 'react-dnd-html5-backend';
import {DragDropContext}   from 'react-dnd';
// Files    NOTE: Do not include '.jsx'
import Views               from '../constants/Views';
import DeleteAccountDialog from '../components/DeleteAccountDialog';
import HiddenNav           from '../components/hidden_nav/HiddenNav';
import HamburgerIcon       from '../components/hamburger_icon/HamburgerIcon';
import RootAppLayout       from '../components/app-layouts/RootAppLayout';
import EditArtworkDialog   from '../components/edit-artwork/EditArtworkDialog';
import EditProfileDialog   from '../components/edit-profile/EditProfileDialog';
import UploadDialog        from '../components/app-layouts/UploadDialog';


// #Global Variables  TODO
const pathToPublicOnboarder = "public/onboarders/";

@DragDropContext(HTML5Backend)  // Adds Drag & Drop to App
export default class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsOpen: false,                           // Used to track whether Hidden Navigation is open
            managerIsOpen: true,                        // Used to track whether Album Manager is open
            editArtworkIsOpen: false,                   // Used to track whether Artwork Dialog is open
            deleteAccountIsOpen: false,                 // Used to track whether Delete Account Dialog is open
            uploadDialogIsOpen: false,                  // Used to track whether Upload Dialog is open
            editProfileDialogIsOpen: false,             // Used to track whether Edit Profile is open
            currentAlbum: 'Uploads',                    // Used to track the current album open
            currentAppLayout: Views.ARTWORKS,           // Used to track the current layout being displayed in RootAppLayout
            userInfo: {},                               // Used to store User Profile Information
            currentEditArtworkInfo: {},                 // Used to store information of artwork being edit momentarily
            uploadPreviews: [],                         // Used to store files uploaded momentarily, to be previewed once uploaded
            albumNames: ["Uploads"],                    // Used to store the JSON objects to be used by  Edit Artwork Form
            albums : {}
        };
    }

    /**
     * [componentWillMount description]
     */
    componentWillMount() {
        //pass
    }

    /**
     * When the compondent did mount, take a snapshot of the 'public/onboarders/{UID}'
     * node, and set it to this.state.userInfo
     */
    componentDidMount() {
        const thisUID = firebase.auth().currentUser.uid;
        firebase.database().ref(pathToPublicOnboarder + thisUID).on('value', (snapshot)=>{
            this.setState({userInfo: snapshot.val()});
        }, (error)=>{
            console.error(error);
        }, this);
    }

    render() {
        return (
            <div className="app">
                <HiddenNav
                    userInfo={this.state.userInfo}
                    navIsOpen={this.state.navIsOpen}
                    changeAppLayout={this.changeAppLayout}
                    signOutUser={this.props.signOutUser} />
                <HamburgerIcon
                    toggleNav={this.toggleNav}
                    navIsOpen={this.state.navIsOpen} />
                <RootAppLayout
                    albums={this.state.albums}
                    navIsOpen={this.state.navIsOpen}
                    deleteArtwork={this.deleteArtwork}
                    toggleEditArtworkDialog={this.toggleEditArtworkDialog}
                    changeCurrentEditArtwork={this.changeCurrentEditArtwork}
                    toggleManager={this.toggleManager}
                    managerIsOpen={this.state.managerIsOpen}
                    currentAppLayout={this.state.currentAppLayout}
                    changeAppLayout={this.changeAppLayout}
                    currentAlbum={this.state.currentAlbum}
                    changeAlbum={this.changeAlbum}
                    userInfo={this.state.userInfo}
                    setUploadedFiles={this.setUploadedFiles}
                    setAlbumNames={this.setAlbumNames}
                    editUserProfile={this.editUserProfile}
                    toggleDeleteAccountDialog={this.toggleDeleteAccountDialog}
                    changeArtworkAlbum={this.changeArtworkAlbum} />
                <EditArtworkDialog
                    albums={this.state.albums}
                    albumNames={this.state.albumNames}
                    editArtworkIsOpen={this.state.editArtworkIsOpen}
                    toggleEditArtworkDialog={this.toggleEditArtworkDialog}
                    updateArtwork={this.updateArtwork}
                    currentEditArtworkInfo={this.state.currentEditArtworkInfo} />
                <UploadDialog
                    closeUploadDialog={this.closeUploadDialog}
                    uploadedPreviews={this.state.uploadPreviews}
                    uploadDialogIsOpen={this.state.uploadDialogIsOpen} />
                <EditProfileDialog
                    closeProfileDialog={this.closeProfileDialog}
                    editProfileDialogIsOpen={this.state.editProfileDialogIsOpen} />
                <DeleteAccountDialog
                    toggleDeleteAccountDialog={this.toggleDeleteAccountDialog}
                    deleteAccountIsOpen={this.state.deleteAccountIsOpen}
                    deleteAccount={this.deleteAccount} />
            </div>
        );
    }


// -------------- METHODS -------------- //

    //  # Toggle Methods

    /**
     * This method is used by the Hamburger Icon component to
     * toggle the boolean value of this.state.navIsOpen
     * to change the state of the Hidden Navigation component
     * from open to closed.
     */
    toggleNav = () => {
        this.setState({
            navIsOpen: !this.state.navIsOpen
        });
    };

    /**
     * This method is used by the Album Manager Toggler element
     * to toggle the boolean value of this.state.managerIsOpen
     * to change the state of the the Album Manager component
     * from open to closed.
     */
    toggleManager = () => {
        this.setState({
            managerIsOpen: !this.state.managerIsOpen
        });
    };

    /**
     * This method is used by Artwork components
     * to toggle the boolean value of this.state.editArtworkIsOpen
     * to change the state of the the Edit Artwork Dialog component
     * from open to closed.
     */
    toggleEditArtworkDialog = () => {
        this.setState({
            editArtworkIsOpen: !this.state.editArtworkIsOpen
        });
    }

    /**
     * This method is used by the Delete Account element on the Edit Profile page component
     * to toggle the boolean value of this.state.deleteAccountIsOpen
     * to change the state of the the Delete Account Dialog component
     * from open to closed.
     */
    toggleDeleteAccountDialog = () => {
        this.setState({
            deleteAccountIsOpen: !this.state.deleteAccountIsOpen
        });
    }

    /**
     * This method is used by the Upload Layout page component
     * to change the boolean value of this.state.uploadDialogIsOpen
     * to false to close the Upload Dialog component
     */
    closeUploadDialog = () => {
        this.setState({
            uploadDialogIsOpen: false
        });
        this.clearUploadedFiles();
    }

    /**
     * This method is used by the Edit Profile Layout page component
     * to change the boolean value of this.state.editProfileDialogIsOpen
     * to false to close the Edit Profile Dialog component
     */
    closeProfileDialog = () => {
        this.setState({
            editProfileDialogIsOpen: !this.state.editProfileDialogIsOpen
        });
    }

    //  # Setter Methods

    /**
     * This method will take in an array of blobs, then for each blob
     * it will handle uploading, storing, and setting into the database.
     * @param  {[Array]} files [Array of Image blobs from the uploader]
     */
    setUploadedFiles = (files) => {
        this.setState({
            uploadDialogIsOpen: true   // When we set files, we want to open Uplaod Dialog
        });
        const thisUID = firebase.auth().currentUser.uid;
        const pathToUserStorage = 'portal/' + thisUID;

        // For each image that we upload, we need to:
        // -Store the original copy in 'portal/{UID}/uploads/'
        // -Make a thumbnail to save in 'portal/{UID}/thumbnails'
        // - -Create an artwork object in the DB
        // - -Add the artwork to the 'Uploads' album.
        for (var i = 0; i < files.length; i++) {
            let thisBlob = files[i];

            //#First, Store the original upload, un-changed.
            //NOTE: 'task.on' args::on(event, next(snapshot), error(error), complete)
            firebase.storage().ref(pathToUserStorage+'/uploads/'+thisBlob.name).put(thisBlob).on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot)=>{

                },
                (error)=>{
                    console.error(error);
                },
                ()=>{
                    console.log(thisBlob.name, "upload complete!");
                }
            );

            //#Second, create a thumbnail size copy and insert it into the database
            this.makeThumbnail(thisBlob,250,250);

        }//END For-loop
    }

    /**
     * This method creates a canvas, creates an HTML5 Image, then
     * dumps the blob into the Image and draws it to the canvas, which
     * is then rendered into a blob object, which is passed on
     * @param  {[Blob]} originalBlob [description]
     * @param  {[Int]}  maxHeight    [description]
     * @param  {[Int]}  maxWidth     [description]
     */
    makeThumbnail = (originalBlob, maxHeight, maxWidth) => {
        let canvas  = document.createElement("canvas");
        let ctx     = canvas.getContext("2d");
        let img     = new Image();
        let blobURL = URL.createObjectURL(originalBlob);
        img.src     = blobURL;

        img.addEventListener(
            'load',
            ()=>{
                console.log(originalBlob.name);
                ctx.clearRect(0,0,maxWidth,maxHeight);
                ctx.drawImage(
                    img,
                    0,0,img.width, img.height,
                    0,0,maxWidth, maxHeight
                );
                canvas.toBlob( (blob)=>{
                    this.uploadThumbnail(blob,originalBlob.name,originalBlob.size);
                });
                URL.revokeObjectURL(blobURL); //clear cached image
            }
        );

    }

    /**
     * [description]
     * @param  {Blob} blob [blob of thumbnail to upload]
     * @param  {String} name [the name of the file in storage]
     * @return {[type]}      [description]
     */
    uploadThumbnail = (blob,name,originalSize) => {
        const thisUID = firebase.auth().currentUser.uid;
        const pathToUserStorage = 'portal/' + thisUID;

        firebase.storage().ref(pathToUserStorage+'/thumbnails/'+name).put(blob).on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot)=>{
                if (snapshot.downloadURL != null){
                    let uploadInfo = {
                        url :snapshot.downloadURL,
                        size:originalSize,
                        name:name
                    };
                    this.setState({
                        uploadPreviews: this.state.uploadPreviews.concat(uploadInfo)
                    });

                    let artRef    = firebase.database().ref(pathToPublicOnboarder+thisUID).child('artworks');
                    // we refrence the artworks node, push to it to generate a child UID,
                    // then use toString to get the absolute URL, split it, and pop the last item,
                    // which is the artwork UID.
                    let artID     = artRef.push().toString().split('/').pop();
                    let uploadAlbumRef = firebase.database().ref(pathToPublicOnboarder+thisUID+'/albums/0/artworks');

                    //after upload, create an artwork object
                    let artObject = {
                        id      : artID,
                        image   : snapshot.downloadURL,
                        filename: name,
                        title   : "Untitled Artwork",
                        artist  : "Self",
                        album   : "Uploads",
                        year    : new Date().getFullYear(),
                        description: "",
                        colors: {
                            red   : false,
                            yellow: false,
                            blue  : false,
                            green : false,
                            orange: false,
                            purple: false,
                            brown : false,
                            black : false,
                            gray  : false,
                            white : false
                        },
                        tags  : "art"
                    };
                    // set the art object to the artworks node
                    artRef.child(artID).set(artObject);
                    // TODO handle : uploadPreviews.push(snapshot.downloadURL);

                    //Now, add a pointer to the artwork object to the uploads album
                    uploadAlbumRef.transaction( (data)=>{
                        if (data == null) {
                            data = {0:artID};
                        } else {
                            let currentLength   = Object.keys(data).length;
                            data[currentLength] = artID;
                        }
                        return data;
                    }, (error,bool,snap)=>{
                        console.log("album setting complete");
                    });
                }
            },
            (error)=>{
                console.error(error);
            },
            ()=>{
                console.log(blob.name, "upload complete!",blob);
            }
        );
    }




    /**
     * Setter method to populate an array of all album names.
     * @param  {Array} names - an array of all names
     */
    setAlbumNames = (names) => {
        console.log("Names: ", names);
        this.setState({albumNames : names});
    }

    /**
     * This method is used by the closeUploadDialog method
     * to empty this.state.uploadedFiles array once the Upload Dialog component
     * is closed.
     * Once the Upload Dialog component is closed, we no longer need to have the files
     * stored in the state variable
     */
    clearUploadedFiles = () => {
        this.setState({
            uploadPreviews: []
        });
    }

    /**
     * This method is used by the Hidden Navigation component and LoggedOnHeader component
     * to switch the the layout currently being displayed in the Root App Layout component
     * by changing this.state.currentAppLayout.
     * The value can be: Views.UPLOAD, Views.ARTWORKS, and Views.EDIT
     * @param  {[A field of the Views object]} view [View to be displayed]
     */
    changeAppLayout = (view) => {
        if(this.state.navIsOpen) {
            this.setState({
                currentAppLayout: view,
                navIsOpen: false,
                managerIsOpen: true
            });
        } else {
            this.setState({
                currentAppLayout: view,
                managerIsOpen: true
            });
        }
    }

    /**
     * This method is used by Album components to change the album artworks
     * currently being displayed in the Artworks component by changing
     * to change this.state.currentAlbum
     * @param  {[String]} album [The album to be displayed]
     */
    changeAlbum = (album) => {
        this.setState({
            currentAlbum: album
        });
    }

    /**
     * This method is used by the editArtwork method of the ArtworksLayout component
     * populate this.state.currentEditArtworkInfo with the information of the
     * artwork being edited.
     * @param  {String} id [the unique id of the artwork being edited]
     * @param  {String} oldAlbumName - the album that the artwork was in
     */
    changeCurrentEditArtwork = (id,oldAlbumName) => {
        const thisUID = firebase.auth().currentUser.uid;
        let path = "public/onboarders/" + thisUID + "/artworks/" + id;
        let artRef = firebase.database().ref(path);
        artRef.once("value", (snapshot) => {
            let data = snapshot.val();
            data["oldAlbumName"] = oldAlbumName;
            this.setState({
                currentEditArtworkInfo: data
            });
        }, null, this);
    }

    /**
     * This method is used by the Edit Profile Layout component
     * to change data between the edit user profile UI and profile information
     * in the Firebase DB. If the Avatar is also changed, the image must be
     * uploaded first, then the URL set to the avatar attribute, else the
     * DB is just updated with 'data'
     * @param  {[JSON} data [edited user profile information fields]
     */
    editUserProfile = (data) => {
        console.log(">>begin edit profile");
        const thisUID     = firebase.auth().currentUser.uid;
        let dataHasAvatar = data.hasOwnProperty('avatar');


        function updateText() {
            console.log(">>user info set!!",this);
            this.setState({
                editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
            });
        }

        function updateAvatar(data,uploadTask) {
            console.log(">>avatar upload successful");
            data.avatar = uploadTask.snapshot.downloadURL;
            firebase.database().ref(pathToPublicOnboarder + thisUID)
            .update(data)
            .then( updateText.bind(this) );
        };

        if (dataHasAvatar) {
            console.log(">>has avatar");
            let uploadTask = firebase.storage().ref('profile/' + thisUID).put(data.avatar);
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                null,
                null,
                updateAvatar.bind(this,data,uploadTask)
            );
        } else {
            console.log(">>No Avatar, updating text");
            let thisRef = firebase.database().ref(pathToPublicOnboarder + thisUID);
            thisRef.update(data).then( updateText.bind(this) );
        }



    }

    /** TODO Remove this method, depreciated.
     * This method is used by the Delete Account Dialog component
     * to delete a user's information and artworks from the Firebase Database
     */
    deleteAccount = () => {
        const thisUID = firebase.auth().currentUser.uid;
        firebase.auth().signOut().then(function() {
            console.log(thisUID, "this id here >>>>");
            thisPromise = firebase.database().ref(pathToPublicOnboarder + thisUID)
            .set(null, function(error) {console.log(error.message);})
            .then(function() {console.log("Account has been Deleted!");});
          // Sign-out successful.
        }, function(error) {
          // An error happened.
          console.log("Error occured.");
        });
    }

    /**
     * This method is used by the EditArtworkForm Component to:
     * -Update all attributes of this artwork in the artworks branch
     * -move associated artwork UID from/to proper artworks arrays in
     * albums branch.
     * @param  {JSON} data - obj of {attribute:update} to be written to
     * the database.
     */
    updateArtwork = (data) => {
        const thisUID = firebase.auth().currentUser.uid;
        let thisArtworkReference = firebase.database().ref(pathToPublicOnboarder+thisUID+'/artworks/' + data.id);
        thisArtworkReference.set(data).then( () => {
            this.toggleEditArtworkDialog();
        });
        if (data.album != data.oldAlbumName) {
            this.changeArtworkAlbum(data['id'], data.oldAlbumName, data.album);
        }

    }

    /**
     * [description]
     * @param  {} artworkUID - the UID of the artwork
     * @param  {[type]} oldName [description]
     * @param  {[type]} newName [description]
     */
    changeArtworkAlbum = (artworkUID, oldName, newName) => {
        const thisUID  = firebase.auth().currentUser.uid;
        let path = 'public/onboarders/'+thisUID+'/albums';
        let albumRef   = firebase.database().ref(path);
        albumRef.transaction( (snapshot) => {
            let albumsLength = Object.keys(snapshot).length;
            for (let i = 0; i < albumsLength; i++) {
                if (snapshot[i]['name'] == oldName) {
                    // remove the ID, then shift indexes manually
                    console.log("Old name: ", oldName);
                    console.log("Snapshot[i][name]: ", snapshot[i]['name']);
                    let artworkLength = Object.keys(snapshot[i]['artworks']).length;
                    console.log("Artworks Length: ", artworkLength);
                    let artworksNode = snapshot[i]['artworks'];
                    console.log("Artworks Node: ", snapshot[i]['artworks']);
                    let found = false;
                    for (let j = 0; j < artworkLength; j++) {
                        if (found) {
                            let aheadValue = artworksNode[j];
                            artworksNode[j-1] = aheadValue;
                        }
                        if (artworksNode[j] == artworkUID) {
                            delete artworksNode[j];
                            found = true;
                        }
                    }
                    delete artworksNode[artworkLength-1];
                } else if (snapshot[i]['name'] == newName) {
                    // just add the ID at the end of the 'array'
                    if (snapshot[i]['artworks'] != null && snapshot[i]['artworks'] != undefined){
                        let artLength = Object.keys(snapshot[i]['artworks']).length;
                        snapshot[i]['artworks'][artLength] = artworkUID;
                        console.log("Artworks already: ", snapshot[i]['artworks']);
                    } else {
                        snapshot[i]['artworks'] = {0: artworkUID};
                        console.log("No artworks");
                    }
                }
            }
            return snapshot;
        });
    }

    /**
     * Delete artwork object from /artworks and
     * delete pointer from albums/##/artworks/
     * @param  {String} id [UID of artwork to be deleted]
     */
    deleteArtwork = (id) => {
        //delete from artworks branch
        const thisUID = firebase.auth().currentUser.uid;
        let thisArtworkReference = firebase.database().ref(pathToPublicOnboarder+thisUID+'/artworks/' + id);
        let thisPromise = thisArtworkReference.set(null);
        thisPromise.then(function() {console.log("deletion success");});
        //remove from albums
        let allAlbumRef = firebase.database().ref(pathToPublicOnboarder+thisUID+'/albums');
        allAlbumRef.transaction(function(data) {
            let albumLength = Object.keys(data).length
            console.log(albumLength, "albumLength");
            for (var i = 0; i < albumLength; i++) {
                let artworkLength = Object.keys(data[i]['artworks']).length;
                console.log(artworkLength, "artworkLength");
                let found = false;
                for (var j = 0; j < artworkLength; j++) {
                    if (found) {
                        let aheadObject = data[i]['artworks'][j];
                        data[i]['artworks'][j-1] = aheadObject;
                    }
                    if (data[i]['artworks'][j] == id) {
                        console.log("MATCH", id);
                        delete data[i]['artworks'][j];
                        found = true;
                    }
                }
                delete data[i]['artworks'][artworkLength-1];
                return data;
            }
        });

    }
}
