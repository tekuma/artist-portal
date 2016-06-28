import React from 'react';

export default class UploadLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="artwork-upload-box">
                <h3 className="upload-writing big">Drop Files Here</h3>
                <h3 className="upload-writing small">or Click to Upload</h3>
            </div>
        );
    }
}
