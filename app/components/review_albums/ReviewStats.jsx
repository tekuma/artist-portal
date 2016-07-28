// Libs
import React                        from 'react';
import firebase                     from 'firebase';

// Files

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

        return (
            <section className="review-stats-wrapper">

            </section>
        );
    }

    componentDidMount() {
        console.log("+++++ReviewStats");

    }

    componentWillReceiveProps(nextProps) {

    }
}
