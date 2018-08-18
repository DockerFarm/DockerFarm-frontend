import React from 'react';
import ControlInput from './ControlInput';
import { Aux } from 'components/hoc';
import { Form, Button, Icon } from 'semantic-ui-react';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import { required } from 'lib/validation';

const ControlOptions = ({
    fields,
    type,
    buttonLabel,
    meta: { error, submitFailed }
}) => (
    <Aux>
        <Form.Group>
            <Form.Field>
                <Button 
                    color='blue'
                    size='tiny'
                    type='button'
                    onClick={() => fields.push(fromJS({}))}
                >
                    <Icon name='plus' />
                    {
                        buttonLabel
                    }
                </Button>
            </Form.Field>
        </Form.Group>
        {
            fields.map((opts, index) => {
                return (
                    <Form.Group key={index}>
                        <Form.Field width={6}>
                            <Field 
                                name={`${opts}.key`}
                                type='text'
                                component={ControlInput}
                                validate={[required]}
                                inputLabel='key'
                            />
                        </Form.Field>
                        <Form.Field width={6}>
                            <Field
                                name={`${opts}.value`}
                                type='text'
                                component={ControlInput}
                                validate={[required]}
                                inputLabel='value'
                            />
                        </Form.Field>
                        <Form.Field width={4}>
                            <label></label> 
                            <Button 
                                color='red' 
                                icon='trash'
                                size='tiny'
                                type='button'
                                onClick={() => fields.remove(index)}
                            />
                        </Form.Field>
                    </Form.Group>
                )
            })
        }
    </Aux>
)

export default ControlOptions;