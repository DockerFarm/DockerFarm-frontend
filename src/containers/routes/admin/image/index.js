import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as common from 'store/modules/common';
import ImageListPage from './ImageListPage';
import ImageDetailPage from './ImageDetailPage';


class ImagePage extends Component {

    componentWillMount() {
        const { CommonAction } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: 'Images',
                url: '/admin/images'
            }
        ]);
    }

    
    render() {
        return (
            <Switch>
                <Route exact path='/admin/images' component={ImageListPage} />
                <Route exact path='/admin/images/:id' component={ImageDetailPage} />
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