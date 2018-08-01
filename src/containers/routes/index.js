import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { withAuth } from 'components/hoc';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import MainPage from './MainPage';
import * as user from 'store/modules/user';
import { bindActionCreators } from 'redux';


class Routes extends Component {

    render() {

        return (
            <Switch>
                <Route exact path='/' component={withAuth(MainPage)} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/signup' component={SignupPage} />
            </Switch>
        )
    }
}

export default withRouter(Routes);