import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Segment, Header, Button, Icon, List} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import { ControlInput, ControlSelectbox, ControlCheckbox, ControlOptions } from 'components/base/form';
import { required } from 'lib/validation';
import { SectionHeader, FormHeader } from 'components/base/ui/header';
import { Form } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import * as network from 'store/modules/network';


class NetworkNewPage extends Component {

    submit = async form => {
        const { NetworkAction, history } = this.props;
        try {
            await NetworkAction.createNetwork(form.toJS());
            toast.success('Network create success!');
            history.push('/admin/networks');
        } catch(e){

        }
    }

    back = _ => { 
        const { history } = this.props;
        history.push('/admin/networks');
    }

    render() {
        const { intl, reset, handleSubmit } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({ id: 'NET_CREATE_HEADER'})}
                />
                <Segment>
                <Form as='form' onSubmit={handleSubmit(data => this.submit(data))}>
                    <Form.Group>
                        <Form.Field width={16}>
                            <Field 
                                name='name'
                                type='text'
                                label='name'
                                placeholder='ex) docker-network' 
                                component={ControlInput}
                                validate={[required]}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={16}>
                            <FormHeader 
                                title='Network Configuration'
                                icon='settings' 
                                textAlign='center'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={8}>
                            <Field 
                                name='subnet'
                                type='text'
                                label='Subnet'
                                placeholder='ex) 172.20.0.1/16'
                                component={ControlInput}
                                validate={[required]}
                            /> 
                        </Form.Field>
                        <Form.Field width={8}>
                            <Field 
                                name='gateway'
                                type='text'
                                label='Gateway'
                                placeholder='ex) 172.20.0.1'
                                component={ControlInput}
                                validate={[required]}
                            /> 
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={16}>
                            <FormHeader 
                                title='Driver Configuration'
                                icon='settings' 
                                textAlign='center'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={16}>
                            <Field 
                                name='driver'
                                label='driver'
                                placeholder='Driver'
                                options={
                                    [
                                        {key: 1, value: 'bridge', text: 'bridge'},
                                        {key: 2, value: 'host', text: 'host'},
                                        {key: 3, value: 'overlay', text: 'overlay'},
                                        {key: 4, value: 'null', text: 'null'},
                                        {key: 5, value: 'macvlan', text: 'macvlan'}
                                    ]
                                }
                                validate={[required]}
                                component={ControlSelectbox}
                            /> 
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <label>Driver options</label>
                        </Form.Field>
                    </Form.Group>
                    <FieldArray name='options' component={ControlOptions} buttonLabel='add driver options'/>
                    <Form.Group>
                        <Form.Field width={16}>
                            <FormHeader 
                                title='Advanced Configuration'
                                icon='settings' 
                                textAlign='center'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <label>Label options</label>
                        </Form.Field>
                    </Form.Group>
                    <FieldArray name='labels' component={ControlOptions} buttonLabel='add label options'/>
                    <Form.Group>
                        <Form.Field>
                            <Field
                                name='internal'
                                label='Restrict external access to the network'
                                toggle
                                component={ControlCheckbox}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={16}>
                            <Button.Group floated='right'>
                                <Button 
                                    type='button'
                                    onClick={this.back}
                                >
                                    <Icon name='bars'/>
                                    {intl.formatMessage({id: 'BTN_LIST'})}
                                </Button>
                                <Button 
                                    type='button'
                                    onClick={reset}
                                >
                                    <Icon name='sync'/>
                                    {intl.formatMessage({id: 'BTN_RESET'})}
                                </Button>
                                <Button 
                                    color='teal'
                                    type='submit'
                                >
                                    <Icon name='checkmark'/>
                                    {intl.formatMessage({id: 'BTN_SAVE'})}
                                </Button>
                            </Button.Group>
                        </Form.Field>
                    </Form.Group>
                </Form>
                </Segment>
            </Aux>
        )
    }
}

export default compose(
    withRouter,
    injectIntl,
    reduxForm({
        form: 'network'
    }),
    connect(
        state => ({

        }),
        dispatch => ({
            NetworkAction: bindActionCreators(network, dispatch)
        })
    )
)(NetworkNewPage);