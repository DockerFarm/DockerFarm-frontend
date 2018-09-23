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
        const { intl } = this.props;
        return (
           <Aux>
                <FormHeader 
                    title={intl.formatMessage({id: 'CON_STEP3_ENV_HEADER'})}
                    icon='settings'
                />
                <FieldArray 
                    name='env'
                    buttonLabel={intl.formatMessage({id: 'CON_STEP3_ADDENV_LB'})}
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
