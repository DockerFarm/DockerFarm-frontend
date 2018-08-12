import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form/immutable';
import { ControlInput } from 'components/base/form';

const ImageSearchForm = ({
    
}) => (
    <Segment>
        <Form>
            <Form.Group>
                <Form.Field inline width={10}>
                    <label>Name</label>
                    <Field 
                        name='name'
                        type='text'
                        placeholder='Image Name'
                        component={ControlInput}
                    />
                </Form.Field>
                <Form.Field inline width={6}>
                    <label>Registry</label>
                </Form.Field>
            </Form.Group>
            <Form.Group>
                <Button type='button' color='blue'>Search Image</Button>
            </Form.Group>
        </Form>
    </Segment>
)

export default reduxForm({
    form: 'image'
})(ImageSearchForm);