// Libs
import React  from 'react';

//NOTE: This file is not a full component and is left as such for optimization
export default ({navIsOpen, displayName}) => {
    return (
        <div
            className="nav-username"
            style={{left : navIsOpen ? 25 : -700}}>
			<span className="nav-username-writing">
				{displayName != "" ? displayName : 'Untitled Artist'}
			</span>
		</div>
    );
}
