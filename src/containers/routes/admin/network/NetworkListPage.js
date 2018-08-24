import React, { Component } from 'react';
import { LinkTitle } from 'components/base/ui';
import { withRouter, Link } from 'react-router-dom';
import { SectionHeader } from 'components/base/ui/header';
import { bindActionCreators } from 'redux';
import { Button, Icon } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import DataTable from 'containers/ui/DataTable';
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
                <DataTable 
                    data={list.toJS()}
                    paging
                    checkable
                    columns={[
                        {
                            header: 'Name',
                            id: 'name',
                            cellAlign: 'left',
                            headerAlign: 'center',
                            width: '200px',
                            template: ({id, name}) => (
                                <LinkTitle 
                                    to={`/admin/networks/${id}`} 
                                    label={name}
                                />
                            )
                        },
                        {
                            header: 'Scope',
                            id: 'scope',
                            cellAlign: 'center',
                            width: '80px'
                        },
                        {
                            header: 'Driver',
                            id: 'driver',
                            cellAlign: 'center',
                            width: '80px'
                        },
                        {
                            header: 'IPAMDriver',
                            id: 'ipamdriver',
                            width: '100px',
                            cellAlign: 'center'
                        },
                        {
                            header: 'IPAMSubnet',
                            id: 'subnet',
                            width: '130px',
                            cellAlign: 'center'
                        },
                        {
                            header: 'IPAMGateway',
                            id: 'gateway',
                            width: '130px',
                            cellAlign: 'center'
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
            list: state.network.get('list')
        }),
        dispatch => ({
            NetworkAction: bindActionCreators(network, dispatch)
        })
    )
)(NetworkListPage);