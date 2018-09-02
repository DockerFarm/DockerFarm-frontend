import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { ControlInput, ControlCheckbox } from 'components/base/form';
import { Form } from 'semantic-ui-react';
import { required } from 'lib/validation';



class EndpointForm extends Component {

    render() {
        const {
            handleSubmit
        } = this.props;

        return (
            <Form as='form' onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Field width={12}>
                        <Field 
                            label='Name' 
                            type='text'
                            name='name'
                            placeholder='Endpoint name'
                            component={ControlInput}
                            validate={[required]}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
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
                </Form.Group>
                <Form.Group>
                    <Form.Field width={12}>
                        <Field
                            label='Active'
                            name='isActive'
                            toggle
                            component={ControlCheckbox}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field width={1}>
                        <Field
                            label='TLS'
                            name='tls'
                            toggle
                            component={ControlCheckbox}
                        />
                    </Form.Field>
                </Form.Group>
            </Form>
        )
    }
}


export default reduxForm({
    form: 'endpoint'
})(EndpointForm);
