import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import { ControlInput, ControlCheckbox, ControlRadio, ControlOptions } from 'components/base/form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Aux } from 'components/hoc';
import { ButtonWrapper } from 'components/base/ui';
import { SectionHeader, FormHeader } from 'components/base/ui/header';
import { required } from 'lib/validation';

const optionComponent = fields => (opts, index) => (
    <Form.Group key={index}>
        <Form.Field width={6}>
            <Field 
                name={`${opts}.key`}
                type='text'
                component={ControlInput}
                validate={[required]}
                inputLabel='호스트'
            />
        </Form.Field>
        <Form.Field width={1}>
            <div style={{textAlign:'center'}}>
                <Icon name='arrow right' style={{marginTop:'10px'}}/>
            </div> 
        </Form.Field>
        <Form.Field width={6}>
            <Field
                name={`${opts}.value`}
                type='text'
                component={ControlInput}
                validate={[required]}
                inputLabel='컨테이너'
            />
        </Form.Field>
        <Form.Field width={4}>
            <Field 
                name={`${opts}.protocol`}
                label='TCP'
                value='tcp'
                type='radio'
                component={ControlRadio}
            />
            <Field 
                name={`${opts}.protocol`}
                label='UDP'
                value='udp'
                type='radio'
                component={ControlRadio}
            />
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
class Step2 extends Component {

    render() {
        const { intl } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title='컨테이너 기본 설정' 
                /> 
                <Form as='form'>
                    <Form.Group>
                        <Form.Field width={16}>
                            <Field 
                                name='name'
                                label='이름'
                                placeholder='컨테이너 이름을 입력하세요 ex) nginx'
                                component={ControlInput}
                            /> 
                        </Form.Field>
                    </Form.Group>
                    <FormHeader
                        title='포트 설정'
                    />
                    <Form.Group>
                        <Form.Field width={16}>
                            <label>모든 포트 게시</label>
                            <Field 
                                name='allPort'
                                toggle
                                component={ControlCheckbox}
                            />
                        </Form.Field>
                    </Form.Group>
                    <FieldArray 
                        name='port'
                        buttonLabel='포트설정 추가'
                        component={ControlOptions}
                        optionComponent={optionComponent}
                    />
                </Form>
                <ButtonWrapper>
                    <Button.Group floated='right'>
                        <Button
                            size='tiny'
                            onClick={this.handleNextStep} 
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
                            onClick={this.handleNextStep}
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
        form: 'container'
    }),
    connect(
        state => ({

        }),
        dispatch => ({

        })
    )
)(Step2);