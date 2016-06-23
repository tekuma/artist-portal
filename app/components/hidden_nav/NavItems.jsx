import React from 'react';
import NavItem from './NavItem.jsx';

export default ({navItems}) => {
    return (
        <ul className="nav-locker scrollable">{navItems.map(item => {
                return (
                    <NavItem key={item.id} navItem={item} />
                );
            })}
        </ul>
    );
}
