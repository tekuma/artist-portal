import React from 'react';

/**
 * TODO
 * @param  {[type]} {signOutUser} [description]
 * @return {[type]}               [description]
 */
export default ({signOutUser}) => {
    return (
        <div
            className="logout-button"
             title="End Session"
             onClick={signOutUser}
             >
			<a href="/">
				<h3>Logout</h3>
			</a>
		</div>
    );
}
