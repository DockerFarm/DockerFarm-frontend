import React, { Component } from 'react';
import { Segment, Header, Icon, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { ContainerInspectModal } from 'components/admin/container';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { LinkTitle } from 'components/base/ui';
import DataTable from 'containers/ui/DataTable';
import * as container from 'store/modules/container';

class ContainerPage extends Component {

    async componentDidMount() {
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
                <DataTable 
                    data={list.toJS()}
                    checkable
                    paging
                    columns={
                        [
                            {
                                header: 'Id',
                                id: 'id',
                                width: '100px',
                                cellAlign: 'center'
                            },
                            {
                                header: 'Name',
                                id: 'name',
                                width: '200px',
                                template: ({id, name}) => (
                                    <Aux>
                                        <LinkTitle 
                                            to={`/admin/containers/${id}`} 
                                            label={name}
                                        />
                                        <Icon 
                                            onClick={ () => this.onInspect(id,name) } 
                                            name='info circle' 
                                            color='blue' 
                                            style={{marginLeft: '5px'}}
                                        /> 
                                    </Aux>
                                )
                            },
                            {
                                header: 'Image',
                                id: 'image',
                                width: '100px'
                            },
                            {
                                header: 'Command',
                                id: 'command',
                                width: '100px'
                            },
                            {
                                header: 'State',
                                id: 'state',
                                width: '80px',
                                cellAlign: 'center',
                                template: ({state}) => (
                                    <Label 
                                        color={state == 'running' ? 'teal' : 'red'}>
                                        {state}
                                    </Label>
                                )
                            },
                            {
                                header: 'Status',
                                id: 'status',
                                width: '60px',
                                cellAlign: 'center'
                            },
                            {
                                header: 'Ip',
                                id: 'ip',
                                width: '80px',
                                cellAlign: 'center',
                            },
                            {
                                header: 'Port',
                                id: 'port',
                                width: '80px',
                                cellAlign: 'center',
                                template: row => (
                                    row.port.map(v => (
                                        <Label 
                                            color='blue' 
                                            style={{marginBottom:'5px'}}
                                        >
                                            {`${v.public}->${v.private}`}
                                        </Label>
                                    ))
                                )
                            }
                        ]
                    }
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