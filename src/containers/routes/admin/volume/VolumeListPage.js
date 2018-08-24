import React, { Component } from 'react';
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
        const { list } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    icon='hdd'
                    title='Volume List'
                />
                <div>
                    <Button 
                        color='blue' 
                        size='tiny'
                        as={Link}
                        to='/admin/volumes/new'
                    >
                        <Icon name='plus' />
                        add volume
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
    connect(
        state => ({
            list: state.volume.get('list')
        }),
        dispatch => ({
            VolumeAction: bindActionCreators(volume, dispatch)
        })
    )
)(VolumeListPage);