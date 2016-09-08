// Libs
import React            from 'react';
import {confirmable}    from 'react-confirm';
import Dialog           from 'material-ui/Dialog';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Files
import ConfirmButton    from './ConfirmButton';

/**
 * TODO
 */
class Confirmation extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Confirmation");
    }

    render() {
        const {
            okLabel = 'Yes',
            cancelLabel = 'Cancel',
            confirmation,
            show,
            proceed,
            dismiss,
            cancel
        } = this.props;

        const actions = [
            <ConfirmButton
                label       ={okLabel}
                className   ="confirm-yes"
                onClick     ={proceed}/>,

            <ConfirmButton
                label       ={cancelLabel}
                className   ="confirm-no"
                onClick     ={cancel} />
        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        actions                     ={actions}
                        modal                       ={false}
                        open                        ={show}
                        onRequestClose              ={dismiss}
                        actionsContainerClassName   ="confirm-actions"
                        bodyClassName               ="confirm-body" >
                            {confirmation}
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++Confirmation");
    }
}

export default confirmable(Confirmation);
