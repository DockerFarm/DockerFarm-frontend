import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { NetworkInfo, NetworkOptions, NetworkContainers } from 'components/admin/network';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import * as network from 'store/modules/network';
import * as common from 'store/modules/common';

class NetworkDetailPage extends Component {

    async componentDidMount() {
        const { NetworkAction, CommonAction, match } = this.props;
        try {
            await NetworkAction.getNetworkInfo(match.params.id);
            CommonAction.updateMenuTitle({
                index: 1,
                menu: {
                    title: this.props.inspectData.getIn(['network','name']) 
                }
            })
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
        const { inspectData, CommonAction, intl } = this.props;


        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({id: 'NET_INFO_HEADER'})}
                    icon='sitemap'
                />
                <NetworkInfo 
                    onDelete={this.handleDelete}
                    {...inspectData.get('network').toJS()}
                />
                <SectionHeader
                    title={intl.formatMessage({id: 'NET_OPTION_HEADER'})}
                    icon='settings'
                />
                <NetworkOptions
                    options={inspectData.get('options').toJS()}
                />
                <SectionHeader
                    title={intl.formatMessage({id: 'NET_CONTAINER_HEADER'})}
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
    injectIntl,
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