// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';

// Files
import Views             from '../../constants/Views';

/**
 * TODO
 */
export default class ReviewAlbumBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ReviewAlbumBanner");
    }

    render() {

        let previewStyle = {
            backgroundImage: 'url(assets/starry.jpg)'
        }

        let infoStyle = {
            height: window.innerHeight - 60,
            width: window.innerWidth * 0.75 - 236
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

        return (
                <section
                    className="review-artwork-banner"
                    style={infoStyle}
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
                                    Impressions
                                </div>
                                <div className="album-banner-artist">
                                    Van Gogh
                                </div>
                                <div className="album-banner-date">
                                    1880
                                </div>
                            </div>
                        </div>
                        <div className="album-banner-description-wrapper">
                            <p className="album-banner-description">
                                Vincent Van Gogh, a post-impressionist artist,
                                is one of the most famous and recognizable artists
                                of our time. Even so, while he was alive he struggled
                                to makes end’s meat as his artwork was too progressive
                                for his time.
                            </p>
                            <h5 className="album-banner-tags-heading">Tags:</h5>
                            <p className="album-banner-tags">
                                Art, Oil, Canvas, Stars, Yellow, People, Lake
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
                                <p>12:34 June 15 2016</p>
                            </div>
                        </div>
                        <div className="status-wrapper">
                            <h3 className="status-heading">
                                Status
                            </h3>
                            <div className="status-info-wrapper center">
                                <div className="review-status">
                                    <h4>
                                        In Review
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="status-wrapper">
                            <h3 className="status-heading">
                                Message
                            </h3>
                            <div className="status-info-wrapper">
                                <p>Your artwork will be displayed on our social
                                    media and in our curation serices. Publish
                                    this artwork if you would like to feature it on
                                    our Discover page too.</p>
                            </div>
                        </div>
                        <div className="status-wrapper">
                            <h3 className="status-heading">
                                Publish to Discover
                            </h3>
                            <div className="status-info-wrapper center">
                                <input id="publish-button" className="button slide-square" type="checkbox" />
                                <label htmlFor="publish-button"></label>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }

    componentDidMount() {
        console.log("+++++ReviewAlbumBanner");
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount () {
    }
}
