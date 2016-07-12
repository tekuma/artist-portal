// Libs
import React               from 'react';
import firebase            from 'firebase';
import HTML5Backend        from 'react-dnd-html5-backend';
import {DragDropContext}   from 'react-dnd';
import getPalette          from 'node-vibrant';
// Files    NOTE: Do not include '.jsx'
import Views               from '../constants/Views';
import DeleteAccountDialog from '../components/DeleteAccountDialog';
import HiddenNav           from '../components/hidden_nav/HiddenNav';
import HamburgerIcon       from '../components/hamburger_icon/HamburgerIcon';
import RootAppLayout       from '../components/app-layouts/RootAppLayout';
import EditArtworkDialog   from '../components/edit-artwork/EditArtworkDialog';
import EditProfileDialog   from '../components/edit-profile/EditProfileDialog';
import UploadDialog        from '../components/app-layouts/UploadDialog';


// #Global Variables
const pathToPublicOnboarder = "public/onboarders/";
const maxThumbnailWidth     = 550; // ->height set proportional to this value
const thumbNailPadding      = 4;   // ->count(pixels to pad each side of thumbnail with)
const colorCount            = 64;  // ->amount of possible color swatches to start with when
                                   // determining dominant vibrant and muted colors (64 default)
const paletteDownscaling    = 1 ;  // how much to downscale the image before processing.
                                   //  1 means no downscaling, 5 is default.

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
            albums : {},
            isUploading: false
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

    //  # Uploading Methods

    /**
     * This method takes in an image as a URL, and
     * @param  {String} url - an image to process
     * @return {Object}  an object with keys:
     *                   v,m,lv,lm,dv,dm; which represent:
     * Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, LightMuted
     * @see [ https://github.com/akfish/node-vibrant ]
     */
    extractColors = (url) => {
        console.log("about to palette");
        let colors;
        getPalette.from(url).quality(paletteDownscaling).maxColorCount(colorCount)
        .getPalette( (error,palette)=>{
            console.log("building Palette color Object...");
            colors = {
                v:{
                    hex:palette.Vibrant.getHex(),
                    rgb:palette.Vibrant.getRgb(),
                    cnt:palette.Vibrant.getPopulation()
                },
                m:{
                    hex:palette.Muted.getHex(),
                    rgb:palette.Muted.getRgb(),
                    cnt:palette.Muted.getPopulation()
                },
                dv:{
                    hex:palette.DarkVibrant.getHex(),
                    rgb:palette.DarkVibrant.getRgb(),
                    cnt:palette.DarkVibrant.getPopulation()
                },
                dm:{
                    hex:palette.DarkMuted.getHex(),
                    rgb:palette.DarkMuted.getRgb(),
                    cnt:palette.DarkMuted.getPopulation()
                },
                lv:{
                    hex:palette.LightVibrant.getHex(),
                    rgb:palette.LightVibrant.getRgb(),
                    cnt:palette.LightVibrant.getPopulation()
                },
                lm:{
                    hex:palette.LightMuted.getHex(),
                    rgb:palette.LightMuted.getRgb(),
                    cnt:palette.LightMuted.getPopulation()
                }

            };
        });
        return colors;
    }

    /** FIXME handle color processing in background
     * Heads up: This is a nested-synchronous mess.
     *
     * This method takes in a blob object that a user has uploaded, then
     * -uploads the original file to gs:"portal/{user uid}/uploads"
     * - sets DB entry /public/onboarders/artworks/{uid}/fullsize_url
     * -makes a thumbnail size copy of the image,
     * -uploads the thumbnail to "portal/{user uid}/thumbnails"
     * -sets DB entry /public/onboarders/artworks/{uid}/thumbnail_url
     * -sends image to this.extractColors(url)
     *. Asynchronously, we need to wait for:
     *  full url, thumb url, colors.
     * @param  {Blob} blob - an uploaded blob
     */
    uploadArtToTekuma = (blob) => {
        const fileName  = blob.name;
        const fileSize  = blob.size;
        const thisUID   = firebase.auth().currentUser.uid;
        const localURL  = URL.createObjectURL(blob);
        const pathToUserStorage = 'portal/' + thisUID;
        const fullSizeImage     = new Image;
        fullSizeImage.src       = localURL;


        // Load the blob as an <Image>
        fullSizeImage.addEventListener('load', ()=>{
            //*Store the original upload, un-changed.
            const fullRef = firebase.storage().ref(pathToUserStorage+'/uploads/'+fileName);
            fullRef.put(blob).on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot)=>{ //on-event change
                    let percent = Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                    console.log(percent + "% done w/ original");
                },
                (error)=>{
                    console.error(error);
                },
                ()=>{ //on-complete fullsize upload
                    console.log(">>Full size upload complete");
                    fullRef.getDownloadURL().then( (fullSizeURL)=>{
                        console.log(">>URL:",fullSizeURL);
                        //Variables
                        const aspectRatio  = fullSizeImage.width / fullSizeImage.height;
                        const maxThumbnailHeight = Math.ceil(maxThumbnailWidth / aspectRatio);

                        //Make a Canvas
                        const canvas  = document.createElement("canvas");
                        canvas.height = maxThumbnailHeight + thumbNailPadding*2;
                        canvas.width  = maxThumbnailWidth  + thumbNailPadding*2;
                        const ctx     = canvas.getContext("2d");
                        console.log(">>Canvas drawn");

                        //Draw the Image to canvas, args: img,x0,y0,scaled w, scaled h
                        ctx.drawImage(
                            fullSizeImage,
                            thumbNailPadding,
                            thumbNailPadding,
                            maxThumbnailWidth,
                            maxThumbnailHeight
                        );

                        //Revert Canvas into file Blob for upload
                        canvas.toBlob( (thumbBlob)=>{
                            console.log(">>blobbed");
                            const thumbRef = firebase.storage().ref(pathToUserStorage+'/thumbnails/'+fileName);
                            thumbRef.put(thumbBlob).on(
                                firebase.storage.TaskEvent.STATE_CHANGED,
                                (thumbSnap)=>{
                                    let percent2 = Math.ceil(thumbSnap.bytesTransferred / thumbSnap.totalBytes * 100);
                                    console.log(percent2 + "% done w/ thumb");
                                },
                                (error)=>{
                                    console.error(error);
                                },
                                ()=>{ // on-complete thumbnail upload
                                    console.log(">>Thumbnail upload complete");
                                    thumbRef.getDownloadURL().then( (thumbURL)=>{
                                        console.log(">>T_URL:",thumbURL);

                                        let uploadInfo = {
                                            url :thumbURL,
                                            size:fileSize,
                                            name:fileName
                                        };
                                        this.setState({
                                            uploadPreviews: this.state.uploadPreviews.concat(uploadInfo)
                                        });
                                        //Now, we have all needed async-data. Set it to the DB.
                                        const artRef = firebase.database().ref(pathToPublicOnboarder+thisUID).child('artworks');
                                        const artworkUID     = artRef.push().key;
                                        const uploadAlbumRef = firebase.database().ref(pathToPublicOnboarder+thisUID+'/albums/0/artworks');

                                        //Get the color palette
                                        console.log("---Begin Color swatching");
                                        const colorObject    = this.extractColors(localURL);
                                        console.log("Color Digest:", colorObject);
                                        console.log("---End Color swatching");

                                        //Build the artwork object
                                        let title = fileName.split(".")[0];
                                        let artist = "Self";
                                        if (this.state.userInfo != null && this.state.userInfo != undefined &&
                                            this.state.userInfo.display_name != "Untitled Artist")
                                            {
                                            artist = this.state.userInfo.display_name;
                                        }

                                        let artObject = {
                                            id          : artworkUID,
                                            thumbnail   : thumbURL,
                                            filename    : fileName,
                                            title       : title,
                                            artist      : artist,
                                            album       : "Uploads",
                                            upload_date : new Date().toISOString(),
                                            year        : 2012,
                                            description : "",
                                            tags        : "art",
                                            size        : fileSize,
                                            fullsize_url: fullSizeURL,
                                            aspect_ratio: aspectRatio,
                                            colors      : colorObject
                                        };

                                        // set the art object to the artworks node
                                        artRef.child(artworkUID).set(artObject).then(()=>{
                                            console.log(">>>>Artwork info set into DB");
                                        }).catch((error)=>{
                                            console.error(error);
                                        });

                                        //Now, add a pointer to the artwork object to the uploads album
                                        uploadAlbumRef.transaction( (node)=>{
                                            if (node == null) {
                                                node = {0:artworkUID};
                                            } else {
                                                let currentLength   = Object.keys(node).length;
                                                node[currentLength] = artworkUID;
                                            }
                                            return node; //finish transaction
                                        }, (error,bool,snap)=>{
                                                console.log(">>>Img set into album");
                                                //At the end of the async flow, revoke the local url
                                                //to free up cache space.
                                                URL.revokeObjectURL(localURL);
                                                //END  OF ASYNC FLOW
                                        });
                                    });//END upload promise and thenable
                            });//END on-complete thumb  and on
                        });//END toblob
                    });//END fullsize upload thenable
                });//END fullsize oncomplete and toBlob
            });//END Onload image
    }//END METHOD


    /**
     * This method will take in an array of blobs, then for each blob
     * it will handle uploading, storing, and setting into the database.
     * @param  {[Array]} files [Array of Image blobs from the uploader]
     */
    setUploadedFiles = (files) => {
        //FIXME use a toggle method?
        this.setState({
            uploadDialogIsOpen: true   // When we set files, we want to open Uplaod Dialog
        });

        for (let i = 0; i < files.length; i++) {
            this.uploadArtToTekuma(files[i]);
        }
    }

    // #Setter Methods

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
        //TODO implement setting const paths in the begining of each method
        //TODO to make the code more #RFC
        const thisUser    = firebase.auth().currentUser;
        const thisUID     = thisUser.uid;
        const avatarPath  = `portal/${thisUID}/avatars/${data.avatar.name}`;
        const avatarRef   = firebase.storage().ref(avatarPath);
        const userPath    = `public/onboarders/${thisUID}`;

        // Update their password if the password fields arent blank
        if (data.password != null && data.password != undefined) {
            thisUser.updatePassword(data.password).then(
                () => {
                    console.log("successful reset password");
                },
                (error) => {
                    console.error(error);
                }
            );
        }

        // If email is different than before, change it
        if (data.email != thisUser.email) {
            console.log(">>> Updating Email Address");
            currentUser.updateEmail(data.email).then(
                ()=>{
                    console.log("change email request sent to email");
                },
                (error)=>{
                    console.error(error);
                }
            );
        }

        // Update all info fields (dob, name, bio, avatar, etc)
        if (data.hasOwnProperty('avatar')) {

            avatarRef.put(data.avatar).on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot)=>{  },
                ()=>{},
                ()=>{
                    console.log(">> New Avatar Uploaded successfully");
                    avatarRef.getDownloadURL().then( (avatarURL)=>{
                        data.avatar = avatarURL;
                        firebase.database().ref(userPath).update(data)
                        .then( ()=>{
                            //FIXME use a toggle method?
                            this.setState({
                                editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
                            });
                        });
                    });
                }
            );
        } else {
            // updating everything but avatar
            firebase.database().ref(userPath).update(data)
            .then(()=>{
                //FIXME use a toggle method?
                this.setState({
                    editProfileDialogIsOpen: true   // When we save edited Profile Information, we want to Open the Dialog
                });
            });
        }
    }

    /** TODO re-do this function to 'clean up' the database when deleting a user
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
        let albumsPath = 'public/onboarders/'+thisUID+'/albums';
        let albumsRef   = firebase.database().ref(albumsPath);
        albumsRef.transaction( (node) => {
            let albumsCount = Object.keys(node).length;
            for (let i = 0; i < albumsCount; i++) {
                if (node[i]['name'] == oldName) {
                    // remove the ID, then shift indexes manually
                    let artworksCount = Object.keys(node[i]['artworks']).length;
                    let artworksNode = node[i]['artworks'];
                    let found = false;
                    for (let j = 0; j < artworksCount; j++) {
                        if (found) {
                            let aheadValue = artworksNode[j];
                            artworksNode[j-1] = aheadValue;
                        }
                        if (artworksNode[j] == artworkUID) {
                            delete artworksNode[j];
                            found = true;
                        }
                    }
                    delete artworksNode[artworksCount-1];
                } else if (node[i]['name'] == newName) {
                    // just add the ID at the end of the 'array'
                    if (node[i]['artworks'] != null && node[i]['artworks'] != undefined){
                        let artLength = Object.keys(node[i]['artworks']).length;
                        node[i]['artworks'][artLength] = artworkUID;
                        console.log("Artworks already: ", node[i]['artworks']);
                    } else {
                        node[i]['artworks'] = {0: artworkUID};
                        console.log("No artworks");
                    }
                }
            }
            return node;
        });
    }

    /**
     * Delete artwork object from /artworks and
     * delete pointer from albums/##/artworks/
     * @param  {String} id [UID of artwork to be deleted]
     */
    deleteArtwork = (id) => {
        // Delete from public/onboarders/{uid}/artworks branch
        const thisUID = firebase.auth().currentUser.uid;
        const thisArtworkReference = firebase.database().ref(pathToPublicOnboarder+thisUID+'/artworks/' + id);
        thisArtworkReference.set(null).then(()=>{
            console.log("Deletion successful");
        });

        // Remove the artwork pointer from the album via transaction, then
        // shift indexes bc firebase uses de-abstracted arrays
        let albumsRef = firebase.database().ref(pathToPublicOnboarder+thisUID+'/albums');
        albumsRef.transaction( (node)=>{
            let albumCount = Object.keys(node).length;
            for (let i = 0; i < albumCount; i++) {
                let artworksCount = Object.keys(node[i]['artworks']).length;
                let found = false;
                for (let j = 0; j < artworksCount; j++) {
                    if (found) {
                        let aheadObject = node[i]['artworks'][j];
                        node[i]['artworks'][j-1] = aheadObject;
                    }
                    if (node[i]['artworks'][j] == id) {
                        console.log("MATCH", id);
                        delete node[i]['artworks'][j];
                        found = true;
                    }
                }
                delete node[i]['artworks'][artworksCount-1];
                return node;
            }
        });

    }
}
