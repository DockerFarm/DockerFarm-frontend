import React, { Component } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { ContainerList, ContainerInspectModal } from 'components/admin/container';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
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
            rawData,
            state
        } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title='Container List'
                    icon='list'
                />
                <ContainerList
                    list={list.toJS()}
                    onInspect={this.onInspect}
                />
                <ContainerInspectModal 
                    show={state.get('show')}
                    name={state.get('name')}
                    data={rawData.toJS()}
                    onClose={this.onClose}
                /> 
            </Aux>
        ) 
    }
}

export default compose(
    connect(
        state => ({
            list: state.container.get('list'),
            rawData: state.container.getIn(['modalState','data']),
            state: state.container.get('modalState')
        }),
        dispatch => ({
            ContainerAction: bindActionCreators(container, dispatch)
        })
    )
)(ContainerPage);