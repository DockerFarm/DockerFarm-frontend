import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { PageNotFound } from './error';
import { withAuth } from 'components/hoc';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AdminPage from './AdminPage';


class Routes extends Component {

    render() {

        return (
            <Switch>
                <Route exact path='/' render={ () => <Redirect to='/admin' />} />
                <Route path='/admin' component={withAuth(AdminPage)} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/signup' component={SignupPage} />
                <Route component={PageNotFound}/>
            </Switch>
        )
    }
}

export default withRouter(Routes);