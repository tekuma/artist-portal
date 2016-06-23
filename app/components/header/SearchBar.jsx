import React from 'react';

export default class SearchBar extends React.Component {
    render() {
        return (
            <div id="search-bar" className="header-icon">
                <form>
                    <input className="search-input" placeholder="Search Artworks..." type="search" value="" name="search" id="search" />
                    <input className="search search-submit" type="submit" value="" />
                    <div className="search-div search">
                        <img id="search-icon" src="assets/images/icons/search.svg" />
                    </div>
                </form>
            </div>
        );
    }
}
