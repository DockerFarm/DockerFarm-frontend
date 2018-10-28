import React, { Component } from 'react';
import { Aux } from 'components/hoc';
import { reduxForm, Field} from 'redux-form/immutable';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { FormHeader } from 'components/base/ui/header'
import { ControlRadioGroup } from 'components/base/form';
class EnvForm extends Component {

    render() {
        const { intl } = this.props;
        return (
           <Aux>
                <FormHeader 
                    title={intl.formatMessage({id: 'CON_STEP3_POLICY_HEADER'})}
                    icon='sync'
                />
                <Field 
                    name='restartPolicy'
                    labels={['Never', 'Always', 'On Failure', 'Unless Stopped']}
                    values={['', 'always', 'onFailure', 'unlessStopped']}
                    defaultValue='always'
                    component={ControlRadioGroup}
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
