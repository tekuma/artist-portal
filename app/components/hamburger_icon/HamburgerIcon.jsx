import React from 'react';

export default ({navOpen, toggleNav}) => {
    return (
        <div>
            <input type="checkbox" id="nav-trigger" className="nav-trigger" checked={navOpen} />
        	<label className="nav-trigger-icon" for="nav-trigger">
        		<button onClick={toggleNav} className={navOpen ? "hamburger is-active" : "hamburger"}>
        			<span></span>
        		</button>
        	</label>
        </div>

    );
}
