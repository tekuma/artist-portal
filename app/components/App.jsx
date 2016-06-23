import React from 'react';
import HiddenNav from './hidden_nav/HiddenNav.jsx';
import HamburgerIcon from './hamburger_icon/HamburgerIcon.jsx';
import MainLayout from './MainLayout.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navOpen: false
        };
    }

    render() {
        return (
            <div className="app">
                <HiddenNav
                    navOpen={this.state.navOpen}/>
                <HamburgerIcon
                    openNav={this.toggle}
                    navOpen={this.state.navOpen}/>
                <MainLayout
                    navOpen={this.state.navOpen}/>
            </div>
        );
    }

    toggle = () => {
        this.setState({
            navOpen: !this.state.navOpen
        });
    };
}
