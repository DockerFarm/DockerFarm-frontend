import React from 'react';

const logo = ({
    className,
    width,
    height
}) => (
    <img 
        src='/img/logo.svg' 
        alt='dockerfarm' 
        className={className}
        style={{
            width,
            height
        }}
    />
)

export default logo;