import React from 'react';
import { Radio } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';

const ControlRadio = ({
    input, 
    label, 
    meta, 
    ...custom 
}) => {
    return (
        <React.Fragment>
            <Radio 
                label={label}
                checked={!!input.value}
                onClick={(event, data) => input.onChange(data.checked)}
                {...custom}
            />
            <ErrorMessage
                {...meta}
            />
        </React.Fragment>    
    )
}

export default ControlRadio;