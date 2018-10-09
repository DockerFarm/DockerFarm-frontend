import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { SectionHeader } from 'components/base/ui/header';
import { Aux } from 'components/hoc';
import { InfoTable } from 'components/base/ui';
import * as service from 'store/modules/service';

class InfoPanel extends Component {

    componentDidMount() {
        const { ServiceAction, match } = this.props;

        try {
            ServiceAction.getServiceInfo(match.params.id);
        } catch(e) {

        }
    }

    render() {
        const { inspectData } = this.props;
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

            </Aux>
        )
    }
}

export default compose(
    withRouter,
    injectIntl,
    connect(
        state => ({
            inspectData: state.service.get('inspectData')
        }),
        dispatch => ({
            ServiceAction: bindActionCreators(service, dispatch)
        })
    )
)(InfoPanel);
