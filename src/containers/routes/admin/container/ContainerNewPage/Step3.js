import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { reduxForm} from 'redux-form/immutable';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { SectionHeader} from 'components/base/ui/header'
import { ButtonWrapper } from 'components/base/ui';



import CommandForm from './Form/CommandForm';
import VolumeForm from './Form/VolumeForm';
import NetworkForm from './Form/NetworkForm';
import EnvForm from './Form/EnvForm';
import LabelForm from './Form/LabelForm';
import PolicyForm from './Form/PolicyForm';
import RuntimeForm from './Form/RuntimeForm';

class Step3 extends Component {

    render() {
        const { intl } = this.props;
        return (
           <Aux>
                <SectionHeader 
                    title='컨테이너 옵션설정(생략가능)' 
                />
                <Form as='form'>
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
    })
)(Step3);
