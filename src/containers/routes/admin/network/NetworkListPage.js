import React, { Component } from 'react';
import { NetworkList } from 'components/admin/network';
import { withRouter } from 'react-router-dom';
import { SectionHeader } from 'components/base/ui';
import { bindActionCreators } from 'redux';
import { Aux } from 'components/hoc';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as network from 'store/modules/network';


class NetworkListPage extends Component {

    async componentWillMount() {
        const { NetworkAction } = this.props;

        try {
            await NetworkAction.getNetworkList();
        } catch(e) {

        }
    }

    render() {
        const { list } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title='Network List'
                    icon='sitemap'
                />
                <NetworkList
                    list={list.toJS()}
                />
            </Aux>
        )
    }
}


export default compose(
    withRouter,
    connect(
        state => ({
            list: state.network.get('list')
        }),
        dispatch => ({
            NetworkAction: bindActionCreators(network, dispatch)
        })
    )
)(NetworkListPage);