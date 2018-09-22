import React, { Component } from 'react';
import { Form, Icon,  Button } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { FormHeader } from 'components/base/ui/header'
import { ControlInput, ControlOptions } from 'components/base/form';

class EnvForm extends Component {

    render() {
        return (
           <Aux>
                <FormHeader 
                    title='Env 설정'
                    icon='settings'
                />
                <FieldArray 
                    name='env'
                    buttonLabel='환경변수추가'
                    component={ControlOptions}
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
)(EnvForm);
