import React from 'react';

export default () => {
    return (
        <div>
            <input type="checkbox" id="nav-trigger" className="nav-trigger" />
        	<label className="nav-trigger-icon" for="nav-trigger">
        		<button className="hamburger">
        			<span></span>
        		</button>
        	</label>
        </div>

    );
}
