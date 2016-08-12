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
            <li
                className="nav-item">
                <a
                    href="http://tekuma.io/artist/artist-faq/"
                    target="_blank"
                    title="Learn about Tekuma's Artist Service"
                    >
        			<div>
                        <img className="nav-icon" src="assets/images/icons/gears-white.svg" />
        				<h3 className="nav-writing"> How Does It Work?</h3>
        			</div>
                </a>
    		</li>
        </ul>
    );
}
