import React from 'react';
import SearchBar from './SearchBar.jsx';

export default class Header extends React.Component {
    render() {
        return (
            <header className="blue">
            	<div className="tekuma-logo">
            		<a href="/">
                        <img id="tekuma-logo-image" src='assets/images/tekuma-white.svg' />
            		</a>
            	</div>
            	<div className="header-icons">
        	    	<div className="header-icon" title="Upload Artworks">
        	    		<a href="/">
                            <img src='assets/images/icons/plus-pink.svg' />
        	    		</a>
        	    	</div>
        	    	<div className="header-icon" title="Organize Artworks">
        	    		<a href="/">
                            <img src='assets/images/icons/organize.svg' />
        	    		</a>
        	    	</div>
        	    	<SearchBar />
        	    </div>
        	</header>
        );
    }
}
