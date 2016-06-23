import React from 'react';
import HiddenNav from './hidden_nav/HiddenNav.jsx';
import HamburgerIcon from './hamburger_icon/HamburgerIcon.jsx';
import MainLayout from './MainLayout.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navOpen: false, // Used to track whether Hidden Navigation is open
            managerOpen: true   // Used to track whether Album Manager is open
        };
    }

    render() {
        return (
            <div className="app">
                <HiddenNav
                    navOpen={this.state.navOpen} />
                <HamburgerIcon
                    toggleNav={this.toggleNav}
                    navOpen={this.state.navOpen} />
                <MainLayout
                    navOpen={this.state.navOpen}
                    toggleManager={this.toggleManager}
                    managerOpen={this.state.managerOpen} />
            </div>
        );
    }

    toggleNav = () => {
        this.setState({
            navOpen: !this.state.navOpen
        });
    };

    toggleManager = () => {
        this.setState({
            managerOpen: !this.state.managerOpen
        });
    };
}
