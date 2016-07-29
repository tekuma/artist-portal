// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';
import TweenMax                     from 'gsap';

// Files
import ReviewArtwork from '../artwork_manager/ReviewArtwork';
import Views             from '../../constants/Views';

/**
 * TODO
 */
export default class ReviewArtworks extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ReviewArtworks");
    }

    render() {
        let styleManagerClosed = {
            width: window.innerWidth * 0.75 - 40,
            height: window.innerHeight - 60 - 285
        };

        let styleManagerOpen = {
            width: window.innerWidth * 0.5,  // Album Manager is 30% of Screen
            height: window.innerHeight - 60 - 285
        };

        let styleLargeScreen = {
            width: window.innerWidth * 0.75 - 440,
            height: window.innerHeight - 60 - 285
        };

        let styleSmallScreen = {
            width: window.innerWidth * 0.75 - 250,
            height: window.innerHeight - 60 - 285
        };

        let fixedWidth = {
            width: window.innerWidth * 0.75,
            height: window.innerHeight - 60 - 285
        };

        return (
            <section
                style={this.props.managerIsOpen ?
                            (window.innerWidth * 0.25 > 440) ?
                                styleLargeScreen :
                                (window.innerWidth * 0.25 > 250) ?
                                    styleManagerOpen :
                                    (window.innerWidth > 410) ?
                                        styleSmallScreen :
                                        fixedWidth
                                : styleManagerClosed}
                className="review-artworks">
                <ReviewArtwork />
                <ReviewArtwork />
                <ReviewArtwork />
                <ReviewArtwork />
                <ReviewArtwork />
                <ReviewArtwork />
                <ReviewArtwork />
                <ReviewArtwork />
                <ReviewArtwork />
                <ReviewArtwork />
            </section>
        );
    }

    componentDidMount() {
        console.log("+++++ReviewArtworks");
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.2, {bottom: "-1000px"}, {bottom: "0px"}).delay(0.3);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount () {
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.2, {bottom: "0px"}, {bottom: "-1000px"});
    }
}
