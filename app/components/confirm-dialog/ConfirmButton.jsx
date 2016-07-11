import React from 'react';

export default ({label, onClick, className}) => {
    return (
        <button className={className}
            onClick={onClick}>
			<h2>{label}</h2>
		</button>
    );
}
