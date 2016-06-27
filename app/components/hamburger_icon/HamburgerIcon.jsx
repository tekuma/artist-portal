import React from 'react';

export default ({navIsOpen, toggleNav}) => {
    return (
        <div>
            <input type="checkbox" id="nav-trigger" className="nav-trigger" checked={navIsOpen} />
        	<label className="nav-trigger-icon" for="nav-trigger">
        		<button onClick={toggleNav} className={navIsOpen ? "hamburger is-active" : "hamburger"}>
        			<span></span>
        		</button>
        	</label>
        </div>

    );
}
