import React from 'react';
import uuid from 'node-uuid';
import UserNameTag from './UserNameTag';
import NavItems from './NavItems';
import LogoutButton from './LogoutButton';
import Views from '../../constants/Views';

export default class HiddenNav extends React.Component {
    constructor(props) {
        super(props);

        this.navItems = [
            {
                id: uuid.v4(),
                item: 'Upload',
                icon: '../../assets/images/icons/upload-blue.svg',
                href:  Views.UPLOAD,
                title: "Upload Artworks"
            },
            {
                id: uuid.v4(),
                item: 'Artworks',
                icon: '../../assets/images/icons/canvas.svg',
                href:  Views.ARTWORKS,
                title: 'Browse Artworks'
            },
            {
                id: uuid.v4(),
                item: 'Edit Profile',
                icon: '../../assets/images/icons/person.svg',
                href:  Views.EDIT,
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
	    			<img src={this.props.userInfo != null && this.props.userInfo.hasOwnProperty('avatar') && this.props.userInfo.avatar != "" ? this.props.userInfo.avatar : 'assets/images/default-avatar.png'} />
	    		</div>
                <UserNameTag
                    displayName={this.props.userInfo.display_name}
                    navIsOpen={this.props.navIsOpen} />
                <NavItems navItems={navItems} changeAppLayout={this.props.changeAppLayout} />
                <LogoutButton
                    signOutUser={this.props.signOutUser} />
            </nav>
        );
    }
}
