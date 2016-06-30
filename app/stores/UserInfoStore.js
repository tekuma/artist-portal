import uuid from 'node-uuid';
import alt from '../libs/alt';
import UserInfoActions from '../actions/UserInfoActions';
import update from 'react-addons-update';

class UserInfoStore {
    constructor() {
        this.bindActions(UserInfoActions);
        this.userInfo = {};

    }


    // -------------- METHODS -------------------


    /**
     * [getUserInfo description]
     * @return {[type]} [description]
     */
    getUserInfo() {
        return this.userInfo
    }

    /**
     * [setUserInfo description]
     * @param {[type]} info [description]
     */
    setUserInfo(userInfo) {
        console.log("=======", userInfo);
        this.setState({userInfo});
    }

}

export default alt.createStore(ArtworkStore, 'ArtworkStore');
