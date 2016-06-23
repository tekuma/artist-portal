import React from 'react';
import UserNameTag from './UserNameTag.jsx';
import NavItems from './NavItems.jsx';
import LogoutButton from './LogoutButton.jsx';

export default class HiddenNav extends React.Component {
    render() {
        return (
            <nav className="navigation">
                <div className="avatar">
	    			<img src='assets/images/afika.jpg' />
	    		</div>
                <UserNameTag />
                <NavItems />
                <LogoutButton />
            </nav>
        );
    }
}
