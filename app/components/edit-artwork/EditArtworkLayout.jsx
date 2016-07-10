import React from 'react';
import uuid from 'node-uuid';

export default class EditArtworkForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albumNames: this.props.albumNames
        }
    }

    render() {
        var oldArtwork = this.props.value;
        var onChange = this.props.onChange;
        var clearErrors = this.props.clearErrors;
        var onSubmit = this.props.onSubmit;

        var errorStyle = {
            border: '1px solid #ec167c'
        };

        return (
            <div>
                {this.props.errorMessages.map(error => {
                        return (
                            <div
                                className="edit-artwork-error">
                                <h3>{error}</h3>
                            </div>
                        );
                    })}
                <form className="artwork-form" onSubmit={onSubmit}>
                    <fieldset>
                        <ul>
                            <li>
                                <label for="artwork-title">Title <span className="pink">*</span> :</label>
                                <input
                                    type="text"
                                    style={this.props.errors.title != undefined ? errorStyle : null}
                                    id="artwork-title"
                                    name="title"
                                    placeholder="What is the title of this artwork?"
                                    value={this.props.value.title}
                                    onClick={clearErrors}
                                    onChange={(e) => {
                                        onChange(Object.assign({}, oldArtwork, {title: e.target.value}))
                                    }} />
                            </li>
                            <li>
                                <label for="artwork-artist">Artist <span className="pink">*</span> :</label>
                                <input
                                    type="text"
                                    style={this.props.errors.artist != undefined ? errorStyle : null}
                                    id="artwork-artist"
                                    name="title"
                                    placeholder="Who completed this artwork?"
                                    value={this.props.value.artist}
                                    onClick={clearErrors}
                                    onChange={(e) => {
                                        onChange(Object.assign({}, oldArtwork, {artist: e.target.value}))
                                    }} />
                            </li>
                            <li id="li-album" className="controls-album">
                                <label for="edit-artwork-album">Album:</label>
                                    <div id="edit-artwork-album" className="edit-artwork-album">
                                        <div className="controls controls-album">
                                            <select
                                                className="edit-artwork-select"
                                                ref="editAlbum"
                                                onChange={(e) => {
                                                    onChange(Object.assign({}, oldArtwork, {album: e.target.value}))
                                                }}>
                                                {this.state.albumNames.map(album => {
                                                        return (
                                                            <option
                                                                key={uuid.v4()}
                                                                value={album}>
                                                                {album}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                    </div>
                            </li>
                            <li>
                                <label for="artwork-year">Year <span className="pink">*</span> :</label>
                                <input
                                    type="text"
                                    style={this.props.errors.year != undefined ? errorStyle : null}
                                    id="artwork-year"
                                    name="year"
                                    placeholder="Year artwork was completed?"
                                    value={this.props.value.year}
                                    onClick={clearErrors}
                                    onChange={(e) => {
                                        onChange(Object.assign({}, oldArtwork, {year: e.target.value}))
                                    }} />
                            </li>
                            <li>
                                <label className="center" for="artwork-description">Description:</label>
                                <textarea
                                    id="artwork-description"
                                    style={this.props.errors.description != undefined ? errorStyle : null}
                                    placeholder="Give this artwork a short description..."
                                    value={this.props.value.description}
                                    onClick={clearErrors}
                                    onChange={(e) => {
                                        onChange(Object.assign({}, oldArtwork, {description: e.target.value}))
                                    }} />
                            </li>
                            <li className="color-tags">
                                <label className="color-heading center">Color :</label>
                                <div className="color-circle-wrapper">
                                    <label for="red" className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="red"
                                            className="color"
                                            name="color"
                                            checked={this.props.value.colors.red}
                                            onClick={clearErrors}
                                            onChange={(e) => {
                                                onChange(
                                                    Object.assign(
                                                        {},
                                                        oldArtwork,
                                                        {
                                                            colors: Object.assign(
                                                                {},
                                                                oldArtwork.colors,
                                                                {red: e.target.checked}
                                                            )
                                                        }
                                                    )
                                                )}} />
                                        <div className="color-circle red">
                                        </div>
                                    </label>
                                    <label for="yellow" className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="yellow"
                                            className="color"
                                            name="color"
                                            checked={this.props.value.colors.yellow}
                                            onClick={clearErrors}
                                            onChange={(e) => {
                                                onChange(
                                                    Object.assign(
                                                        {},
                                                        oldArtwork,
                                                        {
                                                            colors: Object.assign(
                                                                {},
                                                                oldArtwork.colors,
                                                                {yellow: e.target.checked}
                                                            )
                                                        }
                                                    )
                                                )}} />
                                        <div className="color-circle yellow">
                                        </div>
                                    </label>
                                    <label for="blue" className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="blue"
                                            className="color"
                                            name="color"
                                            checked={this.props.value.colors.blue}
                                            onClick={clearErrors}
                                            onChange={(e) => {
                                                onChange(
                                                    Object.assign(
                                                        {},
                                                        oldArtwork,
                                                        {
                                                            colors: Object.assign(
                                                                {},
                                                                oldArtwork.colors,
                                                                {blue: e.target.checked}
                                                            )
                                                        }
                                                    )
                                                )}} />
                                        <div className="color-circle blue">
                                        </div>
                                    </label>
                                    <label for="green" className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="green"
                                            className="color"
                                            name="color"
                                            checked={this.props.value.colors.green}
                                            onClick={clearErrors}
                                            onChange={(e) => {
                                                onChange(
                                                    Object.assign(
                                                        {},
                                                        oldArtwork,
                                                        {
                                                            colors: Object.assign(
                                                                {},
                                                                oldArtwork.colors,
                                                                {green: e.target.checked}
                                                            )
                                                        }
                                                    )
                                                )}} />
                                        <div className="color-circle green">
                                        </div>
                                    </label>
                                    <label for="orange" className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="orange"
                                            className="color"
                                            name="color"
                                            checked={this.props.value.colors.orange}
                                            onClick={clearErrors}
                                            onChange={(e) => {
                                                onChange(
                                                    Object.assign(
                                                        {},
                                                        oldArtwork,
                                                        {
                                                            colors: Object.assign(
                                                                {},
                                                                oldArtwork.colors,
                                                                {orange: e.target.checked}
                                                            )
                                                        }
                                                    )
                                                )}} />
                                        <div className="color-circle orange">
                                        </div>
                                    </label>
                                    <label for="purple" className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="purple"
                                            className="color"
                                            name="color"
                                            checked={this.props.value.colors.purple}
                                            onClick={clearErrors}
                                            onChange={(e) => {
                                                onChange(
                                                    Object.assign(
                                                        {},
                                                        oldArtwork,
                                                        {
                                                            colors: Object.assign(
                                                                {},
                                                                oldArtwork.colors,
                                                                {purple: e.target.checked}
                                                            )
                                                        }
                                                    )
                                                )}} />
                                        <div className="color-circle purple">
                                        </div>
                                    </label>
                                    <label for="brown" className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="brown"
                                            className="color"
                                            name="color"
                                            checked={this.props.value.colors.brown}
                                            onClick={clearErrors}
                                            onChange={(e) => {
                                                onChange(
                                                    Object.assign(
                                                        {},
                                                        oldArtwork,
                                                        {
                                                            colors: Object.assign(
                                                                {},
                                                                oldArtwork.colors,
                                                                {brown: e.target.checked}
                                                            )
                                                        }
                                                    )
                                                )}} />
                                        <div className="color-circle brown">
                                        </div>
                                    </label>
                                    <label for="black" className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="black"
                                            className="color"
                                            name="color"
                                            checked={this.props.value.colors.black}
                                            onClick={clearErrors}
                                            onChange={(e) => {
                                                onChange(
                                                    Object.assign(
                                                        {},
                                                        oldArtwork,
                                                        {
                                                            colors: Object.assign(
                                                                {},
                                                                oldArtwork.colors,
                                                                {black: e.target.checked}
                                                            )
                                                        }
                                                    )
                                                )}} />
                                        <div className="color-circle black">
                                        </div>
                                    </label>
                                    <label for="gray" className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="gray"
                                            className="color"
                                            name="color"
                                            checked={this.props.value.colors.gray}
                                            onClick={clearErrors}
                                            onChange={(e) => {
                                                onChange(
                                                    Object.assign(
                                                        {},
                                                        oldArtwork,
                                                        {
                                                            colors: Object.assign(
                                                                {},
                                                                oldArtwork.colors,
                                                                {gray: e.target.checked}
                                                            )
                                                        }
                                                    )
                                                )}} />
                                        <div className="color-circle gray">
                                        </div>
                                    </label>
                                    <label for="white" className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="white"
                                            className="color"
                                            name="color"
                                            checked={this.props.value.colors.white}
                                            onClick={clearErrors}
                                            onChange={(e) => {
                                                onChange(
                                                    Object.assign(
                                                        {},
                                                        oldArtwork,
                                                        {
                                                            colors: Object.assign(
                                                                {},
                                                                oldArtwork.colors,
                                                                {white: e.target.checked}
                                                            )
                                                        }
                                                    )
                                                )}} />
                                        <div className="color-circle white">
                                        </div>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <label for="artwork-tags">Tags :</label>
                                <input
                                    type="text"
                                    id="artwork-tags"
                                    name="tags"
                                    placeholder="Enter searchable tag words..."
                                    value={this.props.value.tags}
                                    onClick={clearErrors}
                                    onChange={(e) => {
                                        onChange(Object.assign({}, oldArtwork, {tags: e.target.value}))
                                    }} />
                            </li>
                        </ul>
                    </fieldset>
                </form>
            </div>
        );
    }
}

EditArtworkForm.propTypes = {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
};
