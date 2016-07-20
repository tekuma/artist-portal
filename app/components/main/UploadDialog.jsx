// Libs
import React            from 'react';
import firebase         from 'firebase';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog           from 'material-ui/Dialog';
import uuid             from 'node-uuid';
import Masonry    from 'react-masonry-component';
// Files
import ConfirmButton    from '../confirm_dialog/ConfirmButton';


export default class UploadDialog extends React.Component {
    state = {
        files: []
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----UploadDialog");
    }

    render() {
        const actions = [
              <ConfirmButton
                label={"Close"}
                className="upload-dialog-button"
                onClick={this.props.closeUploadDialog}
              />
        ];

        let masonryOptions = {
            transitionDuration: 0
        };

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
                        bodyClassName="upload-dialog-body"
                        contentClassName="upload-dialog-content" >

                        <h2 className="upload-artwork-count">
                            Uploaded {this.state.files.length} file{(this.state.files.length == 1) ? "" : "s"}
                        </h2>
                        {(this.state.files.length > 0) ?
                            <Masonry
                                className="uploaded-artworks-container"
                                elementType={'div'}
                                options={masonryOptions}
                                disableImagesLoaded={false}
                                updateOnEachImageLoad={false}
                           >
                            {this.state.files.map(file =>
                                <article
                                    key={uuid.v4()}
                                    className="dropzone-image-preview-container">
                                    <img src={this.props.thumbnail(file.url, 300)} />
                                    <div className="overlay">
                                        <div>
                                            <h2 className="file-name">{file.name}</h2>
                                            <h2 className="file-size">{this.getFileSize(file.size)}</h2>
                                        </div>
                                    </div>
                                </article>
                            )}
                            </Masonry>
                            :
                            <div className="uploads-loading">
                                <div className="sk-wave">
                                    <div className="sk-rect sk-rect1"></div>
                                    <div className="sk-rect sk-rect2"></div>
                                    <div className="sk-rect sk-rect3"></div>
                                    <div className="sk-rect sk-rect4"></div>
                                    <div className="sk-rect sk-rect5"></div>
                                </div>
                            </div>
                          }
                        <h2 className="upload-artwork-hint">Closing this dialog won't stop the uploading process</h2>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++UploadDialog");
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            files: nextProps.uploadedPreviews
        })
    }

    // -------- METHODS ----------

    /**
     * [description] TODO
     * @param  {[type]} size [description]
     * @return {[type]}      [description]
     */
    getFileSize = (size) => {
        let numMod      = -1;
        let evalSize    = eval(size);
        let currentSize = evalSize;

        while (currentSize > 0) {
            currentSize = Math.floor(currentSize/1000);
            numMod++
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
