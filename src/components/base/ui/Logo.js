import React from 'react';

const logo = ({
    className,
    width,
    height,
    invert
}) => (
    <img 
        src={`/img/${invert ? 'logo_invert.svg' : 'logo.svg'}`}
        alt='dockerfarm' 
        className={className}
        style={{
            width,
            height
        }}
    />
)

export default logo;