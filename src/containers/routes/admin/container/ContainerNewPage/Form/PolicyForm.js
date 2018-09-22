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
        return (
           <Aux>
                <FormHeader 
                    title='Restart Policy 설정'
                    icon='sync'
                />
                <Field 
                    name='restartPolicy'
                    labels={['Never', 'Always', 'On Failure', 'Unless Stopped']}
                    values={['never', 'always', 'onFailure', 'unlessStopped']}
                    defaultValue='never'
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
