import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { FormHeader } from 'components/base/ui/header'
import { ControlInput, ControlOptions } from 'components/base/form';

class LabelForm extends Component {

    render() {
        const { intl } = this.props;
        return (
           <Aux>
                <FormHeader 
                    title={intl.formatMessage({id: 'CON_STEP3_LB_HEADER'})}
                    icon='tag'
                />
                <FieldArray 
                    name='labels'
                    buttonLabel={intl.formatMessage({id: 'CON_STEP3_ADDLB_LB'})}
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
)(LabelForm);
