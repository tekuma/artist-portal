import React from 'react';

export default class Album extends React.Component {
    constructor(props) {
        super(props);

        // Track 'editing' state.
        this.state = {
            editing: false
        };
    }

    render() {
        if(this.state.editing) {
            return this.renderEdit();
        }

        return this.renderAlbum();
    }

    renderEdit = () => {
        return (
            <li className={(this.props.currentAlbum === this.props.album.name.toLowerCase()) ? "album selected" : "album"}>
                <div className="album-avatar">
                    <img className="avatar-container" src={this.props.album.thumbnail} />
                </div>
                <div className="album-writing">
                    <input type="text"
                        className="edit-album"
                        ref={
                            (e) => e ? e.selectionStart = this.props.album.name.length : null
                        }
                        autoFocus={true}
                        defaultValue={this.props.album.name}
                        onBlur={this.finishEdit}
                        onKeyPress={this.checkEnter}
                        placeholder="Edit Album" />
                    <img className="album-more" src='assets/images/icons/more-white.svg' />
                </div>
            </li>
        );
    };

    renderAlbum = () => {
        return (
            <li onClick={this.props.changeAlbum} className={(this.props.currentAlbum === this.props.album.name.toLowerCase()) ? "album selected" : "album"}>
                <div className="album-avatar">
                    <img className="avatar-container" src={this.props.album.thumbnail} />
                </div>
                <div className="album-writing">
                    <h3 onClick={this.edit} className="album-name">{this.props.album.name}</h3>
                    <img className="album-more" src='assets/images/icons/more-white.svg' />
                </div>
            </li>
        );
    };

    edit = () => {
        // Enter edit mode.
        this.setState({
            editing: true
        });
    };

    checkEnter = (e) => {
        // The user hit *enter*, let's finish up.
        if(e.key === 'Enter') {
            this.finishEdit(e);
        }
    };

    finishEdit = (e) => {
        const value = e.target.value;

        if(this.props.onEdit) {
            this.props.onEdit(value);

            // Exit edit mode.
            this.setState({
                editing: false
            });
        }
    }
}
