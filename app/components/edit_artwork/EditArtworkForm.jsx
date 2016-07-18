// Libs
import React from 'react';
import uuid from 'node-uuid';
const ReactTags = require('react-tag-input').WithOutContext;

/**
 * TODO
 */
export default class EditArtworkForm extends React.Component {

    state = {
        albumNames: [],
        tags: []
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
        console.log(tags);
        let onChange    = this.props.onChange;
        let clearErrors = this.props.clearErrors;
        let onSubmit    = this.props.onSubmit;

        let errorStyle = {
            border: '1px solid #ec167c'
        };

        let vibrantColor;
        let mutedColor;
        let darkVibrantColor;
        let darkMutedColor;
        let lightVibrantColor;
        let lightMutedColor;

        if (this.props.value.colors.v != undefined &&
            this.props.value.colors.v != null ) {
                vibrantColor = {
                    background: this.props.value.colors.v.hex
                }
            }



        if (this.props.value.colors.m != undefined &&
            this.props.value.colors.m != null ) {
                mutedColor = {
                    background: this.props.value.colors.m.hex
                }
            }



        if (this.props.value.colors.dv != undefined &&
            this.props.value.colors.dv != null ) {
                darkVibrantColor = {
                    background: this.props.value.colors.dv.hex
                }
            }



        if (this.props.value.colors.dm != undefined &&
            this.props.value.colors.dm != null ) {
                darkMutedColor = {
                    background: this.props.value.colors.dm.hex
                }
            }



        if (this.props.value.colors.lv != undefined &&
            this.props.value.colors.lv != null ) {
                lightVibrantColor = {
                    background: this.props.value.colors.lv.hex
                }
            }

        if (this.props.value.colors.lm != undefined &&
            this.props.value.colors.lm != null ) {
                lightMutedColor = {
                    background: this.props.value.colors.lm.hex
                }
            }

        return (
            <div>
                <div>
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
                                        onClick     ={clearErrors}
                                        onChange    ={(e) => {
                                            onChange(Object.assign({}, oldArtwork, {year: e.target.value}))
                                        }} />
                                </li>
                                <li>
                                    <label
                                        className="center"
                                        htmlFor="artwork-description">
                                        Description
                                    </label>
                                    <textarea
                                        id          ="artwork-description"
                                        style       ={this.props.errorType.description != undefined ? errorStyle : null}
                                        placeholder ="Give this artwork a short description..."
                                        value       ={this.props.value.description}
                                        onClick     ={clearErrors}
                                        onChange    ={(e) => {
                                            onChange(Object.assign({}, oldArtwork, {description: e.target.value}))
                                        }} />
                                </li>
                                <li className="color-tags">
                                    <label className="color-heading center">
                                        Color
                                    </label>
                                    <div className="color-circle-wrapper">
                                        <div
                                            className="color-box vibrant"
                                            style={ vibrantColor != null ? vibrantColor : null}>
                                        </div>
                                        <div
                                            className="color-box muted"
                                            style={ mutedColor != null ? mutedColor : null}>
                                        </div>
                                        <div
                                            className="color-box dark-vibrant"
                                            style={ darkVibrantColor != null ? darkVibrantColor : null}>
                                        </div>
                                        <div
                                            className="color-box dark-muted"
                                            style={ darkMutedColor != null ? darkMutedColor : null}>
                                        </div>
                                        <div
                                            className="color-box light-vibrant"
                                            style={ lightVibrantColor != null ? lightVibrantColor : null}>
                                        </div>
                                        <div
                                            className="color-box light-muted"
                                            style={ lightMutedColor != null ? lightMutedColor : null}>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="artwork-tags">
                                        Tags
                                    </label>
                                    <ReactTags
                                        tags={tags}
                                        handleDelete={this.handleDelete}
                                        handleAddition={this.handleAddition}
                                        handleDrag={this.handleDrag} />
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

        // Get Tags
        if (nextProps.value.tags) {
            let allTags  = nextProps.value.tags;
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
