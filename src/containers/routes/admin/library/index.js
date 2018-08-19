import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LibraryListPage from './LibraryListPage';
import * as common from 'store/modules/common';


class LibraryPage extends Component {

    componentWillMount() {
        const { CommonAction } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: 'Library',
                url: '/admin/library'
            }
        ]);
    }

    
    render() {
        return (
            <Switch>
                <Route exact path='/admin/library' component={LibraryListPage} />
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
)(LibraryPage);