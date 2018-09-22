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
        return (
           <Aux>
                <FormHeader 
                    title='Label 설정'
                    icon='tag'
                />
                <FieldArray 
                    name='labels'
                    buttonLabel='라벨 추가'
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
