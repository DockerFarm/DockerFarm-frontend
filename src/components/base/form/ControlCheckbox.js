import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';


const ControlCheckbox = ({
    label, 
    type,
    placeholder,
    meta,
    input,
    ...custom
}) => {
    return (
        <React.Fragment>
            <label>{label}</label>
            <Checkbox 
                type={type}
                checked={!!input.value}
                onChange={(event,data) => input.onChange(data.checked)}
                placeholder={placeholder}
                {...custom}
            />
            <ErrorMessage
                {...meta}
            />
        </React.Fragment>    
    )
}

export default ControlCheckbox;