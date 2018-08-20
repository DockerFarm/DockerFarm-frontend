import React, { Component } from 'react';
import { Segment, Header, Button, Icon, List} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import { fromJS } from 'immutable';
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


const renderOptions = ({
    fields,
    type,
    meta: { error, submitFailed }
}) => (
    <Aux>
        <Form.Group>
            <Form.Field>
                <Button 
                    color='blue'
                    size='tiny'
                    type='button'
                    onClick={() => fields.push(fromJS({}))}
                >
                    <Icon name='plus' />
                    {
                         type === 'driver' ? 
                        'add driver options':
                        'add label options'
                    }
                </Button>
            </Form.Field>
        </Form.Group>
        {
            fields.map((opts, index) => {
                return (
                    <Form.Group key={index}>
                        <Form.Field width={6}>
                            <Field 
                                name={`${opts}.key`}
                                type='text'
                                component={ControlInput}
                                validate={[required]}
                                inputLabel='key'
                            />
                        </Form.Field>
                        <Form.Field width={6}>
                            <Field
                                name={`${opts}.value`}
                                type='text'
                                component={ControlInput}
                                validate={[required]}
                                inputLabel='value'
                            />
                        </Form.Field>
                        <Form.Field width={4}>
                            <label></label> 
                            <Button 
                                color='red' 
                                icon='trash'
                                size='tiny'
                                type='button'
                                onClick={() => fields.remove(index)}
                            />
                        </Form.Field>
                    </Form.Group>
                )
            })
        }
    </Aux>
)

let NetworkForm = ({
    handleSubmit,
    reset,
    back
}) => (
    <Form as='form' onSubmit={handleSubmit}>
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
                        onClick={back}
                    >
                        <Icon name='bars'/>
                        List
                    </Button>
                    <Button 
                        type='button'
                        onClick={reset}
                    >
                        <Icon name='sync'/>
                        Reset
                    </Button>
                    <Button 
                        color='teal'
                        type='submit'
                    >
                        <Icon name='checkmark'/>
                        Create
                    </Button>
                </Button.Group>
            </Form.Field>
        </Form.Group>
    </Form>
)

NetworkForm = reduxForm({
    form: 'network'
})(NetworkForm)

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
        return (
            <Aux>
                <SectionHeader 
                    title='Create Network' 
                />
                <Segment>
                    <NetworkForm
                        onSubmit={this.submit}
                        back={this.back}
                    />
                </Segment>
            </Aux>
        )
    }
}

export default compose(
    withRouter,
    connect(
        state => ({

        }),
        dispatch => ({
            NetworkAction: bindActionCreators(network, dispatch)
        })
    )
)(NetworkNewPage);