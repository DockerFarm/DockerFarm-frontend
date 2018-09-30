import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import * as user from 'store/modules/user';


export default function withAuth(SecretComponent) {
    class AuthComponent extends Component {

        //UserInfo load
        async componentDidMount() {
            const { UserAction } = this.props;
            try{
                await UserAction.selectMyInfo();
            }catch(e) {

            }
        }

        render() {
            const { user, processed } = this.props;
            let renderComponent = null;

            if( processed ) {
                if(!user || !user.get('email')) {
                    renderComponent = <Redirect to='/login'/>;
                } else {
                    renderComponent = <SecretComponent/>
                }
            }

            return renderComponent;
        }
    }

    return compose(
        withRouter,
        connect(
            state => ({
                user: state.user.get('user'),
                processed: state.user.get('processed')
            }),
            dispatch => ({
                UserAction: bindActionCreators(user, dispatch)
            })
        )
    )(AuthComponent);
}
