import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Label } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import DataTable from 'containers/ui/DataTable';
import * as service from 'store/modules/service';
import { LinkTitle } from 'components/base/ui';
import { SectionHeader } from 'components/base/ui/header';

class ServiceListPage extends Component {

    componentDidMount() {
        const { ServiceAction } = this.props;
        try { 
            ServiceAction.getServiceList();

        } catch(e) {

        }
    }

    render() {
        const { list, intl } = this.props;

        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({id: 'SERVICE_LIST_HEADER'})}
                    icon='microchip'
                />
                <DataTable 
                    paging
                    columns={[
                        {
                            header: 'Name',
                            id: 'name',
                            width: '100px',
                            cellAlign: 'center',
                            template: ({id, name}) => (
                                <LinkTitle 
                                    label={name}
                                    to={`/admin/services/${id}/info`}
                                />
                            )
                        },
                        {
                            header: 'Stack',
                            id: 'stack',
                            width: '150px',
                            cellAlign: 'center',
                        },
                        {
                            header: 'Image',
                            id: 'image',
                            width: '150px',
                            cellAlign: 'center',
                        },
                        {
                            header: 'Replicated',
                            id: 'replicated',
                            width: '150px',
                            cellAlign: 'center',
                        },
                        {
                            header: 'Port',
                            id: 'port',
                            width: '150px',
                            cellAlign: 'center',
                            template: ({port}) => (
                                <Aux>
                                    {
                                        port.map((v,i) => (
                                            <Label key={i} color='blue'>
                                                {v.host}->{v.container}
                                            </Label>
                                        ))
                                    }
                                </Aux>
                            )
                        },
                        {
                            header: 'UpdatedAt',
                            id: 'updatedAt',
                            width: '100px',
                            cellAlign: 'center'
                        }
                    ]}
                    data={list.toJS()}
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
            list: state.service.get('list')
        }),
        dispatch => ({
            ServiceAction: bindActionCreators(service, dispatch)
        })
    )
)(ServiceListPage);
