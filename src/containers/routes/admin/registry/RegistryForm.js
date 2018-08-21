import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { FormHeader } from 'components/base/ui/header';
import { ControlInput, ControlCheckbox } from 'components/base/form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { required, maxLength, minLength } from 'lib/validation';
import { Aux } from 'components/hoc';

const max100 = maxLength(100);
const RegistryForm = ({
    handleSubmit,
    isAuth
}) => (
    <Form as='form' onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Field width={16}>
                <Field 
                    name='name'
                    type='text'
                    label='Name'
                    component={ControlInput}
                    validate={[required, max100 ]}
                    placeholder='ex) docker-registry'
                />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Field width={16}>
                <Field 
                    name='url'
                    type='text'
                    label='URL'
                    component={ControlInput}
                    validate={[required, max100 ]}
                    placeholder='ex) http://localhost:5000'
                />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Field width={16}>
                <Field 
                    name='isAuth'
                    toggle
                    label='Authentication'
                    component={ControlCheckbox}
                />
            </Form.Field>
        </Form.Group>
        {
            isAuth ? 
            <Aux>
                <Form.Group>
                    <Form.Field width={16}>
                        <Field 
                            name='username'
                            type='text'
                            label='username'
                            component={ControlInput}
                            validate={[required, max100 ]}
                            placeholder='input registry username'
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field width={16}>
                        <Field 
                            name='password'
                            type='password'
                            label='password'
                            component={ControlInput}
                            validate={[required, max100 ]}
                            placeholder='input registry password'
                        />
                    </Form.Field>
                </Form.Group>
            </Aux>:
            null
        }
    </Form>
)

const selector = formValueSelector('registry');

export default compose(
    reduxForm({
        form: 'registry'
    }),
    connect(
        state => ({
            isAuth: selector(state, 'isAuth')
        }),
        dispatch => ({

        })
    )
)(RegistryForm);