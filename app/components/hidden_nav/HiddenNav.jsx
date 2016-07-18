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
                avatar = this.props.user.avatar;
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
                <DisplayNameTag
                    displayName={this.props.user.display_name}
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
