import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="search-bar" className={this.props.searchOpen ? "header-icon search-open" : "header-icon"}>
                <form>
                    <input className="search-input" placeholder="Search Artworks..." type="search" value="" name="search" id="search" />
                    <input onClick={this.props.openSearch} className="search search-submit" type="submit" value="" />
                    <div onClick={this.props.openSearch} className="search-div search">
                        <img onClick={this.props.openSearch} id="search-icon" src="assets/images/icons/search.svg" />
                    </div>
                </form>
            </div>
        );
    }
}
