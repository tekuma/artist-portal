// Libs
import React                from 'react';
import uuid                 from 'node-uuid';
import Dialog               from 'material-ui/Dialog';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import { WithOutContext as ReactTags } from 'react-tag-input';

// Files
import ConfirmButton        from '../confirm_dialog/ConfirmButton';

/**
 * TODO
 */
export default class ArtworkDetailBoxDialog extends React.Component {
    state = {
        artworkInfo: {},
        tags: [],
        colors: []
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ArtworkDetailBoxDialog");
    }

    render() {
        const actions = [
              <ConfirmButton
                label={"Close"}
                className="upload-dialog-button"
                onClick={this.props.toggleArtworkDetailDialog}
              />
        ];

        let colors = [];
        let image = this.props.paths.images + this.state.artworkInfo.id;
        let previewImage = {
            backgroundImage: 'url(' + image + ')'
        }



        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        actions                     ={actions}
                        modal                       ={false}
                        open                        ={this.props.artworkDetailDialogIsOpen}
                        titleClassName              ="edit-artwork-title"
                        actionsContainerClassName   ="edit-artwork-actions"
                        bodyClassName               ="edit-artwork-body detail"
                        contentClassName            ="edit-artwork-content" >
                        <div className="artwork-detail-dialog">
                            <div className="artwork-preview submitted">
                                <div
                                    className="artwork-image submitted"
                                    style={previewImage}>
                                </div>
                            </div>
                            <div className="artwork-info-wrapper">
                                <div className="artwork-details">
                                    <div
                                        className="artwork-title">
                                        {this.state.artworkInfo.title == "" ? "None" : this.state.artworkInfo.title}
                                    </div>
                                    <div
                                        className="artwork-artist">
                                        {this.state.artworkInfo.artist == "" ? "None" : this.state.artworkInfo.artist}
                                    </div>
                                    <div
                                        className="artwork-year">
                                        {this.state.artworkInfo.year == "" ? "None" : this.state.artworkInfo.year}
                                    </div>
                                </div>
                                <div className="other-artwork-details">
                                    <h4 className="artwork-album-heading">
                                        Album
                                    </h4>
                                    <div
                                        className="artwork-album">
                                        {this.state.artworkInfo.album == "" ? "None" : this.state.artworkInfo.album}
                                    </div>
                                    <h4 className="artwork-tags-heading">
                                        Tags
                                    </h4>
                                    <div className="artwork-tags">
                                        <ReactTags
                                            tags={this.state.tags}
                                            readOnly={true}
                                            />
                                    </div>
                                    <h4
                                        className="artwork-description-heading">
                                        Description
                                    </h4>
                                    <div
                                        className="artwork-description">
                                        {this.state.artworkInfo.description == "" ? "None" : this.state.artworkInfo.description}
                                    </div>
                                    <h4
                                        className="artwork-colors-heading">
                                        Colors
                                    </h4>
                                    <div className="artwork-colors detail">
                                        {this.state.colors.map(color => {
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
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++ArtworkDetailBoxDialog");
    }

    componentWillReceiveProps(nextProps) {
        let tags = [];
        let colors = [];

        // Get Tags
        if (nextProps.artworkInfo.tags) {
            let allTags  = nextProps.artworkInfo.tags;
            let tagKeys  = Object.keys(allTags);

            for (let i = 0; i < tagKeys.length; i++) {
                tags.push(allTags[i]);
            }
        }

        if (nextProps.artworkInfo.colors) {
            for (let i = 0; i < Object.keys(nextProps.artworkInfo.colors).length; i++) {
                let color = nextProps.artworkInfo.colors[i].hex;
                colors.push({
                    background: color
                });
            }
        }

        this.setState({
            artworkInfo : nextProps.artworkInfo,
            tags: tags,
            colors: colors
        });
    }
}
