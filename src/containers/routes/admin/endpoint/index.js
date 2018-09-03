import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import EndpointListPage from './EndpointListPage';
import EndpointNewPage from './EndpointNewPage';
import EndpointEditPage from './EndpointEditPage';
import * as common from 'store/modules/common';
import { bindActionCreators } from 'redux';


class EndpointPage extends Component {
    
    componentDidMount() {
        const { CommonAction, intl } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: intl.formatMessage({id: 'MENU_ENDPOINT'}),
                url: '/admin/endpoints'
            }
        ]);
    }

    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.path}`} component={EndpointListPage}/>
                <Route exact path={`${match.path}/new`} component={EndpointNewPage}/>
                <Route path={`${match.path}/:id`} component={EndpointEditPage}/>
            </Switch>
        )
    }
}

export default compose(
    withRouter,
    injectIntl,
    connect(
        state => ({
            
        }),
        dispatch => ({
            CommonAction: bindActionCreators(common, dispatch)
        })
    )
)(EndpointPage);