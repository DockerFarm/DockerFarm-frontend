import React from 'react';
import { Select } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';


const ControlSelectbox = ({
    label, 
    type,
    placeholder,
    meta,
    required,
    input,
    options,
    ...custom
}) => {
    return (
        <React.Fragment>
            <label>{label}</label>
            <Select
                search
                value={input.value}
                required={required}
                options={options}
                onChange={(event, data) => input.onChange(data.value)}
                {...custom}
            />
            <ErrorMessage
                {...meta}
            />
        </React.Fragment>    
    )
}

export default ControlSelectbox;