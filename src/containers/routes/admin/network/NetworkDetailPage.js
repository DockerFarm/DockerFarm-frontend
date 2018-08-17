import React, { Component } from 'react';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui';
import { NetworkInfo, NetworkOptions, NetworkContainers } from 'components/admin/network';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
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

    handleDelete = async _ => {
        const { NetworkAction, match, history } = this.props;
        try { 
            await NetworkAction.deleteNetwork(match.params.id);

            toast.success('Network delete success!');
            history.push('/admin/networks');
        } catch(e) {
            alert(e.message);
        }
    }

    handleLeave = async id => {
        const { NetworkAction, match } = this.props;
        try { 
            await NetworkAction.leaveNetwork(match.params.id, { id });
            toast.success('Network leave success!');
            await NetworkAction.getNetworkInfo(match.params.id);
        } catch(e) {

        }
    }
    
    render() {
        const { inspectData, CommonAction } = this.props;

        // CommonAction.updateMenuTitle({
        //     index: 1,
        //     menu: {
        //         title: inspectData.getIn(['network','name']) 
        //     }
        // })

        return (
            <Aux>
                <SectionHeader 
                    title='Network Information'
                    icon='sitemap'
                />
                <NetworkInfo 
                    onDelete={this.handleDelete}
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
                    onLeave={this.handleLeave}
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