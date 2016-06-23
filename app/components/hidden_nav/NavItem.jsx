import React from 'react';

export default ({navItem}) => {
    return (
        <li className="nav-item" title={navItem.title}>
			<a href={navItem.href}>
				<div>
                    <img className="nav-icon" src={navItem.icon} />
					<h3 className="nav-writing"> {navItem.item}</h3>
				</div>
			</a>
		</li>
    );
}
