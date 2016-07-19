// Libs
import React                from 'react';
import uuid                 from 'node-uuid';
import Dialog               from 'material-ui/Dialog';
import Snackbar             from 'material-ui/Snackbar';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

// Files
import EditArtworkForm      from './EditArtworkForm';
import ConfirmButton        from '../confirm_dialog/ConfirmButton';

/**
 * TODO
 */
export default class EditArtworkDialog extends React.Component {
    state =  {
        artworkInfo: {},   // Used to store the artwork informationto be edited
        errorType: {},     // Used to keep track of the type of error encountered to highlight relevant input field
        errors: [],        // Used to store Auth errors from Registration errors
        currentError: ""   // Used to store the current error to be displayed in the snackbar
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----EditArtworkDialog");
    }

    render() {
        const actions = [
              <ConfirmButton
                  label     ={"Update"}
                  className ="edit-artwork-yes"
                  onClick   ={this.onSubmit} />,

              <ConfirmButton
                  label     ={"Cancel"}
                  className ="edit-artwork-no"
                  onClick   ={this.props.toggleEditArtworkDialog} />
        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        title                       ="Edit Artwork"
                        actions                     ={actions}
                        modal                       ={false}
                        open                        ={this.props.editArtworkIsOpen}
                        titleClassName              ="edit-artwork-title"
                        actionsContainerClassName   ="edit-artwork-actions"
                        bodyClassName               ="edit-artwork-body"
                        contentClassName            ="edit-artwork-content" >
                        <EditArtworkForm
                            user            ={this.props.user}
                            thumbnail       ={this.props.thumbnail}
                            albumNames      ={this.props.albumNames}
                            value           ={this.state.artworkInfo}
                            errorType       ={this.state.errorType}
                            currentError    ={this.state.currentError}
                            onChange        ={this.updateArtworkInfo}
                            modifyTags      ={this.modifyTags}
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
        console.log("+++++EditArtworkDialog");
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            artworkInfo : nextProps.currentEditArtworkInfo
        })
    }

// ============= Methods ===============

    updateArtworkInfo = (artworkInfo) => {
        this.setState({
            artworkInfo : artworkInfo
        });
    }

    modifyTags = (tags) => {
        let artworkInfo = this.state.artworkInfo;
        artworkInfo["tags"] = tags;

        this.setState({
            artworkInfo : artworkInfo
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // Test that user inputed a title
        if (!this.state.artworkInfo.title) {
            let errorType = this.state.errorType;
            errorType.title = true;
            this.setState({
                errorType: errorType
            });
            this.state.errors.push("Please enter a title for the artwork");
        }

        // Test that user inputed an artist
        if (!this.state.artworkInfo.artist) {
            let errorType = this.state.errorType;
            errorType.artist = true;
            this.setState({
                errorType: errorType
            });
            this.state.errors.push("Please enter an artist name");
        }

        // Test that user inputed a year
        if (!this.state.artworkInfo.year) {
            let errorType = this.state.errorType;
            errorType.year = true;
            this.setState({
                errorType: errorType
            });
            this.state.errors.push("Please enter the year in which the artwork was completed");
        }

        // Test that user inputed correct year
        if (!/[0-9]{4}/.test(this.state.artworkInfo.year)) {
            let errorType = this.state.errorType;
            errorType.year = true;
            this.setState({
                errorType: errorType
            });
            this.state.errors.push("Please enter a valid year");
        }

        if(this.state.errors.length == 0) {
            // this.props.toggleEditArtworkDialog();
            this.props.updateArtwork(this.state.artworkInfo);
        }

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
