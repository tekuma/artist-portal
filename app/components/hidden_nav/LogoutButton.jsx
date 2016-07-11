import React from 'react';

export default ({signOutUser}) => {
    return (
        <div
            className="logout-button"
             title="End Session"
             onClick={signOutUser}
             onTouchTap={signOutUser}>
			<a href="/">
				<h3>Logout</h3>
			</a>
		</div>
    );
}
