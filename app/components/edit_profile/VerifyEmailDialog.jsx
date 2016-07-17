// Libs
import React            from 'react';
import Dialog           from 'material-ui/Dialog';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Files
import ConfirmButton    from '../confirm_dialog/ConfirmButton';

/**
 * TODO
 */
export default class VerifyEmailDialog extends React.Component {
    //NOTE: Class left with incomplete code-styling for efficency

    render() {
        const actions = [
              <ConfirmButton
                label="Close"
                className="confirm-edit-profile"
                onClick={this.props.toggleVerifyEmailDialog}
              />
        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.props.verifyEmailDialogIsOpen}
                        actionsContainerClassName="confirm-actions"
                        bodyClassName="confirm-body" >
                            A verification email has been sent your email
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}
