import React from 'react';
import Header from './header/Header.jsx';
import MainView from './MainView.jsx';

export default class MainLayout extends React.Component {
    render() {
        return (
            <div className="main-wrapper">
                <Header />
                <MainView />
            </div>
        );
    }
}
