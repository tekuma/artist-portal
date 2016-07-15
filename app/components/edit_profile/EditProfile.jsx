// Libs
import React            from 'react';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Files
import confirm          from '../confirm_dialog/ConfirmFunction';
import PublicEdit       from './PublicEdit.jsx';
import PrivateEdit      from './PrivateEdit.jsx';

/**
 * TODO
 */
export default class EditProfile extends React.Component {
    state = {
        editingPublic: true
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----EditProfile");
    }

    render() {
        if(this.state.editingPublic) {
            return this.goToPublicEdit();
        } else {
            return this.goToPrivateEdit();
        }
    }

    componentDidMount() {
        console.log("++++++EditProfile");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

    // ============== METHODS ======================

    /**
     * Flow control method to go to public profile editing page
     * @return {JSX}
     */
    goToPrivateEdit = () => {
        return (
            <PrivateEdit
                user={this.props.user}
                userPrivate={this.props.userPrivate}
                editingPublic={this.state.editingPublic}
                editPublic={this.editPublic}
                editPrivate={this.editPrivate}
                currentError={this.state.currentError}
                editPrivateUserInfo={this.props.editPrivateUserInfo} />
        );
    }

    /**
     * Flow control method to render public profile editing page
     * @return {JSX} [description]
     */
    goToPublicEdit = () => {
        return (
            <PublicEdit
                user={this.props.user}
                editingPublic={this.state.editingPublic}
                editPublic={this.editPublic}
                editPrivate={this.editPrivate}
                editPublicUserInfo={this.props.editPublicUserInfo}
                 />
        );
    }

    /**
     * Mutator Method to change layout in state
     * @param  {[type]} layout [TODO]
     */
    editPublic = () => {
        this.setState({
            editingPublic: true,
            errors: [],
            errorType: {},
            currentError: ""
        });
    }

    /**
     * Mutator Method to change layout in state
     * @param  {[type]} layout [TODO]
     */
    editPrivate = () => {
        this.setState({
            editingPublic: false,
            errors: [],
            errorType: {},
            currentError: ""
        });
    }

}
