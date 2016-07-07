// libs
import React       from 'react';
import uuid        from 'node-uuid';
import Dialog      from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider  from 'material-ui/styles/MuiThemeProvider';
// files
import EditArtworkLayout from './EditArtworkLayout';
import ArtworkActions    from '../../actions/ArtworkActions';
import ConfirmButton     from '../confirm-dialog/ConfirmButton';


export default class EditArtworkDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {
            formInfo: {},
            errors: {},
            errorMessages: []
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
                            errors={this.state.errors}
                            errorMessages={this.state.errorMessages}
                            onChange={this.updateFormInfo}
                            onSubmit={this.onSubmit}
                            clearErrors={this.clearErrors}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag} />
                    </Dialog>
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
            let errors = this.state.errors;
            errors.title = true;
            this.setState({
                errors: Object.assign({}, this.state.errors, errors)
            });
            this.state.errorMessages.push("Please enter a title for the artwork");
        }

        // Test that user inputed an artist
        if (!this.state.formInfo.artist) {
            let errors = this.state.errors;
            errors.artist = true;
            this.setState({
                errors: Object.assign({}, this.state.errors, errors)
            });
            this.state.errorMessages.push("Please enter an artist name");
        }

        // Test that user inputed a year
        if (!this.state.formInfo.year) {
            let errors = this.state.errors;
            errors.year = true;
            this.setState({
                errors: Object.assign({}, this.state.errors, errors)
            });
            this.state.errorMessages.push("Please enter the year in which the artwork was completed");
        }

        // Test that user inputed correct year
        if (!/[0-9]{4}/.test(this.state.formInfo.year)) {
            let errors = this.state.errors;
            errors.year = true;
            this.setState({
                errors: Object.assign({}, this.state.errors, errors)
            });
            this.state.errorMessages.push("Please enter a valid year");
        }

        console.log("Got through errors");

        if(this.state.errorMessages.length == 0) {
            console.log("Edit Artwork Info: ", this.state.formInfo);
            // this.props.toggleEditArtworkDialog();
            this.props.updateArtwork(this.state.formInfo);
        }
        console.log("I have " + this.state.errorMessages.length + " errors: ", this.state.errorMessages);
    }

    clearErrors = () => {
        this.setState({
            errors: {},
            errorMessages: []
        });
    }
}
