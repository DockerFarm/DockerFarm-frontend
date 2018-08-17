import React, { Component } from 'react';
import { VolumeList } from 'components/admin/volume';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui';
import { Button, Icon } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import * as volume from 'store/modules/volume';

class VolumeListPage extends Component {
    async componentWillMount() {
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
                <VolumeList list={list.toJS()}/>
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