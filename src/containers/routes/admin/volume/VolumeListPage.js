import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { Button, Icon } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { LinkTitle } from 'components/base/ui';
import DataTable from 'containers/ui/DataTable';
import * as volume from 'store/modules/volume';

class VolumeListPage extends Component {
    async componentDidMount() {
        const { VolumeAction } = this.props;
        try {
            await VolumeAction.getVolumeList();
        } catch(e) {

        }
    }

    render() {
        const { list, intl} = this.props;
        return (
            <Aux>
                <SectionHeader 
                    icon='hdd'
                    title={intl.formatMessage({id: 'VOL_LIST_HEADER'})}
                />
                <div>
                    <Button 
                        color='blue' 
                        size='tiny'
                        as={Link}
                        to='/admin/volumes/new'
                    >
                        <Icon name='plus' />
                        {intl.formatMessage({id: 'VOL_BTN_ADD'})}
                    </Button>
                </div>
                <DataTable
                    data={list.toJS()}
                    checkable
                    paging
                    columns={[
                        {
                            header: 'Name',
                            id: 'name',
                            width: '300px',
                            headerAlign: 'left',
                            template: ({name}) => (
                                <LinkTitle 
                                    to={`/admin/volumes/${name}`}
                                    label={name}
                                />
                            )
                        },
                        {
                            header: 'Driver',
                            id: 'driver',
                            width: '100px',
                            cellAlign: 'center'
                        },
                        {
                            header: 'MountPoint',
                            id: 'mountpoint',
                            headerAlign:'left',
                            width: '300px',
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
            list: state.volume.get('list')
        }),
        dispatch => ({
            VolumeAction: bindActionCreators(volume, dispatch)
        })
    )
)(VolumeListPage);