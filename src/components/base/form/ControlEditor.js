import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';
import MonacoEditor from 'react-monaco-editor';


const ControlEditor = ({
    type,
    placeholder,
    meta,
    input,
    ...custom
}) => (
    <React.Fragment>
        <MonacoEditor 
            value={input.value}
            type={type}
            onChange={ newValue => input.onChange(newValue)}
            placeholder={placeholder}
            {...custom}
        />
        <ErrorMessage
            {...meta}
        />
    </React.Fragment>    
)


export default ControlEditor;