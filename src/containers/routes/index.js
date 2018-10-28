import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { PageNotFound } from './error';
import { If, withAuth } from 'components/hoc';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AdminPage from './AdminPage';
import LogoutPage from './LogoutPage';

const IndexPage = _ => (
    <If
        condition={localStorage.getItem('user') != null} 
        then={<Redirect to='/admin/dashboard' />}
        else={<Redirect to='/login' />}
    />
)

class Routes extends Component {

    render() {

        return (
            <Switch>
                <Route exact path='/' component={IndexPage} />
                <Route path='/admin' component={withAuth(AdminPage)} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/logout' component={LogoutPage} />
                <Route exact path='/signup' component={SignupPage} />
                <Route component={PageNotFound}/>
            </Switch>
        )
    }
}

export default withRouter(Routes);
