import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VolumeListPage from './VolumeListPage';
import VolumeDetailPage from './VolumeDetailPage';
import VolumeNewPage from './VolumeNewPage';
import * as common from 'store/modules/common';

class VolumePage extends Component {

    componentWillMount() {
        const { CommonAction } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: 'Volumes',
                url: '/admin/volumes'
            }
        ]);
    } 

    render() {
        return (
            <Switch>
                <Route exact path='/admin/volumes' component={VolumeListPage} />
                <Route exact path='/admin/volumes/new' component={VolumeNewPage} />
                <Route exact path='/admin/volumes/:id' component={VolumeDetailPage} />
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
)(VolumePage);