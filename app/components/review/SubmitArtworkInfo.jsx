// Libs
import React        from 'react';
import ReactDOM     from 'react-dom';
import firebase     from 'firebase';
// Files
import Views        from '../../constants/Views';

/**
 * TODO
 */
export default class SubmitArtworkInfo extends React.Component {
    state = {
        tags: []
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----SubmitArtworkInfo");
    }

    render() {
        let submit = this.props.submits[this.props.reviewArtwork];

        let styleManagerClosed = {
            width: window.innerWidth - 40,
            height: window.innerHeight - 60
        };

        let styleManagerOpen = {
            width: window.innerWidth * 0.75,  // Submit Album Manager is 25% of Screen
            height: window.innerHeight - 60
        };

        let styleLargeScreen = {
            width: window.innerWidth - 400,
            height: window.innerHeight - 60
        };

        let styleSmallScreen = {
            width: window.innerWidth - 250,
            height: window.innerHeight - 60
        };

        let fixedWidth = {
            width: window.innerWidth,
            height: window.innerHeight - 60
        };

        if (!submit) {
            return (
                <section
                    className="artwork-upload-box right"
                    style={this.props.managerIsOpen ?
                                (window.innerWidth * 0.25 > 440) ?
                                    styleLargeScreen :
                                    (window.innerWidth * 0.25 > 250) ?
                                        styleManagerOpen :
                                        (window.innerWidth > 410) ?
                                            styleSmallScreen :
                                            fixedWidth
                                    : styleManagerClosed}
                    >
                    <img id="no-submit-info-icon" src="assets/images/icons/arrow-left-gradient.svg"/>
                    <h3 className="upload-writing big">Select a Submitted Artwork</h3>
                </section>
            )
        }

        let thumbnail_url = this.props.paths.images + submit.artwork_uid;
        let previewStyle = {
            backgroundImage: `url(${thumbnail_url})`
        }

        let artworkStatusStyleLarge = {
            height: window.innerHeight - 60 - 285
        }

        let artworkStatusStyleMedium = {
            height: window.innerHeight - 60 - 397
        }

        let artworkStatusStyleSmall = {
            height: window.innerHeight - 60 - 147
        }

        // String for tags representation
        let tagString = "";
        for (let tag in this.state.tags) {
            console.log(tag);
            tagString += this.state.tags[tag].text + ", ";
        }
        tagString = tagString.substring(0, tagString.length - 2)

        // String for submitted representation
        let submitted = new Date(submit.submitted).toDateString();

        // String for approved representation
        let approved = "";
        if (submit.approved) {
            approved = new Date(submit.approved).toDateString();
        }

        return (
                <section
                    className="review-artwork-banner"
                    style={this.props.managerIsOpen ?
                                (window.innerWidth * 0.25 > 440) ?
                                    styleLargeScreen :
                                    (window.innerWidth * 0.25 > 250) ?
                                        styleManagerOpen :
                                        (window.innerWidth > 410) ?
                                            styleSmallScreen :
                                            fixedWidth
                                    : styleManagerClosed}
                    >
                    <div className="review-artwork-info">
                        <div className="album-banner-preview-wrapper">
                            <div
                                style={previewStyle}
                                className="album-banner-preview" />
                        </div>
                        <div className="album-banner-details-wrapper">
                            <div className="album-banner-details">
                                <div className="album-banner-title">
                                    {submit.artwork_name}
                                </div>
                                <div className="album-banner-artist">
                                    {submit.artist_name}
                                </div>
                                <div className="album-banner-date">
                                    {submit.year}
                                </div>
                            </div>
                        </div>
                        <div className="album-banner-description-wrapper">
                            <p className="album-banner-description">
                                {submit.description}
                            </p>
                            <h5 className="album-banner-tags-heading">Tags:</h5>
                            <p className="album-banner-tags">
                                {tagString}
                            </p>
                        </div>
                    </div>
                    <div
                        style={window.innerHeight > 1280 ?
                                artworkStatusStyleLarge :
                                window.innerHeight > 990 ?
                                    artworkStatusStyleMedium :
                                    artworkStatusStyleSmall
                                }
                        className="review-artwork-status">
                        <div className="status-wrapper">
                            <h3 className="status-heading">
                                Date Submitted
                            </h3>
                            <div className="status-info-wrapper center">
                                <p>{submitted}</p>
                            </div>
                        </div>
                        {submit.approved ?
                            <div className="status-wrapper">
                                <h3 className="status-heading">
                                    Date Approved
                                </h3>
                                <div className="status-info-wrapper center">
                                    <p>{approved}</p>
                                </div>
                            </div>
                            :
                            null
                        }
                        <div className="status-wrapper">
                            <h3 className="status-heading">
                                Status
                            </h3>
                            <div className="status-info-wrapper center">
                                <div className="review-status">
                                    <h4>
                                        {submit.status}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="status-wrapper">
                            <h3 className="status-heading">
                                Message
                            </h3>
                            <div className="status-info-wrapper center">
                                <p>
                                    {submit.memo == "" && submit.status == "In Review" ?
                                    "Your artwork has not been reviewed yet. One of our curators will tend to your artwork at their soonest convenience!"
                                    :
                                    submit.memo}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }

    componentDidMount() {
        console.log("+++++SubmitArtworkInfo");
    }

    componentWillReceiveProps(nextProps) {
        let tags = [];

        // Get Tags
        if (nextProps.submits[nextProps.reviewArtwork]) {
            let allTags  = nextProps.submits[nextProps.reviewArtwork].tags;
            let tagKeys  = Object.keys(allTags);

            for (let i = 0; i < tagKeys.length; i++) {
                tags.push(allTags[i]);
            }
        }

        this.setState({
            tags: tags
        });
    }

    componentWillUnmount () {
    }
}
