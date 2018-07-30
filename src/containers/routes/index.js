import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';



class Routes extends Component {


    render() {
        return (
            <Switch>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/login' component={LoginPage} />
            </Switch>
        )
    }
}

export default Routes;