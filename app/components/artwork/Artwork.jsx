import React from 'react';

export default ({artwork}) => {
    return (
        <article className="artwork">
            <div className="artwork-image">
                <img src={artwork.image} />
            </div>
            <div className="artwork-info">
                <h3 className="artwork-name">{artwork.title}</h3>
                <h4 className="artwork-date">{artwork.year}</h4>
                <img className="artwork-more" src='assets/images/icons/more-black.svg' />
            </div>
        </article>
    );
}
