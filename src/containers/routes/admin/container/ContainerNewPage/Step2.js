import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import { ControlInput } from 'components/base/form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';

class Step2 extends Component {

    render() {
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
                </Form>
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