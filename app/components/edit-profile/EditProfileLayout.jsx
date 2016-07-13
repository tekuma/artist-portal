import React            from 'react';
import confirm          from '../confirm-dialog/ConfirmFunction';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PublicEdit       from './PublicEdit.jsx';
import PrivateEdit      from './PrivateEdit.jsx';

export default class EditProfileLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentEditLayout: "public",
        }
    }

    render() {
        if(this.state.currentEditLayout === "public") {
            return (
                <PublicEdit
                    userInfo={this.props.userInfo}
                    currentEditLayout={this.state.currentEditLayout}
                    changeEditLayout={this.changeEditLayout}
                    editPublicUserInfo={this.props.editPublicUserInfo}
                     />
            );
        } else {
            return (
                <PrivateEdit
                    userInfo={this.props.userInfo}
                    currentEditLayout={this.state.currentEditLayout}
                    changeEditLayout={this.changeEditLayout}
                    currentError={this.state.currentError}
                    editPrivateUserInfo={this.props.editPrivateUserInfo} />
            );
        }
    }

    // ============== METHODS ======================

    changeEditLayout = (layout) => {
        this.setState({
            currentEditLayout: layout,
            errors: [],
            errorType: {},
            currentError: ""
        });
    }
}
