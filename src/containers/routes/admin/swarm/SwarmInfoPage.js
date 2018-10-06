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
       isOpen: false
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
        const { SwarmAction } = this.props;

        try {
            await SwarmAction.init(form.toJS());    
            await SwarmAction.getSwarmInfo();
            await SwarmAction.getSwarmToken();
            this.setState({
                isOpen: false
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

    swarmToken = async _ => {
        const { SwarmAction } = this.props;

        try {
            
        } catch (e) {
            /* handle error */
        }
    }

    close = _ => {
        this.setState({
            isOpen:false
        });
    }

    open = _ => {
        this.setState({
            isOpen:true
        })
    }

    render() {
        const token = this.props.token.toJS();
        const info = this.props.info.toJS();
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
                    onClick={this.open}
                >
                    Init
                </Button>
                <Button
                    color='red'
                    onClick={this.swarmLeave}
                >
                    Leave
                </Button>
                
                <Modal 
                    open={this.state.isOpen}
                    close
                    onClose={this.close}
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
