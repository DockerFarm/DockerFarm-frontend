import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegistryListPage from './RegistryListPage';
import RegistryNewPage from './RegistryNewPage';
import RegistryEditPage from './RegistryEditPage';
import * as common from 'store/modules/common';

class RegistryPage extends Component {

    componentDidMount() {
        const { CommonAction, intl, match } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: intl.formatMessage({ id: 'MENU_REGISTRY'}),
                url: match.path 
            }
        ]);
    } 

    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.path}`} component={RegistryListPage} />
                <Route exact path={`${match.path}/new`} component={RegistryNewPage} />
                <Route exact path={`${match.path}/:id`} component={RegistryEditPage} />
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
)(RegistryPage);