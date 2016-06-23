import React from 'react';

export default class NavItem extends React.Component {
    render() {
        return (
            <li className="nav-item" title={navItem.title}>
				<a href={navItem.href}>
					<div>
                        <Image className="nav-icon" src={{uri: navItem.icon}} />
						<h3 className="nav-writing"> {navItem.item}</h3>
					</div>
				</a>
			</li>
        );
    }
}
