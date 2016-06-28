import React from 'react';
var Dropzone = require('react-dropzone');
import '../../assets/stylesheets/filepicker.css';
import '../../assets/stylesheets/dropzone.min.css';

export default class UploadLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        }
    }

    render() {
        if(this.state.files.length > 0) {
            return this.renderArtworks();
        } else {
            return this.renderEmptyDropzone();
        }
    }

    renderArtworks = () => {
        return(
            <Dropzone
                className="artwork-upload-box"
                accept="image/*"
                onDrop={this.onDrop}>
                <div>
                    <h2 className="uploading">Uploaded {this.state.files.length} file{(this.state.files.length == 1) ? "" : "s"} <span>.</span><span>.</span><span>.</span></h2>
                    <div>
                        {this.state.files.map(file =>
                            <div className="dropzone-image-preview-container">
                                <img src={file.preview} />
                                <div className="overlay">
                                    <div>
                                        <h2 className="file-name">{file.name}</h2>
                                        <h2 className="file-size">{file.size}</h2>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <h2 className="upload-writing small">View your artworks in the Uploads Album</h2>
                </div>
            </Dropzone>
        );
    }

    renderEmptyDropzone = () => {
        return(
            <Dropzone
                className="artwork-upload-box"
                accept="image/*"
                onDrop={this.onDrop}>
                <h3 className="upload-writing big">Drop Files Here</h3>
                <h3 className="upload-writing small">or Click to Upload</h3>
            </Dropzone>
        );
    }

    getFileSize = (size) => {
        var numMod = 0;
        var evalSize = eval(size);
        var currentSize = evalSize;

        while(currentSize != 0) {
            currentSize = currentSize % 1000;
            numMod += 1;
        }

        switch(numMod) {
            case 0:
                return evalSize + " bytes";

            case 1:
                return Math.round(evalSize % Math.pow(1000, 1)) + "Kb";

            case 2:
                return Math.round(evalSize % Math.pow(1000, 2)) + "Mb";

            case 3:
                return Math.round(evalSize % Math.pow(1000, 3)) + "Gb";

            default:
                return evalSize + "bytes";
        }

        console.log(numMod);
        console.log(evalSize);
        console.log(currentSize);
    }

    onDrop = (files) => {
        this.setState({
            files: files
        });
         console.log('Received files: ', files);
    }
}
