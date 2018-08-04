import React from 'react';
import { Label } from 'semantic-ui-react';

const ErrorLabel = ({message}) => (
    <Label basic color='red' pointing >
        {message} 
    </Label>
)

const ErrorMessage = ({ touched, error, warning}) => (
    <div>
        {touched &&
            ((error && <ErrorLabel message={error}/>) ||
            (warning && <ErrorLabel message={warning}/>))}
    </div>
)


export default ErrorMessage;