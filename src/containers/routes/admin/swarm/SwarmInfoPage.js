import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { Aux, If } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { Button, Icon, Message, Modal, Form } from 'semantic-ui-react';
import { ControlInput } from 'components/base/form';
import { InfoTable } from 'components/base/ui';
import { toast } from 'react-toastify';
import { keys } from 'lodash';
import * as swarm from 'store/modules/swarm';
import { Map } from 'immutable';

let SwarmJoinForm = ({
    handleSubmit,
    onClose
}) => (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Field inline>
                <label>ListenAddr</label>
                <Field 
                    name='listenAddr' 
                    component={ControlInput}
                />
            </Form.Field>
            <Form.Field inline>
                <label>AdvertiseAddr</label>
                <Field 
                    name='advertiseAddr' 
                    component={ControlInput}
                />
            </Form.Field>
            <Form.Field inline>
                <label>RemoteAddr</label>
                <Field 
                    name='remoteAddr' 
                    component={ControlInput}
                />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Field inline width={10}>
                <label>JoinToken</label>
                <Field 
                    name='token' 
                    component={ControlInput}
                />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Button
                type='submit'
                color='blue'
            >
                Ok
            </Button>
            <Button
                onClick={onClose}
                type='button'
            >
                Cancel
            </Button>
        </Form.Group>
    </Form>
);

SwarmJoinForm = reduxForm({
    form: 'swarmjoin',
})(SwarmJoinForm);

let SwarmInitForm = ({
    handleSubmit,
    onClose
}) => (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Field inline>
                <label>ListenAddr</label>
                <Field 
                    name='listenAddr' 
                    component={ControlInput}
                />
            </Form.Field>
            <Form.Field inline>
                <label>AdvertiseAddr</label>
                <Field 
                    name='advertiseAddr' 
                    component={ControlInput}
                />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Button
                type='submit'
                color='blue'
            >
                Ok
            </Button>
            <Button
                onClick={onClose}
                type='button'
            >
                Cancel
            </Button>
        </Form.Group>
    </Form>
);

SwarmInitForm = reduxForm({
    form: 'swarminit',
})(SwarmInitForm);

const SwarmInfoTable = ({
    nodeId,
    nodeAddr,
    localNodeState,
    nodeCnt,
    managerCnt
}) => (
    <InfoTable 
        widths={[200,800]} 
        data={[
            {
                header: 'Node ID',
                cell: nodeId
            },
            {
                header: 'Node Addr',
                cell: nodeAddr
            },
            {
                header: 'Node State',
                cell: localNodeState
            },
            {
                header: 'Node Count',
                cell: nodeCnt
            },
            {
                header: 'Manager Count',
                cell: managerCnt
            }
        ]}
    />
)

const SwarmTokenTable = ({
    workerToken,
    managerToken
}) => (
    <InfoTable 
        widths={[200,800]} 
        data={[
            {
                header: 'Worker Token',
                cell: workerToken
            },
            {
                header: 'Manager Token',
                cell: managerToken
            }
        ]}
    />
)

class SwarmInfoPage extends Component {

    state = {
        data: Map({
            initFormOpen: false,
            joinFormOpen: false
        })
    }

    componentDidMount() {
        const { SwarmAction } = this.props;

        try {
            SwarmAction.getSwarmInfo();
            SwarmAction.getSwarmToken();
        } catch (e) {
            /* handle error */
        }
    }

    swarmInit = async form => {
        const { SwarmAction, data } = this.props;

        try {
            await SwarmAction.init(form.toJS());    
            await SwarmAction.getSwarmInfo();
            await SwarmAction.getSwarmToken();
            this.setState({
                data: data.set('initFormOpen', false)
            })
            toast.success('Swarm Initialize Success!');
        } catch (e) {
            /* handle error */
        }
    }

    swarmLeave = async _ => {
        const { SwarmAction } = this.props;

        try {
            await SwarmAction.leave();    
            await SwarmAction.getSwarmInfo();
            await SwarmAction.getSwarmToken();
            toast.success('Swarm Leave Success!');
        } catch (e) {
            /* handle error */
        }
    }

    swarmJoin = async form => {
        const { SwarmAction, data } = this.props;

        try {
            await SwarmAction.join(form.toJS());    
            await SwarmAction.getSwarmInfo();
            await SwarmAction.getSwarmToken();
            this.setState({
                data: data.set('joinFormOpen', false)
            })
            toast.success('Swarm Join Success!');
        } catch (e) {
            /* handle error */
        }
    }

    swarmToken = async _ => {
        const { SwarmAction } = this.props;

        try {
            
        } catch (e) {
            /* handle error */
        }
    }

    close = name =>  _ => {
        const { data } = this.state;
        this.setState({
            data: data.set(name, false)
        })
    }

    open = name => _ => {
        const { data } = this.state;
        this.setState({
            data: data.set(name, true)
        })
    }

    render() {
        const token = this.props.token.toJS();
        const info = this.props.info.toJS();
        const { data } = this.state;
        const isSwarmActive = !!info.nodeId;
        return (
            <Aux>
                <SectionHeader 
                    title='Swarm Information' 
                    icon='info'
                />
                <If 
                    condition={isSwarmActive}
                    then={
                        <Aux>
                            <SwarmInfoTable {...info}/>
                            <SectionHeader 
                                title='Swarm Token'
                                icon='key' 
                            />
                            <SwarmTokenTable {...token}/>
                        </Aux>
                    } 
                    else={
                        <Message color='red'>
                            <Message.Header>
                                Swarm Node is not Available !! 
                            </Message.Header>
                        </Message>
                    }
                />
                <Button
                    color='blue'
                    onClick={this.open('initFormOpen')}
                >
                    Init
                </Button>
                <Button
                    color='red'
                    onClick={this.swarmLeave}
                >
                    Leave
                </Button>
                <Button
                    onClick={this.open('joinFormOpen')}
                >
                    Join
                </Button>
                
                <Modal 
                    open={data.get('initFormOpen')}
                    close
                    onClose={this.close('initFormOpen')}
                >
                    <Modal.Header>
                        Initializing Swarm Node
                    </Modal.Header>
                    <Modal.Content>
                        <SwarmInitForm
                            onSubmit={this.swarmInit} 
                            onClose={this.close}
                        />
                    </Modal.Content>
                </Modal>
                <Modal 
                    open={data.get('joinFormOpen')}
                    close
                    onClose={this.close('joinFormOpen')}
                >
                    <Modal.Header>
                        Join Swarm
                    </Modal.Header>
                    <Modal.Content>
                        <SwarmJoinForm
                            onSubmit={this.swarmJoin} 
                            onClose={this.close}
                        />
                    </Modal.Content>
                </Modal>
            </Aux>
        );
    }
}

export default compose(
    withRouter,
    injectIntl,
    connect(
        state => ({
            info: state.swarm.get('info'),
            token: state.swarm.get('token')
        }),
        dispatch => ({
            SwarmAction: bindActionCreators(swarm, dispatch)
        })
    )
)(SwarmInfoPage);
