import React from 'react';
import uuid from 'node-uuid';
import UserNameTag from './UserNameTag';
import NavItems from './NavItems';
import LogoutButton from './LogoutButton';

export default class HiddenNav extends React.Component {
    constructor(props) {
        super(props);

        this.navItems = [
            {
                id: uuid.v4(),
                item: 'Upload',
                icon: '../../assets/images/icons/upload-blue.svg',
                href:  'Upload',
                title: "Upload Artworks"
            },
            {
                id: uuid.v4(),
                item: 'Artworks',
                icon: '../../assets/images/icons/canvas.svg',
                href:  'Artworks',
                title: 'Browse Artworks'
            },
            {
                id: uuid.v4(),
                item: 'Edit Profile',
                icon: '../../assets/images/icons/person.svg',
                href:  'Edit Profile',
                title: 'Edit Your Profile'
            }

        ]
    }

    shouldComponentUpdate(nextProps, nextState) {
      return true;
    }

    render() {
        const navItems = this.navItems;

        return (
            <nav className="navigation">
                <div className="avatar">
	    			<img src='assets/images/afika.jpg' />
	    		</div>
                <UserNameTag
                    displayName={this.props.userInfo.display_name}
                    navIsOpen={this.props.navIsOpen} />
                <NavItems navItems={navItems} changeAppLayout={this.props.changeAppLayout} />
                <LogoutButton />
            </nav>
        );
    }
}
