import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { reduxForm, Field } from 'redux-form/immutable';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { FormHeader } from 'components/base/ui/header'
import { ControlInput } from 'components/base/form';


class CommandForm extends Component {

    render() {
        const {
            intl 
        } = this.props;

        return (
           <Aux>
                <FormHeader 
                    title={intl.formatMessage({id: 'CON_STEP3_CMD_HEADER'})}
                    icon='terminal'
                />
                <Form.Group>
                    <Form.Field width={8}>
                        <Field
                            label='Command'
                            name='command'
                            component={ControlInput}
                        />
                    </Form.Field>
                    <Form.Field width={8}>
                        <Field
                            label='Entry Point'
                            name='entryPoint'
                            component={ControlInput}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field width={8}>
                        <Field
                            label='Working Dir'
                            name='workingDir'
                            component={ControlInput}
                        />
                    </Form.Field>
                    <Form.Field width={8}>
                        <Field
                            label='User'
                            name='user'
                            component={ControlInput}
                        />
                    </Form.Field>
                </Form.Group>
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
)(CommandForm);
