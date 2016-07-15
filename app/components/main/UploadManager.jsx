// Libs
import React    from 'react';
import Dropzone from 'react-dropzone';
//Files


export default class UploadManager extends React.Component {
    state = {};

    componentWillMount() {
        console.log("-----UploadManager");
    }

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

    componentDidMount() {
        console.log("+++++UploadManager");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

    // ---------- METHODS -------------

    onDrop = (files) => {
        this.props.setUploadedFiles(files);
    }

}
