import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form/immutable';
import { ControlInput } from 'components/base/form';

const ImageSearchForm = ({
    handleSubmit    
}) => (
    <Form as='form' onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Field width={16}>
                <Field 
                    inputLabel='Docker Hub'
                    name='query'
                    type='text'
                    placeholder='Search Image from Docker Hub...'
                    icon='search'
                    component={ControlInput}
                />
            </Form.Field>
        </Form.Group>
    </Form>
)

export default reduxForm({
    form: 'image'
})(ImageSearchForm);