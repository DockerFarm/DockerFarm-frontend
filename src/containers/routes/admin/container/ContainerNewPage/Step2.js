import React, { Component } from 'react';
import { Form, Button, Icon  } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import { ControlInput, ControlCheckbox, ControlRadioGroup, ControlOptions } from 'components/base/form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Aux } from 'components/hoc';
import { ButtonWrapper } from 'components/base/ui';
import { SectionHeader, FormHeader } from 'components/base/ui/header';
import { required } from 'lib/validation';
import * as container from 'store/modules/container';
import { bindActionCreators } from 'redux';

const optionComponent = fields => (opts, index) => (
    <Form.Group key={index}>
        <Form.Field width={4}>
            <Field 
                name={`${opts}.host`}
                type='text'
                placeholder='ex) 80'
                component={ControlInput}
                inputLabel='host'
                validate={[required]}
            />
        </Form.Field>
        <Form.Field width={1}>
            <div style={{textAlign:'center'}}>
                <Icon name='arrow right' style={{marginTop:'10px'}}/>
            </div> 
        </Form.Field>
        <Form.Field width={4}>
            <Field
                name={`${opts}.container`}
                type='text'
                placeholder='ex) 8080'
                component={ControlInput}
                inputLabel='container'
                validate={[required]}
            />
        </Form.Field>
        <Form.Field width={2}>
            <div style={{marginTop: '5px'}}>
                <Field 
                    name={`${opts}.protocol`}
                    labels={['TCP', 'UDP']}
                    values={['tcp', 'udp']}
                    defaultValue='tcp'
                    component={ControlRadioGroup}
                />
            </div>
        </Form.Field>
        <Form.Field width={2}>
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
class Step2 extends Component {

    handleNextStep = _ => {
        const { 
            ContainerAction,
            history,
        } = this.props;

        ContainerAction.setStep(2);
        history.push('/admin/containers/new/step3');
    }

    render() {
        const { intl, handleSubmit } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({id: 'CON_STEP2_BASIC_HEADER'})} 
                /> 
                <Form as='form'>
                    <Form.Group>
                        <Form.Field width={16}>
                            <Field 
                                name='name'
                                label={intl.formatMessage({id: 'CON_STEP2_NAME_LB'})}
                                placeholder={intl.formatMessage({id: 'CON_STEP2_NAME_PH'})}
                                component={ControlInput}
                                validate={[required]}
                            /> 
                        </Form.Field>
                    </Form.Group>
                    <FormHeader
                        title={intl.formatMessage({id: 'CON_STEP2_PORT_HEADER'})}
                    />
                    <Form.Group>
                        <Form.Field width={16}>
                            <label>{intl.formatMessage({id: 'CON_STEP2_ALLPORT_LB'})}</label>
                            <Field 
                                name='publishAllPorts'
                                toggle
                                component={ControlCheckbox}
                            />
                        </Form.Field>
                    </Form.Group>
                    <FieldArray 
                        name='port'
                        buttonLabel={intl.formatMessage({id: 'CON_STEP2_ADDPORT_LB'})}
                        component={ControlOptions}
                        optionComponent={optionComponent}
                    />
                </Form>
                <ButtonWrapper>
                    <Button.Group floated='right'>
                        <Button
                            size='tiny'
                            as={Link}
                            to={'/admin/containers/new/step1'}
                        >
                            <Icon 
                                name='arrow left'
                                style={{ marginLeft:0, marginRight: '3px'}}
                            />
                            {intl.formatMessage({id: 'BTN_PREV'})}
                        </Button>
                        <Button
                            size='tiny'
                            color='blue'
                            onClick={handleSubmit(this.handleNextStep)}
                        >
                            <Icon 
                                name='arrow right'
                                style={{ marginLeft:0, marginRight: '3px'}}
                            />
                            {intl.formatMessage({id: 'BTN_NEXT'})}
                        </Button>
                    </Button.Group>
                </ButtonWrapper>
            </Aux>
        )
    }
}

export default compose(
    withRouter,
    injectIntl,
    reduxForm({
        form: 'step2',
        destroyOnUnmount: false,        // <------ preserve form data
        forceUnregisterOnUnmount: false,  // <------ unregister fields on unmount
    }),
    connect(
        state => ({
            
        }),
        dispatch => ({
            ContainerAction: bindActionCreators(container, dispatch)
        })
    )
)(Step2);