import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import ImageListPage from './ImageListPage';
import ImageDetailPage from './ImageDetailPage';


class ImagePage extends Component {
    
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
    withRouter
)(ImagePage);