import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VolumeListPage from './VolumeListPage';
import VolumeDetailPage from './VolumeDetailPage';
import VolumeNewPage from './VolumeNewPage';
import * as common from 'store/modules/common';

class VolumePage extends Component {

    componentDidMount() {
        const { CommonAction, intl } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: intl.formatMessage({id: 'MENU_VOLUME'}),
                url: '/admin/volumes'
            }
        ]);
    } 

    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.path}`} component={VolumeListPage} />
                <Route exact path={`${match.path}/new`} component={VolumeNewPage} />
                <Route exact path={`${match.path}/:id`} component={VolumeDetailPage} />
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
)(VolumePage);