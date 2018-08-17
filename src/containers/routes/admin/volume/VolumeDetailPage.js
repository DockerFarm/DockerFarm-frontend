import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui';
import { VolumeInfo } from 'components/admin/volume';
import * as volume from 'store/modules/volume';

class VolumeDetailPage extends Component {

    async componentWillMount() {
        const { VolumeAction, match } = this.props;
        try {
            await VolumeAction.getVolumeInfo(match.params.id);
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
                <VolumeInfo {...inspectData.get('volume').toJS()} />
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