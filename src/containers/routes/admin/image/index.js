import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as common from 'store/modules/common';
import ImageListPage from './ImageListPage';
import ImageDetailPage from './ImageDetailPage';
import ImageBuildPage from './ImageBuildPage';


class ImagePage extends Component {

    componentDidMount() {
        const { CommonAction } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: 'Images',
                url: '/admin/images'
            }
        ]);
    }

    
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.path}`} component={ImageListPage} />
                <Route exact path={`${match.path}/build`} component={ImageBuildPage} />
                <Route exact path={`${match.path}/:id`} component={ImageDetailPage} />
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
)(ImagePage);