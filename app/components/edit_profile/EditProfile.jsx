// Libs
import React            from 'react';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Files
import confirm          from '../confirm-dialog/ConfirmFunction';
import PublicEdit       from './PublicEdit.jsx';
import PrivateEdit      from './PrivateEdit.jsx';

/**
 * TODO
 */
export default class EditProfile extends React.Component {
    state = {
        currentEditLayout: "public"
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----EditProfile");
    }

    render() {
        if(this.state.currentEditLayout === "public") {
            return this.goToPublicEdit;
        } else {
            return this.goToPrivateEdit;
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
                currentEditLayout={this.state.currentEditLayout}
                changeEditLayout={this.changeEditLayout}
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
                currentEditLayout={this.state.currentEditLayout}
                changeEditLayout={this.changeEditLayout}
                editPublicUserInfo={this.props.editPublicUserInfo}
                 />
        );
    }

    /**
     * Mutator Method to change layout in state
     * @param  {[type]} layout [TODO]
     */
    changeEditLayout = (layout) => {
        this.setState({
            currentEditLayout: layout,
            errors: [],
            errorType: {},
            currentError: ""
        });
    }

}
