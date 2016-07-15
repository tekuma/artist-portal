import React from 'react';

/**
 * TODO
 * @param  {[type]} {navIsOpen [description]
 * @param  {[type]} toggleNav} [description]
 * @return {[type]}            [description]
 */
export default ({navIsOpen, toggleNav}) => {
    return (
        <div>
            <input type="checkbox" id="nav-trigger" className="nav-trigger" checked={navIsOpen} />
        	<label className="nav-trigger-icon" htmlFor="nav-trigger">
        		<button
                    onClick={toggleNav}
                    className={navIsOpen ? "hamburger is-active" : "hamburger"}>
        			<span></span>
        		</button>
        	</label>
        </div>

    );
}
