import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Button, Header, Icon, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { ContainerInspectModal } from 'components/admin/container';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { LinkTitle } from 'components/base/ui';
import { toast } from 'react-toastify';
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

    handlePrune = async _ => {
        const { ContainerAction } = this.props;

        try {
            await ContainerAction.pruneContainer();
            await ContainerAction.getContainerList();
            toast.success('Garbege Collection Success!');
        } catch(e) {

        }
    }

    onInspect = async (id,name) => {
        const { ContainerAction } = this.props;
        
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
            state,
            intl,
            match
        } = this.props;

        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({id: 'CON_LIST_HEADER'})}
                    icon='list'
                />
                <div>
                    <Button
                        as={Link}
                        to={`${match.path}/new/step1`}
                        color='blue'
                        size='tiny'                     
                    >
                        <Icon name='plus' />
                        {intl.formatMessage({id: 'CON_BTN_ADD'})}
                    </Button>
                    <Button
                        color='red'
                        size='tiny'                     
                        type='button'
                    >
                        <Icon name='trash' />
                        {intl.formatMessage({id: 'BTN_REMOVE'})}
                    </Button>
                    <Button
                        color='red'
                        size='tiny'                     
                        type='button'
                        onClick={this.handlePrune}
                    >
                        <Icon name='trash' />
                        {intl.formatMessage({id: 'BTN_GARBEGE_COLLECTION'})}
                    </Button>
                </div>
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
											to={`/admin/containers/${id}/info`} 
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
                                    row.port.map((v,i) => (
                                        <Label 
                                            key={i}
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
    withRouter,
    injectIntl,
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
