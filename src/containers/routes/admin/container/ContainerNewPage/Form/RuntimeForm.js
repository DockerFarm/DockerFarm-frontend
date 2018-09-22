import React, { Component } from 'react';
import { Form, Icon, Button } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { FormHeader } from 'components/base/ui/header'
import { ControlInput, ControlOptions, ControlCheckbox } from 'components/base/form';

const runtimeComponent = fields => (opts, index) => (
    <Form.Group key={index}>
        <Form.Field width={7}>
            <Field 
                name={`${opts}.host`}
                type='text'
                placeholder=''
                component={ControlInput}
                inputLabel='host'
            />
        </Form.Field>
        <Form.Field width={7}>
            <Field
                name={`${opts}.container`}
                placeholder=''
                component={ControlInput}
                inputLabel='container'
            />
        </Form.Field>
        <Form.Field width={1}>
            <div style={{marginTop: '5px'}}>
                <Button 
                    color='red' 
                    icon='trash'
                    size='tiny'
                    type='button'
                    onClick={() => fields.remove(index)}
                />
            </div>
        </Form.Field>
    </Form.Group>
)

class RuntimeForm extends Component {

    render() {

        return (
           <Aux>
                <FormHeader 
                    title='Runtime 설정'
                    icon='redo'
                />
                <Form.Group>
                    <Form.Field>
                        <Field 
                            label='Privileged'
                            name='privileged'
                            component={ControlCheckbox}
                            toggle
                        />
                    </Form.Field>
                </Form.Group>
                <FieldArray 
                    name='devices'
                    buttonLabel='디바이스 추가'
                    component={ControlOptions}
                    optionComponent={runtimeComponent}
                />
           </Aux> 
        )
    }
}

export default compose(
    withRouter,
    injectIntl,
    reduxForm({
        form: 'container'
    })
)(RuntimeForm);
