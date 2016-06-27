import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import { confirmable } from 'react-confirm';
import ConfirmButton from './ConfirmButton';


export default class Confirmation extends React.Component {
    render() {
        const {
            okLabel = 'OK',
            cancelLabel = 'Cancel',
            confirmation,
            show,
            proceed,
            dismiss,
            cancel
        } = this.props;

        const actions = [
              <ConfirmButton
                label={okLabel}
                className="confirm-yes"
                onClick={proceed}
              />,
          <ConfirmButton
                label={cancelLabel}
                className="confirm-no"
                onClick={cancel}
              />
        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={show}
                        onRequestClose={dismiss}
                        actionsContainerClassName="confirm-actions"
                        bodyClassName="confirm-message" >
                            {confirmation}
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default confirmable(Confirmation);
