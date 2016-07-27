// Libs
import React                from 'react';
import uuid                 from 'node-uuid';
import Dialog               from 'material-ui/Dialog';
import Snackbar             from 'material-ui/Snackbar';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

// Files
import EditMiscAlbumForm      from './EditMiscAlbumForm';
import ConfirmButton        from '../confirm_dialog/ConfirmButton';

/**
 * TODO
 */
export default class EditMiscAlbumDialog extends React.Component {
    state =  {
        albumInfo: {}     // Used to store the album information to be edited
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
                  onClick   ={this.props.toggleEditMiscAlbumDialog} />
        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        title                       ="Edit Album"
                        actions                     ={actions}
                        modal                       ={false}
                        open                        ={this.props.editMiscAlbumIsOpen}
                        titleClassName              ="edit-album-title"
                        actionsContainerClassName   ="edit-album-actions"
                        bodyClassName               ="edit-album-body"
                        contentClassName            ="edit-album-content" >
                        <EditMiscAlbumForm
                            user            ={this.props.user}
                            modifyTags      ={this.modifyTags}
                            value           ={this.state.albumInfo}
                            onChange        ={this.updateAlbumInfo}
                            onSubmit        ={this.onSubmit} />
                    </Dialog>
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
        this.setState({
            albumInfo : albumInfo
        });
    }

    modifyTags = (tags) => {
        let albumInfo = this.state.albumInfo;
        albumInfo["tags"] = tags;

        this.setState({
            albumInfo : albumInfo
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        let id = this.state.albumInfo["id"] // get ID
        this.state.albumInfo["id"] = null // remove ID from information
        this.props.updateAlbum(id, this.state.albumInfo);
    }
}
