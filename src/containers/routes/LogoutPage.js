import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as user from 'store/modules/user';
import * as auth from 'store/modules/auth';



class LogoutPage extends Component {

    async componentDidMount() {
        const { UserAction, AuthAction, history } = this.props;
        
        try {
            await AuthAction.logout();
            UserAction.setUserInfo(null);
            localStorage.setItem('user', null);
            history.push('/login');
        } catch(e) {
        }
    }

    render() {
        return null;
    }
}

export default compose(
    withRouter,
    connect(
        state => ({

        }),
        dispatch => ({
            UserAction: bindActionCreators(user, dispatch),
            AuthAction: bindActionCreators(auth, dispatch)
        })
    )
)(LogoutPage)
