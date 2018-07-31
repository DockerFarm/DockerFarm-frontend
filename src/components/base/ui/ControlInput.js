import React from 'react';
import { Input, Label } from 'semantic-ui-react';
import { Field } from 'redux-form';

const ErrorLabel = ({message}) => (
    <Label basic color='red' pointing >
        {message} 
    </Label>
)

const ControlInput = ({
    label, 
    type,
    placeholder,
    meta: { touched, error, warning },
    input,
    ...rest
}) => (
    <React.Fragment>
        <label>{label}</label>
        <Input 
            {...input}
            type={type}
            placeholder={placeholder}
            {...rest}
        />
        {touched &&
            ((error && <ErrorLabel message={error}/>) ||
            (warning && <ErrorLabel message={warning}/>))}
    </React.Fragment>    
)

export default ControlInput;