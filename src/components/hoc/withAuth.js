import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';


export default function withAuth(SecretComponent) {
    class AuthComponent extends Component {

        render() {
            const { user, processed } = this.props;
            let renderComponent = null; 
            
            if( processed ) {
                if( !user || !user.email  ) {
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
            })
        )
    )(AuthComponent);
};
