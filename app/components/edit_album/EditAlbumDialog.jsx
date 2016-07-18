// Libs
import React                from 'react';
import uuid                 from 'node-uuid';
import Dialog               from 'material-ui/Dialog';
import Snackbar             from 'material-ui/Snackbar';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

// Files
import EditAlbumForm      from './EditAlbumForm';
import ConfirmButton        from '../confirm_dialog/ConfirmButton';

/**
 * TODO
 */
export default class EditAlbumDialog extends React.Component {
    state =  {
        albumInfo: {},     // Used to store the album information to be edited
        errorType: {},     // Used to keep track of the type of error encountered to highlight relevant input field
        errors: [],        // Used to store Auth errors from Registration errors
        currentError: ""   // Used to store the current error to be displayed in the snackbar
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----EditAlbumDialog");
    }

    render() {
        const actions = [
              <ConfirmButton
                  label     ={"Update"}
                  className ="edit-album-yes"
                  onClick   ={this.onSubmit} />,

              <ConfirmButton
                  label     ={"Cancel"}
                  className ="edit-album-no"
                  onClick   ={this.props.toggleEditAlbumDialog} />
        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        title                       ="Edit Album"
                        actions                     ={actions}
                        modal                       ={false}
                        open                        ={this.props.editAlbumIsOpen}
                        titleClassName              ="edit-artwork-title"
                        actionsContainerClassName   ="edit-artwork-actions"
                        bodyClassName               ="edit-artwork-body"
                        contentClassName            ="edit-artwork-content" >
                        <EditAlbumForm
                            user            ={this.props.user}
                            value           ={this.state.albumInfo}
                            errorType       ={this.state.errorType}
                            currentError    ={this.state.currentError}
                            onChange        ={this.updateAlbumInfo}
                            onSubmit        ={this.onSubmit}
                            clearErrors     ={this.clearErrors} />
                    </Dialog>
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className           ="registration-error"
                        open                ={Object.keys(this.state.errorType).length > 0}
                        message             ={this.state.currentError}
                        autoHideDuration    ={4000} />
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++EditAlbumDialog");
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            albumInfo : nextProps.currentEditAlbumInfo
        })
    }

// ============= Methods ===============

    updateAlbumInfo = (albumInfo) => {
        console.log("Entered updateAlbumInfo");
        this.setState({
            albumInfo : albumInfo
        });
        console.log("Form Info: ", albumInfo);
    }

    onSubmit = (e) => {
        console.log("Entered onSubmit");
        console.log("Album form: ", this.state.albumInfo);
        e.preventDefault();

        // Test that user inputed an album name
        if (!this.state.albumInfo.name) {
            let errorType = this.state.errorType;
            errorType.name = true;
            this.setState({
                errorType: errorType
            });
            this.state.errors.push("Please enter a bane for the album");
        }

        // Test that user inputed an album description
        if (!this.state.albumInfo.description) {
            let errorType = this.state.errorType;
            errorType.description = true;
            this.setState({
                errorType: errorType
            });
            this.state.errors.push("Please enter an album description");
        }

        console.log("Got through errors");

        if(this.state.errors.length == 0) {
            console.log("Edit Album Info: ", this.state.albumInfo);
            // this.props.toggleEditArtworkDialog();
            let id = this.state.albumInfo["id"] // get ID
            this.state.albumInfo["id"] = null // remove ID from information
            this.props.updateAlbum(id, this.state.albumInfo);
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