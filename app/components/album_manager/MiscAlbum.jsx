// Libs
import React                        from 'react';
import firebase                     from 'firebase';
import {DragSource, DropTarget}     from 'react-dnd';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';

// Files
import ItemTypes                    from '../../constants/itemTypes';



// ============= Drag and Drop ===============

const albumTarget = {
    drop(targetProps, monitor, context) {
        const source = monitor.getItem();
        console.log(source, targetProps);
        // Move artwork to new album
        targetProps.changeArtworkAlbum(source.id, source.album, "Miscellaneous");

        // Change album within artwork JSON
        let path = context.props.paths.art + source.id;
        let thisArtworkRef = firebase.database().ref(path);
        thisArtworkRef.transaction((data) => {
            data['album'] = "Miscellaneous";
            console.log("Changed Album for Artwork !Lskdjkdnak");
            return data;
        });
    }
};


// Makes Album a Drop Target for Artworks
@DropTarget(ItemTypes.ARTWORK, albumTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

/**
 * TODO
 */
export default class MiscAlbum extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----MiscAlbum");
    }

    render() {
        let thumbnail = "../../assets/images/icons/new-album.svg";
        let artworkID;

        // ====== SETTING AVATAR IMAGE ======


        if (this.props.uploads.artworks) {
            // STEP 1: FIND FIRST ARTWORK IN ALBUM
            artworkID = this.props.uploads.artworks[0];

            // STEP 2: GET ARTWORK'S IMAGE URL
            if (this.props.user) {
                for (let id in this.props.user.artworks) {
                    if (this.props.user.artworks.hasOwnProperty(artworkID)) {
                        if (artworkID == id) {
                            let artwork = this.props.user.artworks[artworkID];
                            if (artwork.album) {
                                let image = this.props.paths.images + artworkID;
                                thumbnail = image;
                                break;
                            }
                        }
                    }
                }
            }
        }

        // ==================================

        let avatarStyle = {
            backgroundImage: 'url(' + thumbnail + ')'
        }

        let styleBlock = {
            width   : "100%"
        }

        let styleResponsive = {
            width   : 0.96 * (window.innerWidth * 0.3 - 40) - 70
        };

        let styleFixed = {
            width   : 210 * 0.96 - 70   // Album locker width caps at 210px. An album is 96% of the locker. The avatar is 70px
        };

        const downloadTooltip = (
            <Tooltip
                id="download-tooltip-regular"
                className="tooltip">
                Download
            </Tooltip>
        );

        const editTooltip = (
            <Tooltip
                id="edit-artwork-tooltip"
                className="tooltip">
                Edit
            </Tooltip>
        );

        const emptyTooltip = (
            <Tooltip
                id="delete-tooltip-regular"
                className="tooltip">
                Empty
            </Tooltip>
        );

        let connectDropTarget = this.props.connectDropTarget;

        return connectDropTarget(
            <li
                onClick     ={this.props.changeAlbum}
                className   ={(this.props.currentAlbum === 'Miscellaneous') ? "album black uploads selected" : "album black uploads"}>
                <div className="album-avatar">
                    <div style={avatarStyle}
                        className="avatar-container" />
                </div>
                <h3
                    style={(window.innerWidth * 0.3 > 440) ? styleBlock: (window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed}
                    id="uploads-album-name"
                    className="album-name">
                    Miscellaneous
                </h3>
                <div className="album-tools bottom">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={editTooltip}>
                        <img
                            className="album-tool"
                            src='assets/images/icons/edit-white.svg'
                            onClick={this.props.editMisc}
                            onTouchTap={this.props.editMisc}
                             />
                     </OverlayTrigger>
                    <OverlayTrigger
                        placement   ="bottom"
                        overlay     ={emptyTooltip}>
                        <img
                            className   ="album-tool"
                            src         ='assets/images/icons/delete-white.svg'
                            onClick     = {this.props.emptyMisc}
                            onTouchTap  ={this.props.changeAlbum} />

                    </OverlayTrigger>
                </div>
            </li>
        );
    }

    componentDidMount() {
        console.log("+++++MiscAlbum");
    }
}
