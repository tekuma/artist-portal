import React from 'react';

export default ({navOpen, openNav}) => {
    return (
        <div>
            <input type="checkbox" id="nav-trigger" className="nav-trigger" checked={navOpen} />
        	<label className="nav-trigger-icon" for="nav-trigger">
        		<button onClick={openNav} className={navOpen ? "hamburger is-active" : "hamburger"}>
        			<span></span>
        		</button>
        	</label>
        </div>

    );
}
