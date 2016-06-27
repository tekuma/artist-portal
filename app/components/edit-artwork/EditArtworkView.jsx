import React from 'react';
import EditArtworkForm from './EditArtworkForm';
import ArtworkActions from '../../actions/ArtworkActions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import ConfirmButton from '../confirm-dialog/ConfirmButton';

export default class EditArtworkView extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            formInfo: this.props.getCurrentEditArtwork
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formInfo: nextProps.getCurrentEditArtwork
        })
        console.log(nextProps.getCurrentEditArtwork);
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
                onClick={this.props.toggleEditArtwork}
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
                            clearErrors={this.clearErrors} />
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    updateFormInfo = (formInfo) => {
        this.setState({formInfo});
        console.log(this.state.formInfo);
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
            this.props.toggleEditArtwork();
        }
    }

    clearErrors = () => {
        this.setState({
            errors: {}
        });
    }
}
