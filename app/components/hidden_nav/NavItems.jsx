import React   from 'react';
import NavItem from './NavItem';

export default ({navItems, changeAppLayout, signOutUser}) => {
    return (
        <ul
            className="nav-locker scrollable"
            style={{
                height: window.innerHeight - 250 - 50 /* 250px = Avatar, 50px = Logout Button, 40px = NavItems Padding */
            }}>{navItems.map(item => {
                return (
                    <NavItem
                        key={item.id}
                        navItem={item}
                        changeAppLayout={changeAppLayout} />
                );
            })}
        </ul>
    );
}
