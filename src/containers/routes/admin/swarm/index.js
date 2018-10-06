import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SwarmInfoPage from './SwarmInfoPage';
import * as common from 'store/modules/common';


class SwarmPage extends Component {

    componentDidMount() {
        const { CommonAction, intl } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: intl.formatMessage({id: 'MENU_SWARM'}),
                url: '/admin/swarm'
            }
        ]);
    }

    
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.path}`} component={SwarmInfoPage} />
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
)(SwarmPage);
