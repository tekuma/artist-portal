import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import ConfirmButton from '../confirm-dialog/ConfirmButton';

export default class EditProfileDialog extends React.Component {
    render() {
        const actions = [
              <ConfirmButton
                label="Close"
                className="confirm-edit-profile"
                onClick={this.props.closeProfileDialog}
              />
        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.props.editProfileDialogIsOpen}
                        actionsContainerClassName="confirm-actions"
                        bodyClassName="confirm-body" >
                            Your profile information has been updated
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}
