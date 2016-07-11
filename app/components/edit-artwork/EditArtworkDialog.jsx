// libs
import React       from 'react';
import uuid        from 'node-uuid';
import Dialog      from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider  from 'material-ui/styles/MuiThemeProvider';

// files
import EditArtworkLayout from './EditArtworkLayout';
import ConfirmButton     from '../confirm-dialog/ConfirmButton';


export default class EditArtworkDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {
            formInfo: {},
            errorType: {},
            errors: [],
            currentError: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formInfo: nextProps.currentEditArtworkInfo
        })
    }

    render() {
        const actions = [
              <ConfirmButton
                label={"Update"}
                className="edit-artwork-yes"
                onClick={this.onSubmit}
              />,
          <ConfirmButton
                label={"Cancel"}
                className="edit-artwork-no"
                onClick={this.props.toggleEditArtworkDialog}
              />
        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        title="Edit Artwork"
                        actions={actions}
                        modal={false}
                        open={this.props.editArtworkIsOpen}
                        titleClassName="edit-artwork-title"
                        actionsContainerClassName="edit-artwork-actions"
                        bodyClassName="edit-artwork-body"
                        contentClassName="edit-artwork-content" >
                        <EditArtworkLayout
                            albumNames={this.props.albumNames}
                            value={this.state.formInfo}
                            errorType={this.state.errorType}
                            currentError={this.state.currentError}
                            onChange={this.updateFormInfo}
                            onSubmit={this.onSubmit}
                            clearErrors={this.clearErrors}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag} />
                    </Dialog>
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="registration-error"
                        open={Object.keys(this.state.errorType).length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000} />
                </MuiThemeProvider>
            </div>
        );
    }

    updateFormInfo = (formInfo) => {
        console.log("Entered updateFormInfo");
        this.setState({formInfo});
        console.log("Form Info: ", formInfo);
    }

    onSubmit = (e) => {
        console.log("Entered onSubmit");
        console.log("Artwork form: ", this.state.formInfo);
        e.preventDefault();
        
        // Test that user inputed a title
        if (!this.state.formInfo.title) {
            let errorType = this.state.errorType;
            errorType.title = true;
            this.setState({
                errorType: errorType
            });
            this.state.errors.push("Please enter a title for the artwork");
        }

        // Test that user inputed an artist
        if (!this.state.formInfo.artist) {
            let errorType = this.state.errorType;
            errorType.artist = true;
            this.setState({
                errorType: errorType
            });
            this.state.errors.push("Please enter an artist name");
        }

        // Test that user inputed a year
        if (!this.state.formInfo.year) {
            let errorType = this.state.errorType;
            errorType.year = true;
            this.setState({
                errorType: errorType
            });
            this.state.errors.push("Please enter the year in which the artwork was completed");
        }

        // Test that user inputed correct year
        if (!/[0-9]{4}/.test(this.state.formInfo.year)) {
            let errorType = this.state.errorType;
            errorType.year = true;
            this.setState({
                errorType: errorType
            });
            this.state.errors.push("Please enter a valid year");
        }

        console.log("Got through errors");

        if(this.state.errors.length == 0) {
            console.log("Edit Artwork Info: ", this.state.formInfo);
            // this.props.toggleEditArtworkDialog();
            this.props.updateArtwork(this.state.formInfo);
        }
        console.log("I have " + this.state.errors.length + " errors: ", this.state.errors);

        for(let i = 0; i < this.state.errors.length; i++) {
            setTimeout(() => {
                this.setState({
                    currentError: this.state.errors[i]
                });
            }, 3000 * i);
        }
    }

    clearErrors = () => {
        this.setState({
            errorType: {},
            errors: []
        });
    }
}
