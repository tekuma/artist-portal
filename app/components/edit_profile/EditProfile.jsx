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
        editingPublic: true,
        saved: true
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
                user                    ={this.props.user}
                userPrivate             ={this.props.userPrivate}
                editingPublic           ={this.state.editingPublic}
                editPublic              ={this.editPublic}
                editPrivate             ={this.editPrivate}
                currentError            ={this.state.currentError}
                editPrivateUserInfo     ={this.props.editPrivateUserInfo}
                toggleVerifyEmailDialog ={this.props.toggleVerifyEmailDialog}
                setSaved                ={this.setSaved}
                setUnsaved              ={this.setUnsaved} />
        );
    }

    /**
     * Flow control method to render public profile editing page
     * @return {JSX} [description]
     */
    goToPublicEdit = () => {
        return (
            <PublicEdit
                user                ={this.props.user}
                thumbnail           ={this.props.thumbnail}
                editingPublic       ={this.state.editingPublic}
                editPublic          ={this.editPublic}
                editPrivate         ={this.editPrivate}
                editPublicUserInfo  ={this.props.editPublicUserInfo}
                setSaved            ={this.setSaved}
                setUnsaved          ={this.setUnsaved}
                 />
        );
    }

    setSaved = () => {
        this.setState({
            saved: true
        });
    }

    setUnsaved = () => {
        this.setState({
            saved: false
        });
    }

    /**
     * Mutator Method to change layout in state
     * @param  {[type]} layout [TODO]
     */
    editPublic = () => {
        if (!this.state.saved) {
            confirm('Are you sure you want to change tabs without saving?').then( () => {
                    this.setState({
                        editingPublic: true,
                        saved: true
                    });
                }, () => {
                    // they clicked 'no'
                    return;
                }
            );
        } else {
            this.setState({
                editingPublic: true,
                saved: this.state.saved
            });
        }
    }

    /**
     * Mutator Method to change layout in state
     * @param  {[type]} layout [TODO]
     */
    editPrivate = () => {
        if (!this.state.saved) {
            confirm('Are you sure you want to change tabs without saving?').then( () => {
                    this.setState({
                        editingPublic: false,
                        saved: true
                    });
                }, () => {
                    // they clicked 'no'
                    return;
                }
            );
        } else {
            this.setState({
                editingPublic: false,
                saved: this.state.saved
            });
        }
    }

}
