// Libs
import React    from 'react';
import firebase from 'firebase';
import {DragSource, DropTarget} from 'react-dnd';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

// Files
import ItemTypes from '../../constants/itemTypes';


//drag drop stuff
const artworkSource = {
    beginDrag(props) {
        return {
            id   : props.artwork.id,
            album: props.artwork.album,
            type : ItemTypes.ARTWORK
        }
    }
};

const artworkTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.artwork.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
        if(sourceId != targetId) {
            targetProps.onMove(sourceProps.album,sourceId, targetId);
        }
    }
};

// Makes Artwork a Drag Source
@DragSource(ItemTypes.ARTWORK, artworkSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging() // map isDragging() state to isDragging prop
}))
// Makes Artwork a Drop Target
@DropTarget(ItemTypes.ARTWORK, artworkTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Artwork extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("------Artwork");
    }


    render() {
        if (this.props.artwork.submitted) {
            return this.renderSubmitted();
        } else {
            return this.renderNew();
        }
    }

    componentDidMount() {
        console.log("+++++++Artwork");
    }

    // ====== Render Conrtol =======

    renderSubmitted = () => {
        const {connectDragSource, connectDropTarget, isDragging,
            id, onMove, ...props} = this.props;

        const downloadTooltip = (
            <Tooltip
                id="download-artwork-tooltip"
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

        const deleteTooltip = (
            <Tooltip
                id="delete-artwork-tooltip"
                className="tooltip">
                Delete
            </Tooltip>
        );
        const submittedTooltip = (
            <Tooltip
                className="tooltip">
                Artwork already submitted!
            </Tooltip>
        );

        return connectDragSource(connectDropTarget(
            <article
                style={{opacity: isDragging ? 0 : 1}}
                className="artwork">
                
                <div
                    className="artwork-image"
                    onClick={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                    onTouchTap={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                    >
                    <img src={this.props.paths.images + this.props.artwork.id} />
                </div>
                <div className="artwork-info-submitted">
                    <h3 className="artwork-name">{this.props.artwork.title}</h3>
                    <div className="artwork-tools">


                        <OverlayTrigger placement="bottom" overlay={editTooltip}>
                            <img
                                className="artwork-tool"
                                src='assets/images/icons/edit-black.svg'
                                onClick={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                                onTouchTap={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                                 />
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
                            <img
                                className="artwork-tool"
                                src='assets/images/icons/delete-black.svg'
                                onClick={this.props.onDelete.bind(null, this.props.artwork.id)}
                                onTouchTap={this.props.onDelete.bind(null, this.props.artwork.id)}
                                />
                        </OverlayTrigger>
                        <a
                            href={this.props.artwork.fullsize_url}
                            download={this.props.artwork.filename} >
                            <OverlayTrigger placement="bottom" overlay={downloadTooltip}>
                                <img
                                    className="artwork-tool"
                                    src='assets/images/icons/download-black.svg' />
                            </OverlayTrigger>
                        </a>
                    </div>
                </div>
            </article>
        ));
    }

    renderNew = () => {
        const {connectDragSource, connectDropTarget, isDragging,
            id, onMove, ...props} = this.props;

        const downloadTooltip = (
            <Tooltip
                id="download-artwork-tooltip"
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

        const deleteTooltip = (
            <Tooltip
                id="delete-artwork-tooltip"
                className="tooltip">
                Delete
            </Tooltip>
        );

        const submitTooltip = (
            <Tooltip
                id="download-artwork-tooltip"
                className="tooltip">
                Submit to Tekuma!
            </Tooltip>
        );

        return connectDragSource(connectDropTarget(
            <article
                style={{opacity: isDragging ? 0 : 1}}
                className="artwork">
                <div
                    className="artwork-image"
                    onClick={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                    onTouchTap={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                    >
                    <img src={this.props.paths.images + this.props.artwork.id} />
                </div>
                <div className="artwork-info">
                    <h3 className="artwork-name">{this.props.artwork.title}</h3>
                    <div className="artwork-tools">

                        <OverlayTrigger placement="bottom" overlay={submitTooltip}>
                            <img
                                className="artwork-tool submit"
                                src='assets/images/icons/submit-black.svg'
                                onClick={this.props.onSubmit.bind(null, this.props.artwork.id)}
                                onTouchTap={this.props.onSubmit.bind(null, this.props.artwork.id)}
                                 />
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={editTooltip}>
                            <img
                                className="artwork-tool"
                                src='assets/images/icons/edit-black.svg'
                                onClick={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                                onTouchTap={this.props.onEdit.bind(null, this.props.artwork.id, this.props.artwork.album)}
                                 />
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
                            <img
                                className="artwork-tool"
                                src='assets/images/icons/delete-black.svg'
                                onClick={this.props.onDelete.bind(null, this.props.artwork.id)}
                                onTouchTap={this.props.onDelete.bind(null, this.props.artwork.id)}
                                />
                        </OverlayTrigger>
                        <a
                            href={this.props.artwork.fullsize_url}
                            download={this.props.artwork.filename} >
                            <OverlayTrigger placement="bottom" overlay={downloadTooltip}>
                                <img
                                    className="artwork-tool"
                                    src='assets/images/icons/download-black.svg' />
                            </OverlayTrigger>
                        </a>
                    </div>
                </div>
            </article>
        ));
    }
}
