// Libs
import React                        from 'react';
import firebase                     from 'firebase';

// Files
import AlbumToggler from '../album_manager/AlbumToggler';

/**
 * TODO
 */
export default class ReviewStats extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ReviewStats");
    }

    render() {

        let statsHeight = {
            height: window.innerHeight - 60 - 285
        }

        let wrapperWidth = {
            width: window.innerWidth * 0.25 - 40
        }

        return (
            <section
                style={statsHeight}
                className="review-stats-wrapper">
                <AlbumToggler
                    height={window.innerHeight * 0.7 - 60}/>
                <ul
                    style={wrapperWidth}
                    className="stats-wrapper">
                    <li>
                        <h3 className="stats-heading">
                            Submitted:
                        </h3>
                        <div className="stats-body">
                            July 29, 2016
                        </div>
                    </li>
                    <li>
                        <h3 className="stats-heading">
                            Status:
                        </h3>
                        <div className="stats-body">
                            <div className="review-status">
                                <h4>
                                    In Review
                                </h4>
                            </div>
                        </div>
                    </li>
                    <li>
                        <h3 className="stats-heading">
                            Message:
                        </h3>
                        <div className="stats-body">
                            <p className="stats-message">
                                Your artwork is being reviewed. Return
                                later to check the status of your collection.
                            </p>
                        </div>
                    </li>
                    <li>
                        <h3 className="stats-heading">
                            Featured On:
                        </h3>
                        <div className="stats-body">
                            <div className="album-features">
                                <div
                                className="accordion-item-social-icon"
                                style={{backgroundImage: 'url(assets/images/icons/social-icons/facebook-gray.svg)'}} />
                                <div
                                className="accordion-item-social-icon"
                                style={{backgroundImage: 'url(assets/images/icons/social-icons/twitter-gray.svg)'}} />
                                <div
                                className="accordion-item-social-icon"
                                style={{backgroundImage: 'url(assets/images/icons/social-icons/instagram-gray.svg)'}} />
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        );
    }

    componentDidMount() {
        console.log("+++++ReviewStats");

    }

    componentWillReceiveProps(nextProps) {

    }
}
