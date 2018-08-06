import React, { Component } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { ContainerList, ContainerInspectModal } from 'components/admin/ContainerPage';
import { toJS } from 'immutable';
import * as container from 'store/modules/container';

class ContainerPage extends Component {

    async componentWillMount() {
        const { ContainerAction } = this.props;
    
        try {
            await ContainerAction.getContainerList();
        } catch(e) {

        }
    }

    onInspect = async (id,name) => {
        const { ContainerAction } = this.props;
        debugger;
        
        try {
            await ContainerAction.getContainerInspectRaw(id);
            ContainerAction.setModalState({
                show: true,
                name 
            });
        } catch(e) {
            console.error(e.message);
        }
    }

    onClose = () => {
        const { ContainerAction } = this.props;
        ContainerAction.setModalState({
            show: false
        });
    }

    render() {
        const { 
            list,
            inspectData,
            state
        } = this.props;
        return (
            <Segment.Group>
                <Segment>
                    <Header as='h5'>
                        <Icon name='list'/>
                        Container Management
                    </Header>
                </Segment>
                <Segment>
                    <ContainerList
                        list={list.toJS()}
                        onInspect={this.onInspect}
                    />
                </Segment>
                <ContainerInspectModal 
                    show={state.get('show')}
                    name={state.get('name')}
                    data={inspectData.toJS()}
                    onClose={this.onClose}
                /> 
            </Segment.Group>
        ) 
    }
}

export default compose(
    connect(
        state => ({
            list: state.container.get('list'),
            inspectData: state.container.get('inspectData'),
            state: state.container.get('modalState')
        }),
        dispatch => ({
            ContainerAction: bindActionCreators(container, dispatch)
        })
    )
)(ContainerPage);