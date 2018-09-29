import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventListPage from './EventListPage';
import * as common from 'store/modules/common';


class EventPage extends Component {

    componentDidMount() {
        const { CommonAction, intl } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: intl.formatMessage({id: 'MENU_EVENT'}),
                url: '/admin/event'
            }
        ]);
    }

    
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.path}`} component={EventListPage} />
            </Switch>
        )
    }
}

export default compose(
    injectIntl,
    withRouter,
    connect(
        state => ({

        }),
        dispatch => ({
            CommonAction: bindActionCreators(common, dispatch)
        })
    )
)(EventPage);

