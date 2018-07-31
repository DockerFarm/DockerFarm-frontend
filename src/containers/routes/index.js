import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import MainPage from './MainPage';



class Routes extends Component {


    render() {
        return (
            <Switch>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/signup' component={SignupPage} />
            </Switch>
        )
    }
}

export default Routes;