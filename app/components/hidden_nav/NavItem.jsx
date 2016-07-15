import React  from 'react';

export default ({navItem, changeAppLayout}) => {
    return (
        <li
            className="nav-item"
            onClick={changeAppLayout.bind(null, navItem.href)}
            title={navItem.title}>
			<div>
                <img className="nav-icon" src={navItem.icon} />
				<h3 className="nav-writing"> {navItem.item}</h3>
			</div>
		</li>
    );
}
