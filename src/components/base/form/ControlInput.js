import React from 'react';
import { Input } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';


const ControlInput = ({
    label, 
    inputLabel,
    type,
    placeholder,
    meta,
    input,
    ...custom
}) => {
    return (
        <React.Fragment>
            <label>{label}</label>
            <Input 
                {...input}
                label={inputLabel}
                type={type}
                placeholder={placeholder}
                {...custom}
            />
            <ErrorMessage
                {...meta}
            />
        </React.Fragment>    
    )
}

export default ControlInput;