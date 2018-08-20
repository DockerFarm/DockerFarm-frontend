import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import ContainerListPage from './ContainerListPage';
import ContainerDetailPage from './ContainerDetailPage';
import * as common from 'store/modules/common';
import { bindActionCreators } from 'redux';


class ContainerPage extends Component {
    
    componentDidMount() {
        const { CommonAction } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: 'Containers',
                url: '/admin/containers'
            }
        ]);
    }

    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.path}`} component={ContainerListPage}/>
                <Route path={`${match.path}/:id`} component={ContainerDetailPage}/>
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
)(ContainerPage);