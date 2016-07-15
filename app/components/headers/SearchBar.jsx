import React from 'react';

/**
 * TODO
 * @param  {[type]} {searchOpen   [description]
 * @param  {[type]} toggleSearch} [description]
 * @return {[type]}               [description]
 */
export default ({searchOpen, toggleSearch}) => {
    return (
        <div id="search-bar"
            className={searchOpen ? "header-icon search-open" : "header-icon"}
            data-tip="Search for artworks">
            <form>
                <input className="search-input"
                    placeholder="Search Artworks..."
                    type="search" name="search" id="search"
                    autoFocus={true} />
                <input onClick={toggleSearch} className="search search-submit" type="submit" value="" />
                <div onClick={toggleSearch} className="search-div search">
                    <img onClick={toggleSearch} id="search-icon" src="assets/images/icons/search.svg" />
                </div>
            </form>
        </div>
    );
}
