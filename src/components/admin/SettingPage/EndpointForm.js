import React, { Component } from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form/immutable';
import { ControlInput, ControlCheckbox } from 'components/base/form';
import { required } from 'lib/validation';

const EndpointForm = ({
    handleSubmit,
    serverError,
    pristine,
    submitting,
    reset,
    onDelete
}) => (
    <Form as='form' 
        onSubmit={handleSubmit} >
        <Form.Group>
            <Form.Field width={4}>
                <Field 
                    label='Name' 
                    type='text'
                    name='name'
                    placeholder='Endpoint name'
                    component={ControlInput}
                    validate={[required]}
                />
            </Form.Field>
            <Form.Field width={12}>
                <Field 
                    label='EndPoint Url' 
                    type='text'
                    name='url'
                    placeholder='example) http://host:port'
                    component={ControlInput}
                    validate={[required]}
                />
            </Form.Field>
            <Form.Field width={1}>
                <Field
                    label='Active'
                    name='isActive'
                    toggle
                    component={ControlCheckbox}
                />
            </Form.Field>
            <Form.Field width={1}>
                <Field
                    label='TLS'
                    name='tls'
                    toggle
                    component={ControlCheckbox}
                />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Field width={16}>
                <Message 
                    error
                    header='Error'
                    content={serverError}
                    visible={serverError}
                />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Field width={16}>
                <Button.Group floated='right'>
                    <Button
                        disabled={pristine || submitting} 
                        onClick={reset}
                    >
                        <Icon name='refresh'/>Reset</Button>
                    <Button 
                        color='red' 
                        type='button'
                        onClick={onDelete}>
                        <Icon name='delete' />Delete
                    </Button>
                    <Button 
                        type='submit'
                        color='blue'
                    >
                        <Icon name='checkmark'/>Save
                   </Button>
                </Button.Group>
            </Form.Field>
        </Form.Group>
    </Form>
)

export default reduxForm({
    form: 'endpoint'
})(EndpointForm);