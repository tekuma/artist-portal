// Libs
import React from 'react';
import uuid from 'node-uuid';

/**
 * TODO
 */
export default class EditAlbumForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----EditAlbumForm");
    }

    render() {
        let oldAlbum  = this.props.value;
        let onChange    = this.props.onChange;
        let clearErrors = this.props.clearErrors;
        let onSubmit    = this.props.onSubmit;

        let errorStyle = {
            border: '1px solid #ec167c'
        };

        return (
            <div>
                <div>
                    <form className="artwork-form" onSubmit={onSubmit}>
                        <fieldset>
                            <ul>
                                <li>
                                    <label htmlFor="album-title">
                                        Name <span className="pink">*</span>
                                    </label>
                                    <input
                                        type        ="text"
                                        style       ={this.props.errorType.name != undefined ? errorStyle : null}
                                        id          ="album-title"
                                        name        ="title"
                                        placeholder ="What is the name of this album?"
                                        defaultValue={this.props.value.name}
                                        onClick     ={clearErrors}
                                        onChange    ={(e) => {
                                            onChange(Object.assign({}, oldAlbum, {title: e.target.value}))
                                        }} />
                                </li>
                                <li>
                                    <label
                                        className="center"
                                        htmlFor="album-description">
                                        Description
                                    </label>
                                    <textarea
                                        id          ="album-description"
                                        style       ={this.props.errorType.description != undefined ? errorStyle : null}
                                        placeholder ="Give this album a short description..."
                                        value       ={this.props.value.description}
                                        onClick     ={clearErrors}
                                        onChange    ={(e) => {
                                            onChange(Object.assign({}, oldAlbum, {description: e.target.value}))
                                        }} />
                                </li>
                            </ul>
                        </fieldset>
                    </form>
                </div>
            </div>

        );
    }

    componentDidMount() {
        console.log("+++++EditAlbumForm");
    }
}

EditAlbumForm.propTypes = {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
};
