import React from 'react';
import uuid from 'node-uuid';
import NavItem from './NavItem.jsx';

export default class NavItems extends React.Component {
    constructor() {
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
                item: 'Upload',
                icon: '../../assets/images/icons/person.svg',
                href:  'artworks',
                title: 'Browse Artworks'
            },
            {
                id: uuid.v4(),
                item: 'Upload',
                icon: '../../assets/images/icons/canvas.svg',
                href:  'profile',
                title: 'Edit Your Profile'
            }

        ]
    }

    render() {
        const navItems = this.navItems;

        return (
            <ul className="nav-locker scrollable">{navItems.map(navItem =>
                <navItem key={navItem.id} navItem={navItem} />
                )}
            </ul>
        );
    }
}
