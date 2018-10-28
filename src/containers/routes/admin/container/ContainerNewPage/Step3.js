import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { reduxForm, getFormValues} from 'redux-form/immutable';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import { SectionHeader} from 'components/base/ui/header'
import { ButtonWrapper } from 'components/base/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { assign } from 'lodash';
import { toast } from 'react-toastify';
import * as container from 'store/modules/container';



import CommandForm from './Form/CommandForm';
import VolumeForm from './Form/VolumeForm';
import NetworkForm from './Form/NetworkForm';
import EnvForm from './Form/EnvForm';
import LabelForm from './Form/LabelForm';
import PolicyForm from './Form/PolicyForm';
import RuntimeForm from './Form/RuntimeForm';

class Step3 extends Component {

    submit = async data => {
        const { 
            ContainerAction, 
            form1, 
            form2, 
            intl ,
            history,
        } = this.props;
        try {
            await ContainerAction.createContainer(assign(form1.toJS(), form2.toJS(), data.toJS()));
            toast.success(intl.formatMessage({id: 'CON_MSG_CREATE_SUCCESS'}));
            history.push('/admin/containers');
        } catch(e) {

        }
    }

    render() {
        const { 
            intl,
            handleSubmit
        } = this.props;
        return (
           <Aux>
                <SectionHeader 
                    title={intl.formatMessage({id: 'CON_STEP3_OPTION_HEADER'})}
                />
                <Form as='form' onSubmit={handleSubmit(this.submit)}>
                    <CommandForm/>
                    <VolumeForm/>
                    <NetworkForm/>
                    <EnvForm/>
                    <LabelForm/>
                    <PolicyForm/>
                    <RuntimeForm/>
                    <ButtonWrapper>
                        <Button.Group floated='right'>
                            <Button
                                size='tiny'
                                as={Link}
                                to={'/admin/containers/new/step2'}
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
                                    name='checkmark'
                                    style={{ marginLeft:0, marginRight: '3px'}}
                                />
                                {intl.formatMessage({id: 'BTN_SAVE'})}
                            </Button>
                        </Button.Group>
                    </ButtonWrapper>
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
            form1: getFormValues('step1')(state),
            form2: getFormValues('step2')(state)
        }),
        dispatch => ({
            ContainerAction: bindActionCreators(container, dispatch)
        })
    )
)(Step3);
