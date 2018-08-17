import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NetworkListPage from './NetworkListPage';
import NetworkDetailPage from './NetworkDetailPage';
import NetworkNewPage from './NetworkNewPage';
import * as common from 'store/modules/common';

class NetworkPage extends Component {

    componentWillMount() {
        const { CommonAction } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: 'Networks',
                url: '/admin/networks'
            }
        ]);
    } 

    render() {
        return (
            <Switch>
                <Route exact path='/admin/networks' component={NetworkListPage} />
                <Route exact path='/admin/networks/new' component={NetworkNewPage} />
                <Route exact path='/admin/networks/:id' component={NetworkDetailPage} />
            </Switch>
        )
    }

}


export default compose(
    withRouter,
    connect(
        state => ({

        }),
        dispatch => ({
            CommonAction: bindActionCreators(common, dispatch)
        })
    ) 
)(NetworkPage);