import React from 'react';
import Dropzone from 'react-dropzone';

export default class UploadManager extends React.Component {

    render() {
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

    onDrop = (files) => {
        this.props.setUploadedFiles(files);
        console.log('Set uploaded files: ', files);
    }
}
