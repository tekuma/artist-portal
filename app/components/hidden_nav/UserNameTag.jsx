import React from 'react';

export default ({navIsOpen, displayName}) => {
    return (
        <div
            className="nav-username"
            style={{left : navIsOpen ? 25 : -700}}>
			<span className="nav-username-writing">
				{displayName}
			</span>
		</div>
    );
}
