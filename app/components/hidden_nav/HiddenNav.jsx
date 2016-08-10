// Libs
import React          from 'react';
import firebase       from 'firebase';
import uuid           from 'node-uuid';
// Files
import DisplayNameTag from './DisplayNameTag';
import LogoutButton   from './LogoutButton';
import NavItems       from './NavItems';
import Views          from '../../constants/Views';


export default class HiddenNav extends React.Component {
    navItems = [
        {
            id: uuid.v4(),
            item: 'Artworks',
            icon: '../../assets/images/icons/organize-outline.svg',
            href:  Views.ARTWORKS,
            title: 'Manage Artworks'
        }
        ,
        {
            id: uuid.v4(),
            item: 'Gallery',
            icon: '../../assets/images/logos/logo-white.svg',
            href:  Views.REVIEW,
            title: 'Manage Submitted Art'
        },
        {
            id: uuid.v4(),
            item: 'Profile',
            icon: '../../assets/images/icons/person-outline.svg',
            href:  Views.PROFILE,
            title: 'Edit Profile'
        }
    ];

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----HiddenNav");
    }

    render() {
        const navItems = this.navItems;
        let avatar;

        if(this.props.user != null &&
            this.props.user.hasOwnProperty('avatar') &&
            this.props.user.avatar != "") {
                avatar = this.props.thumbnail(this.props.user.avatar, 500);
            } else {
                avatar = 'assets/images/default-avatar.png';
            }

        let avatarStyle = {
            backgroundImage: 'url(' + avatar + ')'
        }
        let displayName = "Untitled Artist";

        if (this.props.user && this.props.user.display_name) {
            displayName = this.props.user.display_name; // This is here because of the initial split second an account isn't created
        }

        return (
            <nav className="navigation">
                <div
                    className="avatar"
                    style={avatarStyle}>
	    		</div>
                <DisplayNameTag
                    displayName={displayName}
                    navIsOpen={this.props.navIsOpen} />
                <NavItems
                    navItems={navItems}
                    changeAppLayout={this.props.changeAppLayout} />
                <LogoutButton
                    signOutUser={this.props.signOutUser} />
            </nav>
        );
    }

    componentDidMount() {
        console.log("+++++HiddenNav");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

}
