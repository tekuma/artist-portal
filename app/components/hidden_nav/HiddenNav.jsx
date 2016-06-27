import React from 'react';
import uuid from 'node-uuid';
import UserNameTag from './UserNameTag.jsx';
import NavItems from './NavItems.jsx';
import LogoutButton from './LogoutButton.jsx';

export default class HiddenNav extends React.Component {
    constructor(props) {
        super(props);

        this.navItems = [
            {
                id: uuid.v4(),
                item: 'Upload',
                icon: '../../assets/images/icons/upload-blue.svg',
                href:  'upload',
                title: "Upload Artworks"
            },
            {
                id: uuid.v4(),
                item: 'Artworks',
                icon: '../../assets/images/icons/canvas.svg',
                href:  'artworks',
                title: 'Browse Artworks'
            },
            {
                id: uuid.v4(),
                item: 'Edit Profile',
                icon: '../../assets/images/icons/person.svg',
                href:  'profile',
                title: 'Edit Your Profile'
            }

        ]
    }

    render() {
        const navItems = this.navItems;

        return (
            <nav className="navigation">
                <div className="avatar">
	    			<img src='assets/images/afika.jpg' />
	    		</div>
                <UserNameTag className={this.props.navIsOpen ? "open": null}/>
                <NavItems navItems={navItems} />
                <LogoutButton />
            </nav>
        );
    }
}
