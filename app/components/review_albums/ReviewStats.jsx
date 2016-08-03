// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';
import TweenMax                     from 'gsap';

// Files
import AlbumToggler from '../album_manager/AlbumToggler';
import Views             from '../../constants/Views';

/**
 * TODO
 */
export default class ReviewStats extends React.Component {
    state = {
        mounted: false
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ReviewStats");
    }

    render() {

        if(this.props.managerIsOpen) {
            return this.openedManager();
        } else {
            return this.closedManager();
        }
    }

    componentDidMount() {
        console.log("+++++ReviewStats");
        this.setState({
            mounted: true
        });

        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.3, {right: "-1000px"}, {right: "0px"}).delay(0.2);

    }

    componentWillReceiveProps(nextProps) {


    }

    componentWillUnmount () {
        const el = ReactDOM.findDOMNode(this);
        this.setState({
            mounted: false
        });
        TweenMax.fromTo(el, 0.5, {right: "0px"}, {right: "-1000px"});
    }

// ============= Flow Control ===============

    openedManager = () => {
        let statsHeight = {
            height: window.innerHeight - 60 - 285,
            right: this.state.mounted ? 0 : null
        }

        let wrapperWidth = {
            width: window.innerWidth * 0.25 - 40
        }

        return (
            <section
                style={statsHeight}
                className="review-stats-wrapper">
                <AlbumToggler
                    height          ={window.innerHeight * 0.7 - 60}
                    background      ={"#222222"}
                    managerIsOpen   ={this.props.managerIsOpen}
                    toggleManager   ={this.props.toggleManager} />
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

    closedManager = () => {
        let statsHeight = {
            height: window.innerHeight - 60 - 285,
            right: -1 * document.getElementsByClassName('review-stats-wrapper')[0].clientWidth + 40
        }

        let wrapperWidth = {
            width: window.innerWidth * 0.25 - 40
        }

        return (
            <section
                style={statsHeight}
                className="review-stats-wrapper">
                <AlbumToggler
                    height={window.innerHeight * 0.7 - 60}
                    managerIsOpen   ={this.props.managerIsOpen}
                    toggleManager   ={this.props.toggleManager} />
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
}
