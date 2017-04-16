//Libs
import React       from 'react';
import firebase from 'firebase';
import Select      from 'react-select';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
//Files


/**
 * This component handles selecting which project to add artworks too.
 */
export default class AdminSelector extends React.Component {
    state = {
        artists: [],
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----AdminSelector");
    }

    render() {
        //NOTE: the prop passed into Select as 'value' must match the
        // artist.value below to be rendered as selected.
        let options = this.state.artists.map( (artist)=>{
                return {label: artist[1] , value:artist[0] , id:artist[0]};
            });

        const resetValue = firebase.auth().currentUser.uid;

        return (
            <div
                id="admin-selector">
                <Select
                    className="admin-select"
                    options={options}
                    name="admin-select"
                    placeholder="Select an artist..."
                    value={this.props.actingUID}
                    onChange={this.props.setActingUID}
                    clearable={false}
                    resetValue={resetValue}
                />
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++AdminSelector");
        this.gatherAllArtists().then( (artists)=>{
            this.setState({artists:artists});
        });
    }

    componentWillReceiveProps(nextProps) {
        //Pass
    }

    // ------------ METHODS -------------

    /**
     * Gathers a list of all artists. Note: this method requests a lot of data
     * as it is hierarchical and gathers all users and their data.
     * @return {Promise} - returns array of [[uid,name],[uid,name],...]]
     */
    gatherAllArtists = () => {
        return new Promise( (resolve, reject)=>{
            let retlst = [];
            firebase.database().ref('public/onboarders').once("value").then( (snapshot)=>{
                // NOTE: nearly equivalent pieces of code. Not sure which has
                // better performance.  The first uses less data.

                snapshot.forEach((childSnap)=>{
                    let uid = childSnap.key;
                    let name = childSnap.child("display_name").val();
                    retlst.push([uid,name]);
                });

                // let node = snapshot.val();
                // for (var uid in node) {
                //     if (node.hasOwnProperty(uid)) {
                //         retlst.push([uid, node[uid].display_name]);
                //     }
                // }

                resolve(retlst);
            });
        });
    }

}
