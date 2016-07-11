import React from 'react';
import uuid from 'node-uuid';
import UserNameTag from './UserNameTag';
import NavItems from './NavItems';
import Views from '../../constants/Views';
import LogoutButton from './LogoutButton';

export default class HiddenNav extends React.Component {
    constructor(props) {
        super(props);

        this.navItems = [
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
        let avatar;

        if(this.props.userInfo != null &&
            this.props.userInfo.hasOwnProperty('avatar') &&
            this.props.userInfo.avatar != "") {
                avatar = this.props.userInfo.avatar;
            } else {
                avatar = 'assets/images/default-avatar.png';
            }

        var avatarStyle = {
            backgroundImage: 'url(' + avatar + ')'
        }
        return (
            <nav className="navigation">
                <div
                    className="avatar"
                    style={avatarStyle}>
	    		</div>
                <UserNameTag
                    displayName={(this.props.userInfo == null)? "Default Artist":this.props.userInfo.display_name}
                    navIsOpen={this.props.navIsOpen} />
                <NavItems
                    navItems={navItems}
                    changeAppLayout={this.props.changeAppLayout} />
                <LogoutButton
                    signOutUser={this.props.signOutUser} />
            </nav>
        );
    }
}
