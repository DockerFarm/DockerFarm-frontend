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
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.props}`} component={NetworkListPage} />
                <Route exact path={`${match.props}/new`} component={NetworkNewPage} />
                <Route exact path={`${match.props}/:id`} component={NetworkDetailPage} />
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