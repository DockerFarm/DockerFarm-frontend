import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import ContainerListPage from './ContainerListPage';
import ContainerDetailPage from './ContainerDetailPage';


class ContainerPage extends Component {
    
    render() {
        return (
            <Switch>
                <Route exact path='/admin/containers' component={ContainerListPage}/>
                <Route path='/admin/containers/:id' component={ContainerDetailPage}/>
            </Switch>
        )
    }
}

export default compose(
    withRouter
)(ContainerPage);