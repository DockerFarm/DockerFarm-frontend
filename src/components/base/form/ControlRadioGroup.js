import React from 'react';
import { RadioGroup } from 'components/base/ui';
import ErrorMessage from './ErrorMessage';

const ControlRadio = ({
    input, 
    labels, 
    values,
    defaultValue,
    meta, 
    ...custom 
}) => {
    return (
        <React.Fragment>
            <RadioGroup 
                labels={labels}  
                values={values}
                defaultValue={defaultValue}
                onChange={ value => input.onChange(value)}
                {...custom}
            />
            <ErrorMessage
                {...meta}
            />
        </React.Fragment>    
    )
}

export default ControlRadio;