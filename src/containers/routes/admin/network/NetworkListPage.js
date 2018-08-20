import React, { Component } from 'react';
import { NetworkList } from 'components/admin/network';
import { withRouter, Link } from 'react-router-dom';
import { SectionHeader } from 'components/base/ui/header';
import { bindActionCreators } from 'redux';
import { Button, Icon } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as network from 'store/modules/network';


class NetworkListPage extends Component {

    async componentDidMount() {
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
                <div>
                    <Button
                        as={Link}
                        to='/admin/networks/new'
                        color='blue'
                        size='tiny'
                    >
                        <Icon name='plus' />
                        Add Network
                    </Button>
                </div>
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