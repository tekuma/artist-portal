// Libs
import React from 'react';
import uuid from 'node-uuid';
import { WithOutContext as ReactTags } from 'react-tag-input';

/**
 * TODO
 */
export default class EditArtworkForm extends React.Component {

    state = {
        albumNames: [],
        tags: [],
        suggestions: []
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----EditArtworkForm");
    }

    render() {
        let oldArtwork  = this.props.value;
        let tags        = this.state.tags;
        let suggestions = this.state.suggestions;
        let onChange    = this.props.onChange;
        let clearErrors = this.props.clearErrors;
        let onSubmit    = this.props.onSubmit;

        let errorStyle = {
            border: '1px solid #ec167c'
        };

        let colors = [];

        if (this.props.value.colors) {
            for (let i = 0; i < Object.keys(this.props.value.colors).length; i++) {
                let color = this.props.value.colors[i].hex;
                colors.push({
                    background: color
                });
            }
        }

        let image = this.props.thumbnail(this.props.value.fullsize_url, 500);

        let previewImage = {
            backgroundImage: 'url(' + image + ')'
        }

        return (
            <div className="artwork-edit-dialog">
                <div className="artwork-preview-colors">
                    <div className="artwork-preview-wrapper">
                        <div
                            className="artwork-preview"
                            style={previewImage}>
                        </div>
                    </div>
                    <div className="artwork-colors">
                            <label className="color-heading center">
                                Color
                            </label>
                            <div className="color-circle-wrapper">
                                {colors.map(color => {
                                    return (
                                        <div
                                            key     ={uuid.v4()}
                                            className="color-box"
                                            style={color}>
                                        </div>
                                    );
                                })}
                            </div>
                    </div>
                </div>
                <div className="artwork-form-wrapper">
                    <form className="artwork-form" onSubmit={onSubmit}>
                        <fieldset>
                            <ul>
                                <li>
                                    <label htmlFor="artwork-title">
                                        Title <span className="pink">*</span>
                                    </label>
                                    <input
                                        type        ="text"
                                        style       ={this.props.errorType.title != undefined ? errorStyle : null}
                                        id          ="artwork-title"
                                        className   ="text-inputs"
                                        name        ="title"
                                        placeholder ="What is the title of this artwork?"
                                        value       ={this.props.value.title}
                                        maxLength   ="50"
                                        onClick     ={clearErrors}
                                        onChange    ={(e) => {
                                            onChange(Object.assign({}, oldArtwork, {title: e.target.value}))
                                        }} />
                                </li>
                                <li>
                                    <label htmlFor="artwork-artist">
                                        Artist <span className="pink">*</span>
                                    </label>
                                    <input
                                        type        ="text"
                                        style       ={this.props.errorType.artist != undefined ? errorStyle : null}
                                        id          ="artwork-artist"
                                        className   ="text-inputs"
                                        name        ="title"
                                        placeholder ="Who completed this artwork?"
                                        value       ={this.props.value.artist}
                                        maxLength   ="50"
                                        onClick     ={clearErrors}
                                        onChange    ={(e) => {
                                            onChange(Object.assign({}, oldArtwork, {artist: e.target.value}))
                                        }} />
                                </li>
                                <li
                                    id="li-album"
                                    className="controls-album">
                                    <label htmlFor="edit-artwork-album">
                                        Album
                                    </label>
                                    <div
                                        id="edit-artwork-album"
                                        className="edit-artwork-album">
                                        <div className="controls controls-album">
                                            <select
                                                className   ="edit-artwork-select"
                                                ref         ="editAlbum"
                                                value={this.props.value.album}
                                                onChange    ={(e) => {
                                                    onChange(Object.assign({}, oldArtwork, {album: e.target.value}))
                                                }}>
                                                {this.state.albumNames.map(album => {
                                                        return (
                                                            <option
                                                                key     ={uuid.v4()}
                                                                value   ={album}>
                                                                {album}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="artwork-year">
                                        Year <span className="pink">*</span>
                                    </label>
                                    <input
                                        type        ="text"
                                        style       ={this.props.errorType.year != undefined ? errorStyle : null}
                                        id          ="artwork-year"
                                        className   ="text-inputs"
                                        name        ="year"
                                        placeholder ="Year artwork was completed?"
                                        value       ={this.props.value.year}
                                        maxLength   ="4"
                                        pattern="[0-9]*"
                                        onClick     ={clearErrors}
                                        onChange    ={(e) => {
                                            onChange(Object.assign({}, oldArtwork, {year: e.target.value}))
                                        }} />
                                </li>
                                <li>
                                    <label htmlFor="artwork-tags">
                                        Tags
                                    </label>
                                    <ReactTags
                                        tags={tags}
                                        suggestions={suggestions}
                                        handleDelete={this.handleDelete}
                                        handleAddition={this.handleAddition}
                                        handleDrag={this.handleDrag} />
                                </li>
                                <li>
                                    <label
                                        htmlFor="artwork-description">
                                        Description
                                    </label>
                                    <textarea
                                        id          ="artwork-description"
                                        style       ={this.props.errorType.description != undefined ? errorStyle : null}
                                        placeholder ="Give this artwork a short description..."
                                        value       ={this.props.value.description}
                                        maxLength   ="1500"
                                        onClick     ={clearErrors}
                                        onChange    ={(e) => {
                                            onChange(Object.assign({}, oldArtwork, {description: e.target.value}))
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
        console.log("+++++EditArtworkForm");

        // Get Album Names
        if (this.props.user.albums) {
            let user       = this.props.user;
            let allAlbums  = user['albums'];
            let albumKeys  = Object.keys(allAlbums);
            let albumNames = [];

            for (let i = 0; i < albumKeys.length; i++) {
                let key = albumKeys[i];
                albumNames.push(allAlbums[key]['name']);
            }

            //Set albums to state
            this.setState({
                albumNames : albumNames
            });
        }

        // Get Tags
        if (this.props.value.tags) {
            let allTags  = this.props.value.tags;
            let tagKeys  = Object.keys(allTags);
            let tags = [];

            for (let i = 0; i < tagKeys.length; i++) {
                tags.push(allTags[i]);
            }

            //Set tags to state
            this.setState({
                tags : tags
            });
        }

        // Get suggestions
        let suggestions = [];
        let artworks = this.props.user.artworks;

        for (let artwork in artworks) {
            let artworkTags = artworks[artwork]["tags"];

            if (artworkTags) {
                for (let i = 0; i < Object.keys(artworkTags).length; i++) {
                    let text = artworkTags[i].text;
                    if (suggestions.indexOf(text) == -1) {
                        suggestions.push(text);
                    }
                }
            }
        }

        this.setState({
            suggestions : suggestions
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.albums) {
            let user       = nextProps.user;
            let allAlbums  = user['albums'];
            let albumKeys  = Object.keys(allAlbums);
            let albumNames = [];

            for (let i = 0; i < albumKeys.length; i++) {
                let key = albumKeys[i];
                albumNames.push(allAlbums[key]['name']);
            }

            //Set albums to state
            this.setState({
                albumNames : albumNames
            });
        }
    }

// ============= Methods ===============

    handleDelete = (i) => {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
        this.props.modifyTags(tags);
    }

    handleAddition = (tag) => {
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });

        this.setState({tags: tags});
        this.props.modifyTags(tags);
    }

    handleDrag = (tag, currPos, newPos) => {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: tags });
        this.props.modifyTags(tags);
    }
}

EditArtworkForm.propTypes = {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
};
