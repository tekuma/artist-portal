// Libs
import React from 'react';
import uuid from 'node-uuid';
import { WithOutContext as ReactTags } from 'react-tag-input';

/**
 * TODO
 */
export default class EditMiscAlbumForm extends React.Component {
    state = {
        tags: [],
        suggestions: []
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----EditMiscAlbumForm");
    }

    render() {
        let oldAlbum    = this.props.value;
        let tags        = this.state.tags;
        let suggestions = this.state.suggestions;
        let onChange    = this.props.onChange;
        let onSubmit    = this.props.onSubmit;

        return (
            <div>
                <div>
                    <form className="album-form" onSubmit={onSubmit}>
                        <fieldset>
                            <ul>
                                <li><h3 className="edit-album-hint">Changes to fields will be transferred to album artworks, and will overwrite corresponding artwork fields.</h3></li>
                                <li>
                                    <label htmlFor="album-artist">
                                        Artist
                                    </label>
                                    <input
                                        type        ="text"
                                        id          ="album-artist"
                                        className   ="text-inputs"
                                        name        ="artist"
                                        placeholder ="Who completed this album of artworks?"
                                        defaultValue={this.props.value.artist}
                                        maxLength   ="50"
                                        onChange    ={(e) => {
                                            onChange(Object.assign({}, oldAlbum, {artist: e.target.value}))
                                        }} />
                                </li>
                                <li>
                                    <label htmlFor="album-year">
                                        Year
                                    </label>
                                    <input
                                        type        ="text"
                                        id          ="album-year"
                                        className   ="text-inputs"
                                        name        ="title"
                                        placeholder ="Year album completed?"
                                        defaultValue={this.props.value.year}
                                        maxLength   ="4"
                                        pattern     ="[0-9]*"
                                        onChange    ={(e) => {
                                            onChange(Object.assign({}, oldAlbum, {year: e.target.value}))
                                        }} />
                                </li>
                                <li>
                                    <label htmlFor="album-tags">
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
                                        className="center"
                                        htmlFor="album-description">
                                        Description
                                    </label>
                                    <textarea
                                        id          ="album-description"
                                        placeholder ="Give this album a short description..."
                                        value       ={this.props.value.description}
                                        maxLength   ="1500"
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
        console.log("+++++EditMiscAlbumForm");

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
            if(artworks[artwork]["tags"]) {
                let artworkTags = artworks[artwork]["tags"];
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

EditMiscAlbumForm.propTypes = {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
};
