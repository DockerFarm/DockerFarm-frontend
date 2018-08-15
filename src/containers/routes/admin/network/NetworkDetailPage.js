import React, { Component } from 'react';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui';
import { NetworkInfo, NetworkOptions, NetworkContainers } from 'components/admin/network';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as network from 'store/modules/network';
import * as common from 'store/modules/common';

class NetworkDetailPage extends Component {

    async componentWillMount() {
        const { NetworkAction, match } = this.props;
        try {
            await NetworkAction.getNetworkInfo(match.params.id);
        } catch(e) {

        }
    }

    render() {
        const { inspectData, CommonAction } = this.props;

        CommonAction.updateMenuTitle({
            index: 1,
            menu: {
                title: inspectData.getIn(['network','name']) 
            }
        })

        return (
            <Aux>
                <SectionHeader 
                    title='Network Information'
                    icon='sitemap'
                />
                <NetworkInfo 
                    {...inspectData.get('network').toJS()}
                />
                <SectionHeader
                    title='Network Options'
                    icon='settings'
                />
                <NetworkOptions
                    options={inspectData.get('options').toJS()}
                />
                <SectionHeader
                    title='Containers in Network'
                    icon='list'
                /> 
                <NetworkContainers 
                    containers={inspectData.get('container').toJS()}
                />
            </Aux>
        )
    }
}

export default compose(
    connect(
        state => ({
            inspectData: state.network.get('inspectData')
        }),
        dispatch => ({
            CommonAction: bindActionCreators(common, dispatch),
            NetworkAction: bindActionCreators(network, dispatch)
        })
    )    
)(NetworkDetailPage);