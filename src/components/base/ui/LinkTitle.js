import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkTitle = ({
    to,
    label,
    className,
    onClick
}) => {
    
    return (
        <React.Fragment>
            {
                to ? 
                <Link className={className} to={to}>{label}</Link> :
                <a 
                    onClick={onClick} 
                    className={className}
                >
                    {label}
                </a>
            }
        </React.Fragment>
    )
}

export default styled(LinkTitle)`
    cursor:pointer;
    text-decoration:underline;
    &:hover{
        text-decoration:underline;
    }
`;