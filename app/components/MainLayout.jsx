import React from 'react';
import Header from './header/Header.jsx';
import MainView from './MainView.jsx';

export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.navOpen ? "main-wrapper open" : "main-wrapper"}>
                <Header />
                <MainView navOpen={this.props.navOpen} />
            </div>
        );
    }
}
