import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Aux } from 'components/hoc';
import { InfoTable } from 'components/base/ui';
import { SectionHeader } from 'components/base/ui/header';
import { bindActionCreators } from 'redux';
import { LogViewer } from 'containers/common';
import { TaskApi } from 'lib/api';
import * as task from 'store/modules/task';
import * as common from 'store/modules/common';

class TaskInfoPage extends Component {

    componentDidMount() {
        const { 
            TaskAction,
            CommonAction,
            intl,
            match
        } = this.props;

        try {
            CommonAction.setMenuTitle([
                {
                    title: intl.formatMessage({id: 'MENU_TASK'}),
                    url: `/admin/task/${match.params.id}`
                },
                {
                    title: match.params.id
                }
            ]);
            TaskAction.getTaskInfo(match.params.id);
        } catch(e) {

        }
    }

    handleGetLog = async _ => {
        const { match, TaskAction } = this.props;
        try {
            const response = await TaskApi.getTaskLog({
                id: match.params.id,
                param: {
                    follow:0,
                    stdout:1,
                    stderr:1,
                    tail:2000
                }
            });
            return response.data.result;
        } catch(e) {

        }
    }


    render() {
        const { inspectData } = this.props;
        const {
            id,
            state,
            stateMessage,
            image,
            slot,
            createdAt,
            container
        } = inspectData.toJS();

        return (
            <Aux>
                <SectionHeader 
                    title='Task Info'
                    icon='info'
                /> 
                <InfoTable 
                    widths={[200,800]}
                    data={[
                        {
                            header: 'Id',
                            cell: id
                        },
                        {
                            header: 'state',
                            cell: state
                        },
                        {
                            header: 'message',
                            cell: stateMessage
                        },
                        {
                            header: 'Image',
                            cell: image
                        },
                        {
                            header: 'Slot',
                            cell: slot
                        },
                        {
                            header: 'Container',
                            cell: container
                        },
                        {
                            header: 'CreatedAt',
                            cell: createdAt
                        },
                    ]}
                />
                <LogViewer
                    getLog={this.handleGetLog}
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
            inspectData: state.task.get('inspectData')
        }),
        dispatch => ({
            TaskAction: bindActionCreators(task, dispatch),
            CommonAction:  bindActionCreators(common, dispatch)
        })
    )
)(TaskInfoPage);


