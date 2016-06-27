import React from 'react';

export default ({label, onClick, className}) => {
    return (
        <div className={className}
            onClick={onClick}>
			<h2>{label}</h2>
		</div>
    );
}
