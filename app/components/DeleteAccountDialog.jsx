// Libs
import React                from 'react';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import Dialog               from 'material-ui/Dialog';

// Files
import ConfirmButton        from './confirm_dialog/ConfirmButton';

/**
 * TODO
 */
export default class DeleteAccountDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('-----DeleteAccountDialog');
    }

    render() {
        const actions = [
              <ConfirmButton
                  label     ={"Delete"}
                  className ="delete-account-yes"
                  onClick   ={this.onSubmit} />,

              <ConfirmButton
                  label     ={"Cancel"}
                  className ="delete-account-no"
                  onClick   ={this.props.toggleDeleteAccountDialog} />
        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        actions                     ={actions}
                        modal                       ={false}
                        open                        ={this.props.deleteAccountIsOpen}
                        actionsContainerClassName   ="confirm-actions"
                        bodyClassName               ="confirm-body" >
                            Are you sure you want to delete your profile?
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log('+++++DeleteAccountDialog');
    }

// ============= METHODS ==============

    onSubmit = (e) => {
        this.props.deleteAccount();
    }
}
