import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { SectionHeader } from 'components/base/ui/header';
import { Aux } from 'components/hoc';
import { InfoTable, LinkTitle } from 'components/base/ui';
import DataTable from 'containers/ui/DataTable';
import * as service from 'store/modules/service';
import * as task from 'store/modules/task';

class InfoPanel extends Component {

    async componentDidMount() {
        const { 
            ServiceAction, 
            TaskAction,
            match 
        } = this.props;

        try {
            await ServiceAction.getServiceInfo(match.params.id);
            await TaskAction.getTaskList(match.params.id);
        } catch(e) {

        }
    }

    render() {
        const { 
            inspectData,
            taskList
        } = this.props;
        const {
            detail: {
                name,
                id,
                createdAt,
                updatedAt,
                version,
                replicas,
                image
            }
        } = inspectData.toJS();

        return (
            <Aux>
                <SectionHeader
                    title='Service Info'
                    icon='microchip'
                />
                <InfoTable 
                    widths={[200,800]} 
                    data={[
                        {
                            header: 'Id',
                            cell: id,
                        },
                        {
                            header: 'Name',
                            cell: name
                        },
                        {
                            header: 'CreatedAt',
                            cell: createdAt
                        },
                        {
                            header: 'UpdatedAt',
                            cell: updatedAt
                        },
                        {
                            header: 'Version',
                            cell: version
                        },
                        {
                            header: 'Replicas',
                            cell: replicas
                        },
                        {
                            header: 'Image',
                            cell: image
                        }
                    ]}
                />
                <SectionHeader
                   title='Task List' 
                   icon='list'
                />
                <DataTable 
                    data={taskList.toJS()}
                    columns={[
                        {
                            header: 'Id',
                            id: 'id',
                            width: '100px',
                            cellAlign: 'center',
                            template: ({id}) => (
                                <LinkTitle 
                                    to={`/admin/task/${id}`}
                                    label={id}
                                />
                            )
                        },
                        {
                            header: 'Status',
                            id: 'status',
                            width: '100px',
                            cellAlign: 'center'
                        },
                        {
                            header: 'Slot',
                            id: 'slot',
                            width: '100px',
                            cellAlign: 'center'
                        },
                        {
                            header: 'UpdatedAt',
                            id: 'updatedAt',
                            width: '100px',
                            cellAlign: 'center'
                        },
                        {
                            header: 'NodeId',
                            id: 'nodeId',
                            width: '100px',
                            cellAlign: 'center'
                        }
                    ]} 
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
            taskList: state.task.get('list'),
            inspectData: state.service.get('inspectData')
        }),
        dispatch => ({
            ServiceAction: bindActionCreators(service, dispatch),
            TaskAction: bindActionCreators(task, dispatch)
        })
    )
)(InfoPanel);
