import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
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

    async componentDidMount() {
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
        const { inspectData, intl } = this.props;
        return (
            <Aux>
                <SectionHeader 
                        title={intl.formatMessage({id: 'VOL_INFO_HEADER'})}
                        icon='hdd'
                /> 
                <VolumeInfo 
                    {...inspectData.getIn(['data','volume']).toJS()}
                    onDelete={this.handleDelete}
                />
                <SectionHeader 
                        title={intl.formatMessage({id: 'VOL_CONTAINER_HEADER'})}
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
   injectIntl,
   connect(
       state => ({
            inspectData: state.volume.get('inspectData')
       }),
       dispatch => ({
            VolumeAction: bindActionCreators(volume, dispatch)
       })
   ) 
)(VolumeDetailPage);