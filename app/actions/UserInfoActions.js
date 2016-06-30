import alt from '../libs/alt';

import firebase from 'firebase'


class UserInfoActions {
    constructor() {
        this.generateActions(
            'getUserInfo'
        );
    }


    setUserInfo () {
        return (dispatch) => {
            const thisUID  = firebase.auth().currentUser.uid;

            firebase.database().ref('onboarders/' + thisUID).on('value', function(snapshot) {
                dispatch(snapshot.val())
            });
        }
    }

}


export default alt.createActions(UserInfoActions);
