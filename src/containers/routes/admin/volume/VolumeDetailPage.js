import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { VolumeInfo, VolumeContainers } from 'components/admin/volume';
import { toast } from 'react-toastify';
import * as volume from 'store/modules/volume';

class VolumeDetailPage extends Component {

    async componentWillMount() {
        const { VolumeAction, match } = this.props;
        try {
            await VolumeAction.getVolumeInfo(match.params.id);
        } catch(e) {

        }
    }

    handleDelete = async id => {
        const { VolumeAction, match, history } = this.props;

        try {
            await VolumeAction.deleteVolume(match.params.id);
            toast.success('Volume delete success!');
            history.push('/admin/volumes');
        } catch(e) {

        }
    }

    render() {
        const { inspectData } = this.props;
        return (
            <Aux>
                <SectionHeader 
                        title='Volume Infomation'
                        icon='hdd'
                /> 
                <VolumeInfo 
                    {...inspectData.getIn(['data','volume']).toJS()}
                    onDelete={this.handleDelete}
                />
                <SectionHeader 
                        title='Containers Using Volume'
                        icon='list'
                /> 
                <VolumeContainers 
                    list={inspectData.get('container').toJS()}
                />
            </Aux>
        )
    }
}

export default compose(
   withRouter,
   connect(
       state => ({
            inspectData: state.volume.get('inspectData')
       }),
       dispatch => ({
            VolumeAction: bindActionCreators(volume, dispatch)
       })
   ) 
)(VolumeDetailPage);