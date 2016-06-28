import React from 'react';
import EditArtworkForm from './EditArtworkForm';
import ArtworkActions from '../../actions/ArtworkActions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import ConfirmButton from '../confirm-dialog/ConfirmButton';
import uuid from 'node-uuid';

export default class EditArtworkDialog extends React.Component {
    constructor(props) {
        super(props);


        this.state =  {
            formInfo: {},
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formInfo: nextProps.getCurrentEditArtwork
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
                        <EditArtworkForm
                            value={this.state.formInfo}
                            errors={this.state.errors}
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
        this.setState({formInfo});
    }

    onSubmit = (event) => {
        event.preventDefault();

        // Test that user inputed a title
        if (!this.state.formInfo.title) {
          this.state.errors.title = ["Please enter a title for the artwork"];
        }

        // Test that user inputed an artist
        if (!this.state.formInfo.artist) {
          this.state.errors.artist = ["Please enter an artist name"];
        }

        // Test that user inputed a year
        if (!this.state.formInfo.year) {
          this.state.errors.year = ["Please enter the year in which the artwork was completed"];
        }

        // Test that user inputed correct year
        if (!/[0-9]{4}/.test(this.state.formInfo.year)) {
          this.state.errors.year = ["Please enter a valid year"];
        }
        this.forceUpdate();

        if(Object.keys(this.state.errors).length == 0) {
            ArtworkActions.updateArtwork(this.state.formInfo);
            this.props.toggleEditArtworkDialog();
        }
    }

    clearErrors = () => {
        this.setState({
            errors: {}
        });
    }

    handleDelete = (i) => {
        var newFormInfo = this.state.formInfo;
        var tags = this.state.formInfo.tags;
        tags.splice(i, 1);
        newFormInfo.tags = tags;
        this.setState({formInfo: newFormInfo});
    }

    handleAddition = (tag) => {
        var newFormInfo = this.state.formInfo;
        var tags = this.state.formInfo.tags;
        tags.push({
            id: uuid.v4(),
            text: tag
        });
        newFormInfo.tags = tags;
        this.setState({formInfo: newFormInfo});
    }

    handleDrag = (tag, currPos, newPos) => {
        var newFormInfo = this.state.formInfo;
        var tags = this.state.formInfo.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        newFormInfo.tags = tags;
        this.setState({formInfo: newFormInfo});
    }
}
