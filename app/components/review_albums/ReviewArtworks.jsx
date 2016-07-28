// Libs
import React                        from 'react';
import firebase                     from 'firebase';

// Files
import ReviewArtwork from '../artwork_manager/ReviewArtwork';

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

        return (
            <section className="review-artworks">
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

    }

    componentWillReceiveProps(nextProps) {

    }
}
