// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';
import TweenMax                     from 'gsap';

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

        return (
                <section className="review-album-banner">
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
                </section>
        );
    }

    componentDidMount() {
        console.log("+++++ReviewAlbumBanner");
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.5, {top: "-1000px"}, {top: "60px"}).delay(0.3);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount () {
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.5, {top: "60px"}, {top: "-1000px"});
    }
}
