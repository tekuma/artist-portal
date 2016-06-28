import React from 'react';
import NavItem from './NavItem';

export default ({navItems, changeAppLayout}) => {
    return (
        <ul className="nav-locker scrollable">{navItems.map(item => {
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
