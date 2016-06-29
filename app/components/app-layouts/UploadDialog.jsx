import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import ConfirmButton from '../confirm-dialog/ConfirmButton';

export default class UploadDialog extends React.Component {
    constructor(props) {
        super(props);


        this.state =  {
            files: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            files: nextProps.uploadedFiles
        })
    }

    render() {

        const actions = [
              <ConfirmButton
                label={"Close"}
                className="upload-dialog-button"
                onClick={this.props.closeUploadDialog}
              />
        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        title="Uploaded Artworks"
                        actions={actions}
                        modal={false}
                        open={this.props.uploadDialogIsOpen}
                        titleClassName="upload-dialog-title"
                        actionsContainerClassName="upload-dialog-actions"
                        bodyClassName="uplaod-dialog-body"
                        contentClassName="upload-dialog-content" >
                        <div>
                            <h2 className="upload-artwork-count">
                                Uploaded {this.state.files.length} file{(this.state.files.length == 1) ? "" : "s"}
                            </h2>
                            <div className="uploaded-artworks-container">
                                {this.state.files.map(file =>
                                    <article className="dropzone-image-preview-container">
                                        <img src={file.preview} />
                                        <div className="overlay">
                                            <div>
                                                <h2 className="file-name">{file.name}</h2>
                                                <h2 className="file-size">{this.getFileSize(file.size)}</h2>
                                            </div>
                                        </div>
                                    </article>
                                )}
                            </div>
                            <h2 className="upload-artwork-hint">View your artworks in the Uploads album</h2>
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    getFileSize = (size) => {
        var numMod = -1;
        var evalSize = eval(size);
        var currentSize = evalSize;

        while(currentSize > 0) {
            currentSize = Math.floor(currentSize/1000);
            numMod += 1;
        }

        switch(numMod) {
            case 0:
                return evalSize + " bytes";

            case 1:
                return Math.floor(evalSize/Math.pow(1000, 1)) + " kB";

            case 2:
                return Math.round(evalSize/Math.pow(1000, 2)) + " MB";

            case 3:
                return Math.floor(evalSize/Math.pow(1000, 3)) + " GB";

            default:
                return evalSize + "bytes";
        }
    }
}
