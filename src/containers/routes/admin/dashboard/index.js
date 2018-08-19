import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DashBoardInfoPage from './DashBoardInfoPage';
import * as common from 'store/modules/common';


class DashBoardPage extends Component {

    componentWillMount() {
        const { CommonAction } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: 'DashBoard',
                url: '/admin/dashboard'
            }
        ]);
    }

    
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.path}`} component={DashBoardInfoPage} />
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
)(DashBoardPage);